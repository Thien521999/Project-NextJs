// libs
import Link from "next/link";
import React from "react";
// components
import PostItem from "../PostItem";

const UserPost = ({ userPosts }) => {
  return userPosts.length > 0 ? (
    userPosts.map((post) => <PostItem key={post?.PID} post={post} />)
  ) : (
    <p>
      Bạn chưa có bài viết nào !Truy cập
      <Link href="/posts/create">
        <a> link </a>
      </Link>
      để đăng bài viết.
    </p>
  );
};

export default UserPost;
