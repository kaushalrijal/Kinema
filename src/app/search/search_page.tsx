"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/cards/card";
import Example from "./dropdown";
import { SearchResult, Movie, Show } from "@/types";

interface SearchPageProps {
  movies: SearchResult[];
  series: SearchResult[];
}

export default function SearchPage({ movies, series }: SearchPageProps) {
  const [filteredMovies, setFilteredMovies] = useState<SearchResult[]>(movies);
  const [filteredSeries, setFilteredSeries] = useState<SearchResult[]>(series);
  const [filter, setFilter] = useState("Release Date");

  useEffect(() => {
    setFilteredMovies(movies);
    setFilteredSeries(series);
  }, [movies, series]);

  const filterMovies = (filter) => {
    let sortedMovies: SearchResult[] = [...movies];
    let sortedSeries: SearchResult[] = [...series];
    switch (filter) {
      case "Release Date":
        sortedMovies = [...movies].sort((a, b) => {
          const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
          const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
          return dateB - dateA;
        });
        sortedSeries = [...series].sort((a, b) => {
          const dateA = a.first_air_date ? new Date(a.first_air_date).getTime() : 0;
          const dateB = b.first_air_date ? new Date(b.first_air_date).getTime() : 0;
          return dateB - dateA;
        });
        break;

      case "Popularity":
        sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
        sortedSeries = [...series].sort((a, b) => b.popularity - a.popularity);
        break;

      case "Ratings":
        sortedMovies = [...movies].sort(
          (a, b) => b.vote_average - a.vote_average
        );
        sortedSeries = [...series].sort(
          (a, b) => b.vote_average - a.vote_average
        );
        break;

      default:
        break;
    }
    setFilteredMovies(sortedMovies);
    setFilteredSeries(sortedSeries);
  };

  return (
    <div>
      <div className="text-2xl m-2 flex justify-between items-center text-black dark:text-white">
        {/* Search text display removed as it is not available in props */}
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
}
