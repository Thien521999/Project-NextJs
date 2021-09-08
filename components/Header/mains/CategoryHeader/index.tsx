// libs
import { unwrapResult } from "@reduxjs/toolkit";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
// others
import { LanguageContext } from "../../../../context/LanguageContext";
import { getCategory } from "../../headerSlice";

const CategoryHeader = () => {
  const [listCategory, setListCategory] = useState([]);
  const dispatch = useDispatch();

  const { defaultLanguage } = useContext(LanguageContext);

  useEffect(() => {
    (async () => {
      const action = getCategory();
      const resultAction: any = await dispatch(action);
      const category = unwrapResult(resultAction);
      setListCategory(category);
    })();
  }, [dispatch]);

  return (
    <div className="category">
      <Typography color="inherit" style={{ marginLeft: "20px" }}>
        <span style={{ color: "#fff", fontSize: "0.875rem", fontWeight: "bold" }}>{defaultLanguage.Category}</span>
      </Typography>
      <div className="ass1-header__nav">
        <div className="container">
          <ul>
            {listCategory.map((category) => (
              <li key={category?.id}>
                <Link href="/categories/[cateId]" as={`/categories/${category?.id}`} passHref>
                  <Typography variant="h6" style={{ cursor: "pointer", fontSize: "15px" }}>
                    <span className="text-category">{category?.text}</span>
                  </Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="ass1-header__menu-transition" />
      </div>
    </div>
  );
};

export default CategoryHeader;
