// libs
import React from "react";
import { PostType } from "../../../pages";
// components
import PostItem from "../PostItem";

type PropsType = {
  listPosts: PostType[];
};

const PostListItem: React.FC<PropsType> = ({ listPosts }) => {
  // console.log("listPosts", listPosts);

  return (
    <div className="ass1-section__list">
      {listPosts.map((post) => (
        <PostItem key={post.PID} post={post} />
      ))}

      <button className="load-more ass1-btn">
        <span>Xem thêm</span>
      </button>
    </div>
  );
};

export default PostListItem;
