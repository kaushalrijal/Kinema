"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/cards/card";
import Example from "./dropdown";
import { SearchResult } from "@/types";

interface SearchPageProps {
  movies: SearchResult[];
  series: SearchResult[];
  searchQuery: string;
}

export default function SearchPage({ movies, series, searchQuery }: SearchPageProps) {
  const [filteredMovies, setFilteredMovies] = useState<SearchResult[]>(movies);
  const [filteredSeries, setFilteredSeries] = useState<SearchResult[]>(series);
  const [filter, setFilter] = useState({
    sort: "Release Date",
    genre: null,
    country: null,
    language: null
  });

  useEffect(() => {
    setFilteredMovies(movies);
    setFilteredSeries(series);
  }, [movies, series]);

  const filterMovies = (filterOptions) => {
    let sortedMovies: SearchResult[] = [...movies];
    let sortedSeries: SearchResult[] = [...series];

    // Apply genre filter if selected
    if (filterOptions.genre) {
      sortedMovies = sortedMovies.filter(movie => 
        movie.genre_ids && movie.genre_ids.includes(filterOptions.genre)
      );
      sortedSeries = sortedSeries.filter(series => 
        series.genre_ids && series.genre_ids.includes(filterOptions.genre)
      );
    }

    // Apply country filter if selected
    if (filterOptions.country) {
      sortedMovies = sortedMovies.filter(movie => 
        movie.origin_country && movie.origin_country.includes(filterOptions.country)
      );
      sortedSeries = sortedSeries.filter(series => 
        series.origin_country && series.origin_country.includes(filterOptions.country)
      );
    }

    // Apply language filter if selected
    if (filterOptions.language) {
      sortedMovies = sortedMovies.filter(movie => 
        movie.original_language === filterOptions.language
      );
      sortedSeries = sortedSeries.filter(series => 
        series.original_language === filterOptions.language
      );
    }

    // Apply sorting
    switch (filterOptions.sort) {
      case "Release Date":
        sortedMovies = sortedMovies.sort((a, b) => {
          const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
          const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
          return dateB - dateA;
        });
        sortedSeries = sortedSeries.sort((a, b) => {
          const dateA = a.first_air_date ? new Date(a.first_air_date).getTime() : 0;
          const dateB = b.first_air_date ? new Date(b.first_air_date).getTime() : 0;
          return dateB - dateA;
        });
        break;

      case "Popularity":
        sortedMovies = sortedMovies.sort((a, b) => b.popularity - a.popularity);
        sortedSeries = sortedSeries.sort((a, b) => b.popularity - a.popularity);
        break;

      case "Ratings":
        sortedMovies = sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
        sortedSeries = sortedSeries.sort((a, b) => b.vote_average - a.vote_average);
        break;

      case "A-Z":
        sortedMovies = sortedMovies.sort((a, b) => 
          (a.title || "").localeCompare(b.title || "")
        );
        sortedSeries = sortedSeries.sort((a, b) => 
          (a.name || "").localeCompare(b.name || "")
        );
        break;

      case "Z-A":
        sortedMovies = sortedMovies.sort((a, b) => 
          (b.title || "").localeCompare(a.title || "")
        );
        sortedSeries = sortedSeries.sort((a, b) => 
          (b.name || "").localeCompare(a.name || "")
        );
        break;

      default:
        break;
    }

    setFilteredMovies(sortedMovies);
    setFilteredSeries(sortedSeries);
    setFilter(filterOptions);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="section-title">Search Results for "{searchQuery}"</h1>
        <Example setFilter={filterMovies} />
      </div>

      {/* Movies Section */}
      {filteredMovies.length > 0 && (
        <section>
          <h2 className="section-title mb-6">Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {filteredMovies.map((item) => (
              <Link href={`/watch/movie/${item.id}`} key={item.id}>
                <Card
                  Img={item.poster_path}
                  Type="Movie"
                  Title={item.title && item.title.length > 24 ? item.title.slice(0, 24) + "…" : item.title || "Untitled"}
                  Date={item.release_date ? new Date(item.release_date).getFullYear() : "Year"}
                  RunTime={item.vote_average ? item.vote_average.toFixed(1) + " Rating" : "Rating"}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Series Section */}
      {filteredSeries.length > 0 && (
        <section>
          <h2 className="section-title mb-6">Series</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {filteredSeries.map((item) => (
              <Link href={`/watch/series/${item.id}`} key={item.id}>
                <Card
                  Img={item.poster_path}
                  Type="Series"
                  Title={item.name && item.name.length > 24 ? item.name.slice(0, 24) + "…" : item.name || "Untitled"}
                  Date={item.first_air_date ? new Date(item.first_air_date).getFullYear() : "Year"}
                  RunTime={item.vote_average ? item.vote_average.toFixed(1) + " Rating" : "Rating"}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* No Results Message */}
      {filteredMovies.length === 0 && filteredSeries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">No results found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
