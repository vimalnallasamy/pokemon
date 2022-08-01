import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { BiSearchAlt2 } from "react-icons/bi";

// In app imports
import "./SearchInput.scss";

function SearchInput({ options, onSearch, placeholder, searchBtnText }) {

  const [searchText, setSearchText] = useState("");

  return (
    <div className="search-wrapper">
      <Select
        className="search-input"
        value={searchText}
        placeholder={placeholder}
        options={options}
        onChange={setSearchText}
        onSubmit={onSearch}
      />
      <button
        className={`search-btn  ${searchText ? '' : 'disabled'}`}
        onClick={() => {
          onSearch(searchText);
          setSearchText("");
        }}
      >
        <BiSearchAlt2 />
        <span className={`search-btn-text`}>{searchBtnText}</span>
      </button>
    </div>
  );
}

SearchInput.propTypes = {
  options: PropTypes.array,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  searchBtnText: PropTypes.string
};

export default SearchInput;
