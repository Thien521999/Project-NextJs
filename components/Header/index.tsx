// libs
import React, { useContext } from "react";
// components
import TitleHeader from "./mains/TitleHeader";
import CategoryHeader from "./mains/CategoryHeader";
import SearchHeader from "./mains/SearchHeader";
import LanguageDialog from "./mains/LanguageDialog";
import Upload from "./mains/Upload";
import UserInformation from "./mains/UserInformation";
import Color from "./mains/Color";
// context
import { ThemeContext } from "../../context/ThemeContext";

const Header = () => {
  const { defaultColor } = useContext(ThemeContext);
  const { isColor, light, dark } = defaultColor;
  const style = isColor ? light : dark;

  return (
    <header>
      <div className="ass1-header" style={style}>
        <div className="container">
          <TitleHeader />
          <CategoryHeader />
          <SearchHeader />
          <LanguageDialog />
          <Color />
          <Upload />
          <UserInformation />
        </div>
      </div>
    </header>
  );
};

export default Header;
