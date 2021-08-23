// libs
import React from "react";
// components
import UserDetailInfo from "../../components/User/UserDetailInfo";
import UserDetailPost from "../../components/User/UserDetailPost";

const UserDetail = () => {
  return (
    <div className="container">
      <UserDetailInfo />
      <UserDetailPost />
    </div>
  );
};

export default UserDetail;
