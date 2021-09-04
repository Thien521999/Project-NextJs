// libs
import { alpha, InputBase, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
// others
import { LanguageContext } from "../../../../context/LanguageContext";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     position: "relative",
//   },
//   iconSearch: {
//     position: "absolute",
//     margin: "6px",
//   },
// }));

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchHeader = () => {
  const classes = useStyles();
  const router = useRouter();
  const [queryStr, setQueryStr] = useState("");
  const { defaultLanguage } = useContext(LanguageContext);

  const onChange = (e: any) => {
    setQueryStr(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (queryStr) {
      router.push(`/search?q=${queryStr}`);
    }
  };

  return (
    // <div className="ass1-header__search">
    //   <form onSubmit={handleSubmit}>
    //     <label className={classes.root}>
    //       <SearchIcon className={classes.iconSearch} />
    //       <input
    //         style={{ paddingLeft: "32px" }}
    //         value={queryStr}
    //         onChange={onChange}
    //         type="search"
    //         name="search-text"
    //         className="form-control"
    //         placeholder={`${defaultLanguage.Enter_keyword}`}
    //       />
    //     </label>
    //   </form>
    // </div>
    <div className={classes.search}>
      <form onSubmit={handleSubmit}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={`${defaultLanguage.Enter_keyword}`}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={queryStr}
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default SearchHeader;
