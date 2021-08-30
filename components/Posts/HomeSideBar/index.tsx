// libs
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
// components
import PostItem from "../PostItem";
import UserPost from "../UserPost";
// import { PostType } from "../../pages";

// type PropsType = {
//   userPosts: PostType[];
// };

const HomeSideBar = ({ userPosts }) => {
  // console.log(userPosts);
  const userInfo = useSelector((state: any) => state.user.current);
  return (
    <aside className="ass1-aside">
      <div className="ass1-content-head__t">
        <div>Bài viết gần đây của bạn.</div>
      </div>
      {userInfo ? (
        <UserPost userPosts={userPosts} />
      ) : (
        <div>
          Vui lòng đăng nhập để xem nội dung này
          <Link href="/login">
            <a>Đăng nhập</a>
          </Link>
        </div>
      )}
    </aside>
  );
};

export default HomeSideBar;
