// libs
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import postApi from "../api/postApi";
import jwt_decode from "jwt-decode";
// components
import HomeSideBar from "../components/HomeSideBar";
import PostListItem from "../components/Posts/PostListItem";
// styles
import styles from "../styles/Home.module.scss";

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

type HomeDataProps = {
  listPosts: PostType[];
  userPosts: PostType[];
};

type HomeProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const Home = () => {
  const userId = useSelector((state: any) => state.user.current?.user?.USERID);
  const token = useSelector((state: any) => state.user.current?.token);
  // const userId = jwt_decode(token);
  // console.log(userId);

  useEffect(() => {
    (async () => {
      const params = {
        pagesize: 3,
        currPage: 1,
      };
      const listPostsRes = await postApi.getAll(params);
      const listPosts = listPostsRes?.data?.posts;

      const userPostRes = await postApi.get(userId);
      console.log(userPostRes);

      // Promise.all(listPostsRes, userPostRes).then(() => {
      //   const listPosts = listPostsRes?.data?.posts;
      //   const userPosts = userPostsPros?.data?.posts;
      // });
      // console.log(userPostRes);
    })();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">{/* <PostListItem listPosts={listPosts} /> */}</div>
        <div className="col-lg-4">{/* <HomeSideBar userPosts={userPosts} /> */}</div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeDataProps> = async (context) => {
  const params = {
    pagesize: 3,
    currPage: 1,
  };
  const listPostsRes = await postApi.getAll(params);
  // console.log("api-----", listPostsRes?.data?.posts);
  // const userPostRes = await postApi.get()

  const props = {
    listPosts: listPostsRes?.data?.posts || [],
    userPosts: [],
  };

  return {
    props,
  };
};

export default Home;
