import React from "react";
import { getSearch } from "@/utils/request";
import SearchPage from "./search_page";

const Search = async ({ searchParams }) => {
  const searchText = searchParams.query;
  const data = await getSearch(searchText);

  // Ensure we have valid data before filtering
  const results = data || [];
  
  // Filter search results into movies and series
  const movies = results.filter(item => item?.media_type === 'movie') || [];
  const series = results.filter(item => item?.media_type === 'tv') || [];

  return (
    <div className="container py-12 min-h-screen">
      <SearchPage movies={movies} series={series} searchQuery={searchText} />
    </div>
  );
};

export default Search;
