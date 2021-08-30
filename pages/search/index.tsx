// libs
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonry from "react-masonry-component";
// components
import { PostType } from "..";
import searchApi from "../../api/searchApi";
// constant
import { BASE_URL } from "../../constants/BASE_URL";
import PostItem from "../../components/Posts/PostItem";

// return ve gi khai bao cai do
type PropsType = {
  listPosts: PostType[];
};

const SearchPage: React.FC<PropsType> = ({ listPosts }) => {
  const router = useRouter();
  const searchStr = (router.query.q || "") as string;

  useEffect(() => {
    if (!searchStr) {
      router.push("/");
    }
  }, [searchStr]);

  return (
    <div className="container">
      <div className="header-search" style={{ padding: "30px 0" }}>
        <h3>
          Từ khóa tiềm kiếm: <strong>{searchStr}</strong>
        </h3>
        <p>Tìm kiếm được ({listPosts.length}) kết quả</p>
      </div>
      <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
        {listPosts.map((post) => (
          <PostItem key={post.PID} post={post} customClass="col-lg-6" isHighlight={true} query={searchStr} />
        ))}
      </Masonry>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query: any = context.query;

  const listPostsRes = await axios({
    method: "get",
    url: `${BASE_URL}/post/search.php?query=${encodeURI(query.q)}`,
  });

  const initialState = {
    listPosts: listPostsRes?.data?.posts,
  };

  return {
    props: initialState,
  };
};

export default SearchPage;
