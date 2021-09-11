// libs
import Link from "next/link";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GTranslateIcon from "@material-ui/icons/GTranslate";
// others
import { LanguageContext } from "../../../context/LanguageContext";

type PropTypes = {
  category: string[];
  onChangeCategory: (a: string[]) => void;
  handleSubmitPost: () => void;
};

const PostDetailSideBar: React.FC<PropTypes> = ({ category, onChangeCategory, handleSubmitPost }) => {
  const listCategory = useSelector((state: any) => state.category.dataCategory);

  const { defaultLanguage } = useContext(LanguageContext);

  const handleCheck = (e: any) => {
    const isCheck = e.target.checked; // true
    const value = e.target.value;
    console.log(value, isCheck);

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
          {defaultLanguage.Post}
        </button>
      </div>
      <div className="ass1-aside__edit-post-head">
        <span style={{ display: "block", width: "100%", marginBottom: "10px" }}>{defaultLanguage.Choose_category}</span>
        {listCategory.map((cate) => (
          <label className="ass1-checkbox" key={cate.id}>
            <input
              type="checkbox"
              name="category"
              checked={category.indexOf(cate.id.toString()) !== -1}
              value={cate.id}
              onChange={handleCheck}
            />
            <span />
            <p>{cate.text}</p>
          </label>
        ))}
      </div>
      <div className="ass1-aside__get-code">
        <p>{defaultLanguage.Share_link}</p>
      </div>
      <div className="ass1-aside__social">
        <Link href="https://www.facebook.com/">
          <a className=" ass1-btn-social">
            <FacebookIcon />
          </a>
        </Link>
        <Link href="https://twitter.com/">
          <a className=" ass1-btn-social">
            <TwitterIcon />
          </a>
        </Link>
        <Link href="https://translate.google.com/">
          <a className=" ass1-btn-social">
            <GTranslateIcon />
          </a>
        </Link>
      </div>
    </aside>
  );
};

export default PostDetailSideBar;
