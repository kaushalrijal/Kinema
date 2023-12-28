import React from "react";

const Search = ({ searchParams }) => {
  const searchText = searchParams.query;
  return <div>{searchText}</div>;
};

export default Search;
