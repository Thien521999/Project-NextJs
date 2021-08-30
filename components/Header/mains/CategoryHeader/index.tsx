// libs
import { unwrapResult } from "@reduxjs/toolkit";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// others
import { getCategory } from "../../headerSlice";

const CategoryHeader = () => {
  const [listCategory, setListCategory] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const action = getCategory();
      const resultAction: any = await dispatch(action);
      const category = unwrapResult(resultAction);
      setListCategory(category);
    })();
  }, [dispatch]);

  return (
    <nav>
      <ul className="ass1-header__menu">
        <li>
          <span className="category">Danh mục</span>
          <div className="ass1-header__nav">
            <div className="container">
              {listCategory.map((category) => (
                <ul key={category?.id}>
                  <li>
                    <Link href="/categories/[cateId]" as={`/categories/${category?.id}`}>
                      <a>{category?.text}</a>
                    </Link>
                  </li>
                </ul>
              ))}
            </div>
            <div className="ass1-header__menu-transition" />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default CategoryHeader;
