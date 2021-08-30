// libs
import React from "react";
import Image from "next/image";
import Masonry from "react-masonry-component";
// components
import PostItem from "../../Posts/PostItem";
// others
import { PostType } from "../../../pages";
import { useSelector } from "react-redux";

type PropsType = {
  userDetailPost: PostType[];
  userDetailInfo: any;
};

const UserDetailPost: React.FC<PropsType> = ({ userDetailPost, userDetailInfo }) => {
  const currentUser = useSelector((state: any) => state.user.current?.user);

  if (!userDetailPost) return null;
  const isCheckOwner = currentUser?.USERID === userDetailInfo?.USERID;

  return (
    <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
      {userDetailPost?.map((post) => (
        <PostItem key={post?.PID} post={post} customClass="col-lg-6" isOwner={isCheckOwner} />
      ))}
    </Masonry>
  );
};

export default UserDetailPost;
