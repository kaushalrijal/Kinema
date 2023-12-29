import React from "react";
import Card from "../components/card";
import { getSearch } from "@/utils/request";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const Search = async ({ searchParams }) => {
  const searchText = searchParams.query;
  const data = await getSearch(searchText);
  return (
    <div className="p-6">
      <p className="text-2xl m-2">
        Search results for &apos;{searchText}&apos;
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data.map((item) => {
          if (item.media_type === "movie") {
            return (
              <Link href={`/watch/movie/${item.id}`} key={item.id}>
                <Card
                  Img={item.poster_path}
                  Type={"MOVIE"}
                  Title={
                    item.title
                      ? item.title.length > 15
                        ? item.title.slice(0, 15) + "..."
                        : item.title
                      : ""
                  }
                  Date={item.release_date ? item.release_date.slice(0, 4) : ""}
                  RunTime={item.vote_average.toFixed(1)}
                />
              </Link>
            );
          } else if (item.media_type === "tv") {
            return (
              <Link href={`/watch/series/${item.id}`} key={item.id}>
                <Card
                  Img={item.poster_path}
                  Type={"SERIES"}
                  Title={
                    item.name
                      ? item.name.length > 15
                        ? item.name.slice(0, 15) + "..."
                        : item.name
                      : ""
                  }
                  Date={
                    item.first_air_date ? item.first_air_date.slice(0, 4) : ""
                  }
                  RunTime={item.vote_average.toFixed(1)}
                />
              </Link>
            );
          } else {
            return "";
          }
        })}
      </div>
    </div>
  );
};

export default Search;
