// libs
import React, { useState } from "react";
import PostDetail from "./[postId]";
import PostDetailForm from "../../components/Posts/PostDetailForm";
import PostDetailSideBar from "../../components/Posts/PostDetailSideBar";
import useNotAuthentication from "../../hooks/useNotAuthentication";
import { Storekeys } from "../../constants/Login";
import postApi from "../../api/postApi";
import { useSnackbar } from "notistack";
import { createNewPost } from "../../components/Posts/PostSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

const initialState = {
  url_image: "",
  post_content: "",
  category: [],
  obj_image: {
    file: null,
    base64: "",
  },
};

const PostCreate = () => {
  useNotAuthentication();
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [postData, setPostData] = useState(initialState);
  const token = localStorage.getItem(Storekeys?.TOKEN);

  const onChangeCategory = (newCategory: string[]) => {
    setPostData({
      ...postData,
      category: newCategory,
    });
  };

  const onChangeDetailForm = (key: string, value: any) => {
    setPostData({
      ...postData,
      [key]: value,
    });
  };

  const handleSubmitPost = () => {
    (async () => {
      const action = createNewPost(postData);
      const data: any = await dispatch(action);
      const resultAction = unwrapResult(data);
      router.push("/");

      // const resultData = await postApi.createNewPost(postData);
      // if (resultData?.data?.status === 200) {
      //   enqueueSnackbar(resultData?.data?.message, { variant: "success" });
      // } else {
      //   enqueueSnackbar("Đăng ảnh thất bại", { variant: "error" });
      // }
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

export default PostCreate;
