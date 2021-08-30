// libs
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

type PropTypes = {
  category: string[];
  onChangeCategory: (a: string[]) => void;
  handleSubmitPost: () => void;
};

const PostDetailSideBar: React.FC<PropTypes> = ({ category, onChangeCategory, handleSubmitPost }) => {
  const listCategory = useSelector((state: any) => state.category.dataCategory);

  const handleCheck = (e) => {
    const isCheck = e.target.checked; // true
    const value = e.target.value;
    const findIdx = category.findIndex((cateId) => cateId === value);
    const isExisting = findIdx !== -1;
    if (!isExisting && isCheck) {
      // ko ton tai va check vao ô thì push vào
      onChangeCategory([...category, value]);
    } else if (!isCheck) {
      onChangeCategory(category.filter((id) => id !== value));
    }
  };

  return (
    <aside className="ass1-aside ass1-aside__edit-post">
      <div>
        <button onClick={handleSubmitPost} className="ass1-btn">
          Đăng bài
        </button>
      </div>
      <div className="ass1-aside__edit-post-head">
        <span style={{ display: "block", width: "100%", marginBottom: "10px" }}>Chọn danh mục</span>
        {listCategory.map((cate) => (
          <label className="ass1-checkbox" key={cate.id}>
            <input type="checkbox" name="category" value={cate.id} onChange={handleCheck} />
            <span />
            <p>{cate.text}</p>
          </label>
        ))}
      </div>
      <div className="ass1-aside__get-code">
        <p>Share Link</p>
      </div>
      <div className="ass1-aside__social">
        <Link href="/">
          <a className="ass1-btn-social__facebook ass1-btn-social">
            <i className="fa fa-facebook" aria-hidden="true" />
          </a>
        </Link>
        <Link href="/">
          <a className="ass1-btn-social__twitter ass1-btn-social">
            <i className="fa fa-twitter" aria-hidden="true" />
          </a>
        </Link>
        <Link href="/">
          <a className="ass1-btn-social__google ass1-btn-social">
            <i className="fa fa-google-plus" aria-hidden="true" />
          </a>
        </Link>
      </div>
    </aside>
  );
};

export default PostDetailSideBar;
