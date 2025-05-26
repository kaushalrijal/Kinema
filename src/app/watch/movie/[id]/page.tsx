import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getSimilarMovies } from "@/utils/request";
import Card from "@/app/components/card";
import MoviePlayerClient from "./MoviePlayerClient";

import { Metadata } from "next";

// List of unavailable movies (consider moving this to a config or env var)
const UNAVAILABLE_MOVIES = [1144681, 1064486];

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  // Check if movie is unavailable first
  if (UNAVAILABLE_MOVIES.includes(Number(params.id))) {
    return {
      title: "Content Not Available - Kinema",
      description: "This content is currently not available on Kinema",
    };
  }

  const movie = await getMovieDetails(params.id);
  const { title, release_date } = movie;
  const year = release_date ? release_date.split("-")[0] : "";
  const pageTitle = `Watch ${title} (${year}) - Kinema`;
  const pageDescription = `${title} movie stream, ${title} online movie download, watch ${title} online, ${title} watch online, ${title} free download, ${title} online streaming, kinema, kinematv, kinema tv, kinema hd, kinematv hd, watch ${title} movie online`;

  const openGraph = {
    type: "website",
    url: `https://kinematv.vercel.app/watch/movie/${params.id}`,
    images: [
      {
        url: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
        alt: `${movie.title} backdrop`,
      },
    ],
  };

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph,
  };
}

export default async function WatchMoviePage({ params }: { params: { id: string } }) {
  // Convert params.id to number for proper comparison
  const tmdb_id = Number(params.id);

  // Check if movie is unavailable
  if (UNAVAILABLE_MOVIES.includes(tmdb_id)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-darkbg text-gray-900 dark:text-darktext">
        <div className="text-center p-8 max-w-lg mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Content Not Available</h1>
          <p className="text-lg">We apologize, but this content is currently not available on our platform.</p>
          <Link href="/" className="text-lightprimary dark:text-darkprimary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Fetch movie details and similar movies in parallel
  const [movie, similarMovies] = await Promise.all([
    getMovieDetails(tmdb_id),
    getSimilarMovies(tmdb_id)
  ]);

  if (!movie) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-darkbg text-gray-900 dark:text-darktext">
        <div className="text-center p-8 max-w-lg mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Error loading movie details</h1>
          <p className="text-lg">Could not fetch movie details. Please try again later.</p>
           <Link href="/" className="text-lightprimary dark:text-darkprimary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Format production companies and genres
  const productionCompanies = movie.production_companies.map((producer: any) => producer.name).join(", ");
  const genres = movie.genres.map((genre: any) => genre.name).join(", ");

  return (
    <div className="container py-8 space-y-12 min-h-screen">
      {/* Player */}
      <MoviePlayerClient tmdbId={movie.id} backdropPath={movie.backdrop_path} />

      {/* Main Content Area (Details) */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="md:col-span-1 hidden md:flex justify-center relative w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] mx-auto md:mx-0 aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title} poster`}
            fill
            className="object-cover rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-darktext">{movie.title}</h1>
          
          <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : "Year"}</span>
            <span>•</span>
            <span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
             <span>•</span>
            <span>{movie.vote_average ? `TMDB: ${movie.vote_average.toFixed(1)}` : "Rating N/A"}</span>
          </div>
          
          <p className="text-lg text-gray-900 dark:text-darktext leading-relaxed">{movie.overview}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-900 dark:text-darktext">
             {genres && (
                <div>
                   <span className="font-semibold">Genres: </span>{genres}
                </div>
             )}
             {productionCompanies && (
                <div>
                   <span className="font-semibold">Production: </span>{productionCompanies}
                </div>
             )}
             {movie.spoken_languages.length > 0 && (
                 <div>
                   <span className="font-semibold">Language: </span>{movie.spoken_languages[0].english_name}
                 </div>
             )}
             {movie.production_countries.length > 0 && (
                 <div>
                   <span className="font-semibold">Country: </span>{movie.production_countries[0].name}
                 </div>
             )}
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies && similarMovies.results && similarMovies.results.length > 0 && (
         <section>
            <h2 className="section-title">More Like This</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
               {similarMovies.results.map((similarMovie: any) => (
                  <Link href={`/watch/movie/${similarMovie.id}`} key={similarMovie.id}>
                     <Card
                        Img={similarMovie.poster_path}
                        Type="Movie"
                        Title={similarMovie.title?.length > 24 ? similarMovie.title.slice(0, 24) + "…" : similarMovie.title}
                        Date={similarMovie.release_date ? new Date(similarMovie.release_date).getFullYear() : "Year"}
                        RunTime={similarMovie.vote_average ? similarMovie.vote_average.toFixed(1) + " Rating" : "Rating"}
                     />
                  </Link>
               ))}
            </div>
         </section>
      )}
    </div>
  );
}
