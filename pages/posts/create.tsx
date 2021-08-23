// libs
import React from "react";
import PostDetail from "./[postId]";
import PostDetailForm from "../../components/Posts/PostDetailForm";
import PostDetailSideBar from "../../components/Posts/PostDetailSideBar";
import useNotAuthentication from "../../hooks/useNotAuthentication";

const PostCreate = () => {
  useNotAuthentication();
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailForm />
        </div>
        <div className="col-lg-4">
          <PostDetailSideBar />
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
