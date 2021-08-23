// libs
import React from "react";

const SearchHeader = () => {
  return (
    <div className="ass1-header__search">
      <form action="#">
        <label>
          <input
            type="search"
            name="search-text"
            className="form-control"
            placeholder="Nhập từ khóa ..."
          />
          <i className="icon-Search" />
        </label>
      </form>
    </div>
  );
};

export default SearchHeader;
