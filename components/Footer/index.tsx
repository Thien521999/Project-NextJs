import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const Footer = () => {
  const { defaultLanguage } = useContext(LanguageContext);
  return (
    <div className="ass1-footer">
      <div className="container">
        <p className="text-center">{defaultLanguage.Social_Network_Photo_Editing_Community}</p>
      </div>
    </div>
  );
};

export default Footer;
