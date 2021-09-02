// libs
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { LanguageContext } from "../../../../context/LanguageContext";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  iconSearch: {
    position: "absolute",
    margin: "6px",
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
    <div className="ass1-header__search">
      <form onSubmit={handleSubmit}>
        <label className={classes.root}>
          <SearchIcon className={classes.iconSearch} />
          <input
            style={{ paddingLeft: "32px" }}
            value={queryStr}
            onChange={onChange}
            type="search"
            name="search-text"
            className="form-control"
            placeholder={`${defaultLanguage.Enter_keyword}`}
          />
        </label>
      </form>
    </div>
  );
};

export default SearchHeader;
