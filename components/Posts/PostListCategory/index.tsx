// libs
import React from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";

const PostListCategory = ({ categoryPost }) => {
  return (
    <div className="list-categories">
      <h5>
        <strong>Danh mục:</strong>
      </h5>
      <ul className="categories">
        {categoryPost.map((cate) => (
          <li key={cate.TAG_ID} style={{ marginRight: "10px" }}>
            <Link href="/categories/[cateId]" as={`/categories/${cate.tag_index}`}>
              <Button variant="contained" color="primary">
                {cate.tag_value}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListCategory;
