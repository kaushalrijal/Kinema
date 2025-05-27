import React from "react";
import { getSearch } from "@/utils/request";
import SearchPage from "./search_page";

const Search = async ({ searchParams }) => {
  const searchText = searchParams.query;
  const data = await getSearch(searchText);

  // Filter search results into movies and series
  const movies = data?.results.filter(item => item.media_type === 'movie') || [];
  const series = data?.results.filter(item => item.media_type === 'tv') || [];

  return (
    <div className="p-6 bg-lightbg dark:bg-darkbg">
      <SearchPage movies={movies} series={series} />
    </div>
  );
};

export default Search;
