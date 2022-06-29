import React from "react";

import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRowSelect, FormRow } from "./index.js";
import { useStateValue } from "../context/StateContext";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchType,
    searchStatus,
    sort,
    sortOptions,
    typeOptions,
    statusOptions,
    handleProductChange,
    clearFilters,
  } = useStateValue();

  const handleFilterChange = (e) => {
    if (isLoading) return;

    handleProductChange(e.target.name, e.target.value);
  };

  const handleClear = (e) => {
    e.preventDefault();
    clearFilters();
  }

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Center</h4>
        <div className="form-center">
          <FormRow
            name="search"
            type="text"
            value={search}
            onChange={handleFilterChange}
          />

          <FormRowSelect
            name="searchType"
            value={searchType}
            options={["all", ...typeOptions]}
            onChange={handleFilterChange}
          />

          <FormRowSelect
            name="searchStatus"
            value={searchStatus}
            options={["all", ...statusOptions]}
            onChange={handleFilterChange}
          />

          <FormRowSelect
            name="sort"
            value={sort}
            options={sortOptions}
            onChange={handleFilterChange}
          />

          <button 
            className="btn btn-block btn-dang"
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
