import React from "react";
import Card from "../components/card";
import { getSearch } from "@/utils/request";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import SearchPage from "./search_page";

const Search = async ({ searchParams }) => {
  const searchText = searchParams.query;
  const data = await getSearch(searchText);
  return (
    <div className="p-6">
      <SearchPage results={data} searchText={searchText} />
    </div>
  );
};

export default Search;
