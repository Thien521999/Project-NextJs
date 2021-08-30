// libs
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Avatar, Button } from "@material-ui/core";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

type PropsType = {
  userDetailInfo: any;
  postCount: number;
};

const UserDetailInfo: React.FC<PropsType> = ({ userDetailInfo, postCount }) => {
  const currentUser = useSelector((state: any) => state.user.current?.user);

  if (!userDetailInfo) return null;

  const isCheck = currentUser?.USERID === userDetailInfo?.USERID;

  return (
    <div className="ass1-head-user">
      <div className="ass1-head-user__content">
        <div className="ass1-head-user__image">
          <a>
            <Avatar
              style={{ width: "150px", height: "150px" }}
              // variant="square"
              alt={userDetailInfo.fullname}
              src={userDetailInfo.profilepicture || "/images/cat-1634369_1920.jpg"}
            />
          </a>
        </div>
        <div className="ass1-head-user__info">
          <div className="ass1-head-user__info-head">
            <div className="ass1-head-user__name">
              <span>{userDetailInfo.fullname}</span>
              <BeenhereIcon />
              {/* <i>
                <Avatar
                  // style={{ width: "100%", height: "100%" }}
                  variant="square"
                  alt=""
                  src="/fonts/emotion/svg/Verified.svg"
                />
              </i> */}
            </div>
            <div className="w-100" />
            {isCheck ? (
              <>
                <Link href="/users/password" passHref>
                  <Button variant="outlined" color="primary" style={{ marginRight: "15px" }}>
                    Change password
                  </Button>
                </Link>
                <Link href="/users/profile" passHref>
                  <Button variant="outlined" color="primary">
                    Profile
                  </Button>
                </Link>
              </>
            ) : (
              <Button variant="outlined" color="primary">
                Follow
              </Button>
            )}
          </div>
          <div className="ass1-head-user__info-statistic">
            <div className="ass1-btn-icon">
              <PostAddIcon />
              <span>Bài viết: {postCount}</span>
            </div>
            <div className="ass1-btn-icon">
              <PersonAddOutlinedIcon />
              <span>Theo dõi: {userDetailInfo?.yourviewed}</span>
            </div>
            <div className="ass1-btn-icon">
              <PersonOutlineOutlinedIcon />
              <span>Đang theo dõi: {userDetailInfo?.youviewed}</span>
            </div>
            {/* <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> */}
          </div>
          <p>{userDetailInfo.description}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailInfo;
