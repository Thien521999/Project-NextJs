// libs
import React, { useEffect, useState } from "react";
import useNotAuthentication from "../../../hooks/useNotAuthentication";
import postApi from "../../../api/postApi";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
// components
import { PostType } from "../..";
import { TypeCategory } from ".";
import PostDetailForm from "../../../components/Posts/PostDetailForm";
import PostDetailSideBar from "../../../components/Posts/PostDetailSideBar";
import { createNewPost } from "../../../components/Posts/PostSlice";

// const initialState = {
//   url_image: "",
//   post_content: "",
//   category: [],
//   obj_image: {
//     file: null,
//     base64: "",
//   },
// };

type PostEditDataProps = {
  postDetailData: PostType[];
  postCategories: TypeCategory[];
};

type PostEditProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const PostEdit: PostEditProps = () => {
  useNotAuthentication();
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [detailPost, setDetailPost] = useState({
    PID: "",
    USERID: "",
    post_content: "",
    status: "",
    time_added: "",
    url_image: "",
  });

  const [categoryPost, setCategoryPost] = useState([]);

  console.log(detailPost);
  console.log(categoryPost);

  const [postData, setPostData] = useState(() => {
    return {
      url_image: detailPost?.url_image,
      post_content: detailPost?.post_content,
      category: categoryPost?.map((cate) => cate.tag_index),
      obj_image: {
        file: null,
        base64: "",
      },
    };
  });
  console.log(postData);

  const postId = router.query.postId;

  useEffect(() => {
    (async () => {
      const postDetailRes = await postApi.getPostDetailByPostId(postId);

      setDetailPost(postDetailRes?.data?.data?.post);
      setCategoryPost(postDetailRes?.data?.data?.categories);
    })();
  }, []);

  console.log(detailPost);
  console.log(categoryPost);

  const onChangeCategory = (newCategory: string[]) => {
    setPostData({
      ...postData,
      category: newCategory,
    });
  };

  const onChangeDetailForm = (key: string, value: any) => {
    if (key === "obj_image") {
      setPostData({
        ...postData,
        [key]: value,
        url_image: "",
      });
      // return;
    }
    setPostData({
      ...postData,
      [key]: value,
    });
  };

  const handleSubmitPost = () => {
    (async () => {
      const postDetailPros = postApi.getPostDetailByPostId(postId);
      const action = createNewPost(postData);
      const data: any = await dispatch(action);
      router.push("/");
    })();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailForm
            url_image={postData.url_image}
            post_content={postData.post_content}
            obj_image={postData.obj_image}
            onChangeDetailForm={onChangeDetailForm}
          />
        </div>
        <div className="col-lg-4">
          <PostDetailSideBar
            category={postData.category}
            onChangeCategory={onChangeCategory}
            handleSubmitPost={handleSubmitPost}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PostEditDataProps> = async (context) => {
  // console.log("---", context.query.postId);
  // const postId = context?.query?.postId;
  // const postDetailPros = await postApi.getPostDetailByPostId(postId);
  // console.log("api-----", postDetailPros);

  const props = {
    postDetailData: [],
    postCategories: [],
  };

  return {
    props,
  };
};

export default PostEdit;
