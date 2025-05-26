"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTrendingMovies } from "@/utils/request";

export default function Hero() {
  const [featured, setFeatured] = useState<any>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const movies = await getTrendingMovies();
      if (movies && movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        setFeatured(movies[randomIndex]); // Get a random trending movie
      }
    };
    fetchFeatured();
  }, []);

  if (!featured) return null;

  return (
    <div className="relative w-full h-[60vh] md:aspect-[21/9] rounded-2xl overflow-hidden group">
      {/* Background Image */}
      <Image
        src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
        alt={featured.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {featured.title}
          </h1>
          
          {/* Metadata Pills */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-lightprimary dark:bg-darkprimary text-white text-xs font-semibold">MOVIE</span>
            <span className="px-3 py-1 rounded-full border border-white text-white text-xs">{new Date(featured.release_date).getFullYear()}</span>
            {featured.spoken_languages && featured.spoken_languages.length > 0 && (
              <span className="px-3 py-1 rounded-full border border-white text-white text-xs">{featured.spoken_languages[0].english_name}</span>
            )}
            <span className="px-3 py-1 rounded-full border border-white text-white text-xs">{featured.vote_average.toFixed(1)} Rating</span>
          </div>

          {/* Overview */}
          <p className="text-lg md:text-xl text-gray-200 line-clamp-3">
            {featured.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Link
              href={`/watch/movie/${featured.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-lightprimary dark:bg-darkprimary hover:bg-blue-700 dark:hover:bg-[#d97c13] text-white rounded-lg transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              Watch Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
