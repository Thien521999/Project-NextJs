// libs
import React from "react";
import { PostType } from "../../pages";
import { useSelector } from "react-redux";
import Link from "next/link";

type PropsType = {
  userPosts: PostType[];
};

const HomeSideBar: React.FC<PropsType> = ({ userPosts }) => {
  const userInfo = useSelector((state: any) => state.user.current);
  // console.log(userInfo);
  // console.log("userPosts", userPosts);
  return (
    <div>
      <aside className="ass1-aside">
        <div className="ass1-content-head__t">
          <div>Bài viết gần đây của bạn.</div>
        </div>
        {userInfo ? (
          <div>List Item</div>
        ) : (
          <div>
            <Link href="/login">
              Vui lòng đăng nhập để xem nội dung này
              <a>Đăng nhập</a>
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
};

export default HomeSideBar;
