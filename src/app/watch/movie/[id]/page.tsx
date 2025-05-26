import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getSimilarMovies } from "@/utils/request";
import Card from "@/components/ui/cards/card";
import MoviePlayerClient from "./MoviePlayerClient";
import { Movie, Show, MovieDetails, SimilarResponse } from "@/types";

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
  let movie: MovieDetails | undefined = undefined;
  let similarMovies: SimilarResponse | undefined = undefined;

  try {
    [movie, similarMovies] = await Promise.all([
      getMovieDetails(tmdb_id),
      getSimilarMovies(tmdb_id)
    ]);
  } catch (error) {
    console.error(`Error fetching movie details or similar content for ID ${tmdb_id}:`, error);
  }

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
  const productionCompanies = movie.production_companies?.map((producer: { name: string }) => producer.name).join(", ") || '';
  const genres = movie.genres?.map((genre: { name: string }) => genre.name).join(", ") || '';

  return (
    <div className="container py-8 space-y-12 min-h-screen">
      {/* Player */}
      {movie.id && movie.backdrop_path && (
         <MoviePlayerClient tmdbId={movie.id} backdropPath={movie.backdrop_path} />
      )}

      {/* Main Content Area (Details) */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        {movie.poster_path && (
           <div className="md:col-span-1 hidden md:flex justify-center relative w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] mx-auto md:mx-0 aspect-[2/3]">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.title} poster`}
              fill
              className="object-cover rounded-lg shadow-lg"
              priority
            />
          </div>
        )}

        {/* Info */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-darktext">{movie.title}</h1>
          
          <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            {movie.release_date && (
               <span className="badge">{new Date(movie.release_date).getFullYear()}</span>
            )}
            {movie.runtime && (
               <span className="badge">{`${movie.runtime} min`}</span>
            )}
            {movie.vote_average && (
               <span className="badge">{`TMDB: ${movie.vote_average.toFixed(1)}`}</span>
            )}
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
             {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                 <div>
                   <span className="font-semibold">Language: </span>{movie.spoken_languages[0].english_name}
                 </div>
             )}
             {movie.production_countries && movie.production_countries.length > 0 && (
                 <div>
                   <span className="font-semibold">Country: </span>{movie.production_countries[0].name}
                 </div>
             )}
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {Array.isArray(similarMovies) && similarMovies.length > 0 && (
         <section>
            <h2 className="section-title">You May Also Like</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
               {similarMovies.map((similarItem) => {
                 const mediaType = (similarItem as any).media_type === 'tv' ? 'series' : 'movie';
                 const href = `/watch/${mediaType}/${similarItem.id}`;
                 // Use optional chaining and default values for potentially missing properties
                 const title = (similarItem as Movie).title || (similarItem as Show).name || 'N/A';
                 const date = (similarItem as Movie).release_date || (similarItem as Show).first_air_date;
                 const year = date ? new Date(date).getFullYear() : "Year";
                 const runtime = similarItem.vote_average ? similarItem.vote_average.toFixed(1) + " Rating" : "Rating";
                 const cardTitle = title?.length > 24 ? title.slice(0, 24) + "…" : title;
                 
                 return (
                   <Link href={href} key={similarItem.id}>
                      <Card
                         Img={similarItem.poster_path}
                         Type={mediaType === 'movie' ? 'Movie' : 'Series'}
                         Title={cardTitle}
                         Date={year}
                         RunTime={runtime}
                      />
                   </Link>
                 );
               })}
            </div>
         </section>
      )}
    </div>
  );
}
