"use client";

import { useEffect, useState } from "react";
import Card from "./card";
import Link from "next/link";
import { getTopRatedMovies, getTopRatedSeries } from "@/utils/request";

export default function CardGrid() {
  const [movies, setMovies] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      const [moviesData, seriesData] = await Promise.all([
        getTopRatedMovies(),
        getTopRatedSeries()
      ]);
      setMovies(moviesData);
      setSeries(seriesData);
    };
    fetchContent();
  }, []);

  return (
    <div className="space-y-16">
      {/* Top Rated Movies */}
      <section>
        <h2 className="section-title">Top Rated Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {movies.map((movie) => (
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
          {series.map((show) => (
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
