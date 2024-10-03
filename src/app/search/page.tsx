import React from "react";
import { getSearch } from "@/utils/request";
import SearchPage from "./search_page";

const Search = async ({ searchParams }) => {
  const searchText = searchParams.query;
  const data = await getSearch(searchText);
  return (
    <div className="p-6 bg-lightbg dark:bg-darkbg">
      <SearchPage results={data} searchText={searchText} />
    </div>
  );
};

export default Search;
