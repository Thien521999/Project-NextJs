// libs
import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import viLocal from "dayjs/locale/vi";
import Image from "next/image";
// others
import { PostType } from "../../../pages";
import { highlighText } from "../../../untils";
import { Avatar } from "@material-ui/core";

type PropsType = {
  post?: PostType;
  customClass?: string;
  isHighlight?: boolean;
  query?: string;
  isOwner?: boolean;
};

dayjs.extend(relativeTime);

const PostItem: React.FC<PropsType> = ({ post, customClass, isHighlight, query, isOwner }) => {
  let className = "ass1-section__item";

  if (customClass) {
    className = className + " " + customClass;
  }

  const renderFullName = () => {
    if (isHighlight && query) {
      return highlighText(post?.fullname, query);
    }
    return post?.fullname;
  };

  const renderContent = () => {
    if (isHighlight && query) {
      return highlighText(post?.post_content, query);
    }
    return post?.post_content;
  };

  const time = dayjs(post?.time_added).locale(viLocal).fromNow();

  let href = "/posts/[postId]";
  let asPath = `/posts/${post?.PID}`;
  if (isOwner) {
    href += "/edit";
    asPath += "/edit";
  }
  if (!post) return null;

  return (
    <div className={className}>
      <div className="ass1-section">
        <div className="ass1-section__head">
          <Link href="/users/[userId]" as={`/users/${post?.USERID}`}>
            <a className="ass1-section__avatar ass1-avatar">
              <Avatar
                style={{ width: "100%", height: "100%" }}
                variant="square"
                alt={post?.fullname}
                src={post?.profilepicture || "/images/avatar-02.png"}
              />
            </a>
          </Link>
          <div>
            <Link href="/users/[userId]" as={`/users/${post?.USERID}`}>
              <a className="ass1-section__name" dangerouslySetInnerHTML={{ __html: renderFullName() }} />
            </Link>
            <span className="ass1-section__passed">{time}</span>
          </div>
        </div>
        <div className="ass1-section__content">
          <p dangerouslySetInnerHTML={{ __html: renderContent() }} />
          <div className="ass1-section__image">
            <Link href={href} as={asPath}>
              <a>
                <Avatar
                  style={{ width: "100%", height: "100%" }}
                  variant="square"
                  alt="rating"
                  src={post?.url_image || "/images/blog-rating.png"}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="ass1-section__footer">
          <Link href={href} as={asPath}>
            <a className="ass1-section__btn-comment ass1-btn-icon">
              <i className="icon-Comment_Full" />
              <span>{post?.count || 0}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
