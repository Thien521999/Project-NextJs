// libs
import React, { useContext, useState } from "react";
// import { GetServerSideProps } from "next";
// import { InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
// import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
// components
import PostListItem from "../components/Posts/PostListItem";
import HomeSideBar from "../components/Posts/HomeSideBar";
// hooks
import useNotAuthentication from "../hooks/useNotAuthentication";
// styles
// import styles from "../styles/Home.module.scss";
import postApi from "../api/postApi";
import { Storekeys } from "../constants/Login";
import { ThemeContext } from "../context/ThemeContext";

export type PostType = {
  USERID: string;
  profilepicture: string;
  fullname: string;
  PID: string;
  url_image: string;
  post_content: string;
  time_added: string;
  status: string;
  count: string | null;
};

// type HomeDataProps = {
//   listPosts: PostType[];
//   userPosts: PostType[];
// };

// type HomeProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const Home = () => {
  useNotAuthentication();
  const router = useRouter();

  const userId = JSON.parse(localStorage.getItem(Storekeys.USER))?.USERID;

  const [listPosts, setListPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const { defaultColor } = useContext(ThemeContext);
  const { isColor, light, dark } = defaultColor;
  const style = isColor ? light : dark;

  useEffect(() => {
    (async () => {
      const params = {
        pagesize: 3,
        currPage: 1,
      };
      const listPostsPros = postApi.getAll(params);
      const userPostPros = postApi.get(userId);

      const [listPostRes, userPostRes] = await Promise.all([listPostsPros, userPostPros]);
      setListPosts(listPostRes?.data?.posts);
      setUserPosts(userPostRes?.data?.posts);
    })();
  }, []);

  const handleClick = (posts) => {
    const newPost = posts || [];
    setListPosts([...listPosts, ...newPost]);
  };

  return (
    <div className="container" style={style}>
      <div className="row">
        <div className="col-lg-8">
          <PostListItem listPosts={listPosts} handleClick={handleClick} />
        </div>
        <div className="col-lg-4">
          <HomeSideBar userPosts={userPosts} />
        </div>
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<HomeDataProps> = async (context) => {
//   const params = {
//     pagesize: 3,
//     currPage: 1,
//   };
//   const listPostsRes = await postApi.getAll(params);
//   // console.log("api-----", listPostsRes?.data?.posts);
//   // const userPostRes = await postApi.get()

//   const props = {
//     listPosts: listPostsRes?.data?.posts || [],
//     userPosts: [],
//   };

//   return {
//     props,
//   };
// };

export default Home;
