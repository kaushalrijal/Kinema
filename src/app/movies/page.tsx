"use client";

import { useEffect, useState } from "react";
import { getAddedMovies, getMovieDetails } from "@/utils/request";
import Card from "../components/card";
import Link from "next/link";
import SkeletonCard from "../components/SkeletonCard";

export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const addedMovies = await getAddedMovies();
      // Fetch all details in parallel
      const details = await Promise.all(
        addedMovies.map((movie: any) => getMovieDetails(movie.tmdb_id))
      );
      setMovies(details.filter(Boolean));
      setLoading(false);
    };
    fetchMovies();
  }, []);

  return (
    <div className="container py-12 min-h-screen">
      <h1 className="section-title mb-10">Recently Added Movies</h1>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {/* Render multiple skeleton cards while loading */}
          {Array.from({ length: 20 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {movies.map((data) => (
            <Link href={`/watch/movie/${data.id}`} key={data.id}>
              <Card
                Img={data.poster_path}
                Type="Movie"
                Title={data.title?.length > 24 ? data.title.slice(0, 24) + "…" : data.title}
                Date={data.release_date ? new Date(data.release_date).getFullYear() : "Year"}
                RunTime={data.vote_average ? data.vote_average.toFixed(1) + " Rating" : "Rating"}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
