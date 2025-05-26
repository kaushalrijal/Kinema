"use client";

import React from "react";
import { useEffect, useState } from "react";
import Card from "@/components/ui/cards/card";
import Link from "next/link";
import { getTopRatedMovies, getTopRatedSeries } from "@/utils/request";
import { Movie, Show } from "@/types";

export default function CardGrid() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const [moviesData, seriesData] = await Promise.all([
          getTopRatedMovies(),
          getTopRatedSeries()
        ]);

        console.log('Movies Data (after fetch):', moviesData, 'Type:', typeof moviesData, 'isArray:', Array.isArray(moviesData));
        console.log('Series Data (after fetch):', seriesData, 'Type:', typeof seriesData, 'isArray:', Array.isArray(seriesData));

        if (!Array.isArray(moviesData) || !Array.isArray(seriesData)) {
           console.error('Validation failed: Data is not an array', { movies: moviesData, series: seriesData });
           throw new Error('Fetched data is not in the expected array format.');
        }
         if (moviesData === undefined || seriesData === undefined) {
            console.error('Validation failed: Data is undefined', { movies: moviesData, series: seriesData });
            throw new Error('Fetched data is undefined.');
         }

        setMovies(moviesData);
        setSeries(seriesData);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to fetch content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightprimary dark:border-darkprimary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Top Rated Movies */}
      <section>
        <h2 className="section-title">Top Rated Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {movies?.map((movie) => (
            <Link href={`/watch/movie/${movie.id}`} key={movie.id} passHref legacyBehavior>
              <a tabIndex={-1} className="block focus:outline-none">
                <Card
                  Img={movie.poster_path}
                  Type="Movie"
                  Title={movie.title}
                  Date={new Date(movie.release_date).getFullYear()}
                  RunTime={`${movie.vote_average.toFixed(1)} Rating`}
                />
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Series */}
      <section>
        <h2 className="section-title">Top Rated Series</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {series?.map((show) => (
            <Link href={`/watch/series/${show.id}`} key={show.id} passHref legacyBehavior>
              <a tabIndex={-1} className="block focus:outline-none">
                <Card
                  Img={show.poster_path}
                  Type="Series"
                  Title={show.name}
                  Date={new Date(show.first_air_date).getFullYear()}
                  RunTime={`${show.vote_average.toFixed(1)} Rating`}
                />
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
