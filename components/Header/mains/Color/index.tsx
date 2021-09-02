// libs
import { Button, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

// const useStyles = makeStyles((theme) => ({
//   color: {
//     position: "fixed",
//     top: "680px",
//   },
// }));

const Color = () => {
  //   const classes = useStyles();
  const { handleChangeColor } = useContext(ThemeContext);

  return (
    <Button variant="contained" size="small" color="secondary" onClick={handleChangeColor}>
      Color
    </Button>
  );
};

export default Color;
