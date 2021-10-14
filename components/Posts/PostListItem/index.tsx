// libs
import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import postApi from "../../../api/postApi";
// import { PostType } from "../../../pages";
// components
import PostItem from "../PostItem";

const useStyles = makeStyles((theme) => ({
  loadMore: {
    display: "flex",
    margin: "auto",
  },
}));

type PropsType = {
  listPosts: any[];
  handleClick: any;
};

const PostListItem: React.FC<PropsType> = ({ listPosts, handleClick }) => {
  const classes = useStyles();
  const pagesize = 3;
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

      <Button className={classes.loadMore} variant="contained" color="primary" onClick={handleClickLoadMore}>
        Xem thêm
      </Button>
    </div>
  );
};

export default PostListItem;
