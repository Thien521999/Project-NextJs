// libs
import React from "react";
// components
import CategoryHeader from "./mains/CategoryHeader";
import SearchHeader from "./mains/SearchHeader";
import TitleHeader from "./mains/TitleHeader";
import UserInformation from "./mains/UserInformation";
import Upload from "./mains/Upload";

const Header = () => {
  return (
    <header>
      <div className="ass1-header">
        <div className="container">
          <TitleHeader />
          <CategoryHeader />
          <SearchHeader />
          <Upload />
          <UserInformation />
        </div>
      </div>
    </header>
  );
};

export default Header;
