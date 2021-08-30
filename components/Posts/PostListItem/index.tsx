// libs
import React, { useState } from "react";
import postApi from "../../../api/postApi";
// import { PostType } from "../../../pages";
// components
import PostItem from "../PostItem";

type PropsType = {
  listPosts: any[];
  handleClick: any;
};

const PostListItem: React.FC<PropsType> = ({ listPosts, handleClick }) => {
  const pagesize = 3;
  const [currPage, setCurrPage] = useState(1);
  const handleClickLoadMore = () => {
    (async () => {
      const dataPost = await postApi.getAll({ pagesize, currPage: currPage + 1 });
      setCurrPage((prev) => prev + 1);
      const posts = dataPost?.data?.posts;

      if (!handleClick) return;
      handleClick(posts);
    })();
  };
  return (
    <div className="ass1-section__list">
      {listPosts.map((post) => (
        <PostItem key={post?.PID} post={post} />
      ))}

      <button className="load-more ass1-btn" onClick={handleClickLoadMore}>
        <span>Xem thêm</span>
      </button>
    </div>
  );
};

export default PostListItem;
