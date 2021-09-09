// libs
import React, { createContext, useState } from "react";
import dictionary from "../Language";

export const ThemeContext = createContext(null);

type ThemeProviderProps = {
  children: any;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [defaultColor, setDefaultColor] = useState({
    isColor: true,
    light: {
      backgroundColor: "#fbfbfb",
    },
    dark: {
      backgroundColor: "#d9dad7",
    },
  });

  const handleChangeColor = () => {
    setDefaultColor({
      ...defaultColor,
      isColor: !defaultColor.isColor,
    });
  };

  const themeContextData = {
    defaultColor,
    handleChangeColor,
  };

  return <ThemeContext.Provider value={themeContextData}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
