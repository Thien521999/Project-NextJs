// libs
import { Box, Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import React, { useContext, useState } from "react";
// others
import { LanguageContext } from "../../../../context/LanguageContext";

const useStyles = makeStyles((theme) => ({
  menu: {
    top: "62px !important",
  },
}));

const LanguageDialog = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickLanguage = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLanguage = () => {
    setAnchorEl(null);
  };

  const { defaultLanguage, handleChangeVN, handleChangeEN } = useContext(LanguageContext);

  return (
    <>
      <Button onClick={handleClickLanguage} color="inherit">
        {defaultLanguage.LANGUAGE}
      </Button>

      <Menu
        id="simple-menu"
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseLanguage}
        anchorOrigin={{
          vertical: "top", //theo chieu doc
          horizontal: "center", //nam ngang
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        getContentAnchorEl={null}
        className={classes.menu}
      >
        <MenuItem onClick={handleChangeVN}>VIETNAME</MenuItem>
        <MenuItem onClick={handleChangeEN}>ENGLISH</MenuItem>
      </Menu>
    </>
  );
};

export default LanguageDialog;
