// libs
import axios from "axios";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostType } from "../..";
import postApi from "../../../api/postApi";
import userApi from "../../../api/userApi";
// components
import HomeSideBar from "../../../components/Posts/HomeSideBar";
import PostDetailContent from "../../../components/Posts/PostDetailContent";
import { Storekeys } from "../../../constants/Login";

export type TypeCategory = {
  TAG_ID: string;
  PID: string;
  tag_index: string;
  tag_value: string;
};

export type TypeComment = {
  CID: string;
  PID: string;
  USERID: string;
  fullname: string;
  profilepicture: string;
  comment: string;
  time_added: string;
};

type PostDetailDataProps = {
  userPosts: PostType[];
  postDetailData: PostType[];
  postCategories: TypeCategory[];
  comments: TypeComment[];
};

type PostDetailProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const PostDetail: PostDetailProps = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [detailPost, setDetailPost] = useState([]);
  const [categoryPost, setCategoryPost] = useState([]);
  const [commentPost, setCommentPost] = useState([]);

  const userId = JSON.parse(localStorage.getItem(Storekeys?.USER)).USERID;
  const router = useRouter();
  const postId = router.query.postId;

  const handleSetComment = (commentList) => {
    setCommentPost(commentList);
  };

  useEffect(() => {
    (async () => {
      const userPostPros = postApi.get(userId);
      const postDetailPros = postApi.getPostDetailByPostId(postId);
      const commentDetailPros = postApi.getCommentByPostId(postId);

      const [userPostRes, postDetailRes, commentDetailRes] = await Promise.all([
        userPostPros,
        postDetailPros,
        commentDetailPros,
      ]);

      const postUserId = postDetailRes?.data?.data?.post?.USERID || "";
      const userInfoData = await userApi.getUser(postUserId);

      let postDetailData = null;
      if (postDetailRes?.data?.data?.post) {
        postDetailData = {
          ...postDetailRes?.data?.data?.post,
          fullname: userInfoData?.data?.user?.fullname || "",
          profilepicture: userInfoData?.data?.user?.profilepicture || "",
          comments: commentDetailRes?.data?.comments,
        };
      }

      setUserPosts(userPostRes?.data?.posts);
      setDetailPost(postDetailData);
      setCategoryPost(postDetailRes?.data?.data?.categories);
      setCommentPost(commentDetailRes?.data?.comments);
    })();
  }, []);

  // console.log(commentPost);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailContent
            detailPost={detailPost}
            categoryPost={categoryPost}
            commentPost={commentPost}
            handleSetComment={handleSetComment}
          />
        </div>
        <div className="col-lg-4">
          <HomeSideBar userPosts={userPosts} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PostDetailDataProps> = async (context) => {
  // console.log("---", context.query.postId);
  // const postId = context?.query?.postId;
  // const postDetailPros = await postApi.getPostDetailByPostId(postId);
  // console.log("api-----", postDetailPros);

  const props = {
    userPosts: [],
    postDetailData: [],
    postCategories: [],
    comments: [],
  };

  return {
    props,
  };
};

export default PostDetail;
