// libs
import React, { createContext, useState } from "react";
import dictionary from "../Language";

export const LanguageContext = createContext(null);

type LanguageProviderProps = {
  children: any;
};

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [defaultLanguage, setDefaultLanguage] = useState(dictionary.EN);
  const handleChangeVN = () => {
    setDefaultLanguage(dictionary.VN);
  };
  const handleChangeEN = () => {
    setDefaultLanguage(dictionary.EN);
  };
  const initial = {
    defaultLanguage,
    handleChangeVN,
    handleChangeEN,
    setDefaultLanguage,
  };

  return <LanguageContext.Provider value={initial}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
