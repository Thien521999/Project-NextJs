// libs
import Image from "next/image";
import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import viLocal from "dayjs/locale/vi";
import Link from "next/link";
import { Avatar } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

dayjs.extend(relativeTime);

const PostCommentList = ({ detailPost, commentPost }) => {
  return (
    <div className="ass1-comments">
      <div className="ass1-comments__head">
        <div className="ass1-comments__title">{commentPost?.length || 0} Bình luận</div>
        <div className="ass1-comments__options">
          <span>Sắp xếp theo:</span>
          <a href="#" className="ass1-comments__btn-upvote ass1-btn-icon">
            <i className="icon-Upvote" />
          </a>
          <a href="#" className="ass1-comments__btn-down ass1-btn-icon">
            <i className="icon-Downvote" />
          </a>
          <a href="#" className="ass1-comments__btn-expand ass1-btn-icon">
            <i className="icon-Expand_all" />
          </a>
        </div>
      </div>
      {/*comment*/}
      {commentPost.map((comment) => (
        <div className="ass1-comments__section" key={comment.CID}>
          <Link href="/users/[userId]" as={`/users/${comment?.USERID}`}>
            <a className="ass1-comments__avatar ass1-avatar">
              <Avatar variant="square" alt={comment.fullname} src={comment.profilepicture} />
            </a>
          </Link>
          <div className="ass1-comments__content">
            <Link href="/users/[userId]" as={`/users/${comment?.USERID}`}>
              <a className="ass1-comments__name">{comment.fullname}</a>
            </Link>
            <span style={{ marginLeft: "6px" }} className="ass1-comments__passed">
              {dayjs(comment?.time_added).locale(viLocal).fromNow()}
            </span>
            <p>{comment.comment}</p>
            <div className="ass1-comments__info">
              <a className="ass1-comments__btn-upvote ass1-btn-icon">
                <ArrowUpwardIcon />
                <span>901</span>
              </a>
              <a className="ass1-comments__btn-down ass1-btn-icon">
                <ArrowDownwardIcon />
                <span>36</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCommentList;
