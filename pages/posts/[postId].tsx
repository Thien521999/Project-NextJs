// libs
import React from "react";
// components
import HomeSideBar from "../../components/HomeSideBar";
import PostDetailContent from "../../components/Posts/PostDetailContent";

const PostDetail = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <PostDetailContent />
        </div>
        <div className="col-lg-4">
          <HomeSideBar />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
