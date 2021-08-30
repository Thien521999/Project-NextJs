// libs
import React, { useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// components
import PostItem from "../PostItem";
import PostCommentForm from "../PostCommentForm";
import PostCommentList from "../PostCommentList";
import PostListCategory from "../PostListCategory";
import { TypeCategory, TypeComment } from "../../../pages/posts/[postId]";
import { PostType } from "../../../pages";
import postApi from "../../../api/postApi";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

type PropsType = {
  detailPost: PostType;
  categoryPost: TypeCategory[];
  commentPost: TypeComment[];
  handleSetComment: (v: any) => void;
};

const PostDetailContent = ({ detailPost, categoryPost, commentPost, handleSetComment }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const postid = router.query.postId;

  const handleSubmitForm = async (commentValue) => {
    try {
      const data = await postApi.postComment({ comment: commentValue, postid });
      if (data?.status === 200) {
        const commentDetailRes = await postApi.getCommentByPostId(postid);
        handleSetComment(commentDetailRes?.data?.comments);
      } else {
        enqueueSnackbar("Comment error", { variant: "error" });
      }
    } catch (error) {
      console.log("Failed to fetch", error);
    }
  };

  return (
    <div className="ass1-section__list">
      <PostItem post={detailPost} />
      <PostListCategory categoryPost={categoryPost} />
      <PostCommentForm detailPost={detailPost} handleSubmitForm={handleSubmitForm} />
      <PostCommentList detailPost={detailPost} commentPost={commentPost} />
    </div>
  );
};

export default PostDetailContent;
