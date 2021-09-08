// libs
import { Button, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
// others
import { LanguageContext } from "../../../../context/LanguageContext";
import { ThemeContext } from "../../../../context/ThemeContext";

const Color = () => {
  const { handleChangeColor } = useContext(ThemeContext);
  const { defaultLanguage } = useContext(LanguageContext);

  return (
    <Button color="inherit" onClick={handleChangeColor}>
      {defaultLanguage.COLOR}
    </Button>
  );
};

export default Color;
