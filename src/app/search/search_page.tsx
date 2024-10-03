"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "../components/card";
import Example from "./dropdown";

const SearchPage = (props) => {
  const movies = props.results;
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const filterMovies = (filter) => {
    let sortedMovies = [null];
    switch (filter) {
      case "Release Date":
        sortedMovies = [...movies].sort(
          (a, b) => +new Date(b.release_date) - +new Date(a.release_date)
        );
        break;

      case "Popularity":
        sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
        break;

      case "Ratings":
        sortedMovies = [...movies].sort(
          (a, b) => b.vote_average - a.vote_average
        );
        break;

      default:
        break;
    }
    setFilteredMovies(sortedMovies);
  };

  return (
    <div>
      <div className="text-2xl m-2 flex justify-between items-center text-black dark:text-white">
        Search results for &apos;{props.searchText}&apos;
        <span className="flex flex-col  text-black dark:text-white">
          <Example setFilter={filterMovies} />
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredMovies.map((item) => {
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

export default SearchPage;
