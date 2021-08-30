// libs
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import Masonry from "react-masonry-component";
import { useSelector } from "react-redux";
import categoryApi from "../../api/categoryApi";
import PostItem from "../../components/Posts/PostItem";
// constant
import { BASE_URL } from "../../constants/BASE_URL";

// return ve gi khai bao cai do
type PropsType = {
  listCategory: any;
};

const CategoryDetail: React.FC<PropsType> = ({ listCategory }) => {
  const router = useRouter();
  const categoryId = router.query.cateId || "";

  const category = useSelector((state: any) => state.category.dataCategory);

  useEffect(() => {
    if (!categoryId) {
      router.push("/");
    }
  }, [categoryId]);

  const findIndex = useMemo(() => {
    const findObj = category.find((cate) => cate.id === Number(categoryId));
    return findObj?.text;
  }, [category, categoryId]);

  return (
    <div className="container">
      <div className="header-search" style={{ padding: "30px 0" }}>
        <h3>
          Danh mục tiềm kiếm: <strong>{findIndex}</strong>
        </h3>
        <p>Tìm kiếm được ({listCategory.length}) kết quả</p>
      </div>
      <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
        {listCategory.map((post) => (
          <PostItem key={post.PID} post={post} customClass="col-lg-6" />
        ))}
      </Masonry>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currPage = 1;
  const pagesize = 3;
  const query: any = context.query;

  const listCategoryRes = await axios({
    method: "get",
    url: `${BASE_URL}/post/getListByCategory.php?pagesize=${pagesize}&currPage=${currPage}&tagIndex=${query.cateId}`,
  });

  const initialState = {
    listCategory: listCategoryRes?.data?.posts || [],
  };

  return {
    props: initialState,
  };
};

export default CategoryDetail;
