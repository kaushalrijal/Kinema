import React from "react";
import Image from "next/image";
import SubDetails from "../subdetails";
import WatchMovie from "./watch";
import { getMovieDetails, getSimilarMovies } from "@/utils/request";
import VCardDiv from "@/app/components/cardCollectionV";
import Warning from "@/app/components/warning";
import SimilarMovies from "./similar";

import { Metadata } from "next";

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
        url: `https://www.themoviedb.org/t/p/original/${movie.backdrop_path}`,
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

const Watch = async ({ params }: { params: { id: number } }) => {
  // Convert params.id to number for proper comparison
  const tmdb_id = Number(params.id);
  
  // Check if movie is unavailable
  if (UNAVAILABLE_MOVIES.includes(tmdb_id)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lightbg dark:bg-darkbg">
        <div className="text-center p-8 max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
            Content Not Available
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We apologize, but this content is currently not available on our platform.
          </p>
          <a 
            href="/"
            className="text-primary dark:text-gray-50 hover:text-primary/80 underline"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  const Movie = await getMovieDetails(tmdb_id);

  let production = "";
  const productions = Movie.production_companies.map((producer) => {
    return (production = producer.name + ", " + production);
  });
  const subdetails = [
    { title: "Year", detail: Movie.release_date.slice(0, 4) },
    {
      title: "Genre(s)",
      detail: Movie.genres.map((genre) => {
        return ` ` + genre.name;
      }),
    },
    { title: "Duration", detail: Movie.runtime + " min" },
    {
      title: "Production",
      detail: production.slice(0, production.length - 2),
    },
  ];

  const similarMovies = await getSimilarMovies(tmdb_id);

  return (
    <div className="bg-lightbg dark:bg-darkbg">
      <Warning message="Some movies are yet to be added and won't load. Please check back soon :)" />
      <WatchMovie tmdb_id={Movie.id} backdrop_path={Movie.backdrop_path} />

      <div className="flex flex-col md:flex-row p-6 py-8 gap-6 ">
        <div className="lg:w-4/5">
          <div className="flex">
            {/* Movie Poster */}
            <div className="hidden md:flex w-1/3">
              <Image
                src={`https://www.themoviedb.org/t/p/original/${Movie.poster_path}`}
                alt="movie poster"
                height={96}
                width={180}
                className="w-auto h-80"
                unoptimized
                loading="lazy"
              ></Image>
            </div>

            {/* Movie Details */}
            <div className="flex-col flex gap-2 md:w-2/3">
              <h1 className="font-bold text-xl md:text-2xl lg:text-4xl text-black dark:text-white">
                {Movie.title}
              </h1>
              <div className="flex gap-4">
                <span className="px-3 py-1 border-primary border-2 rounded-md text-primary text-black dark:text-white">
                  {Movie.spoken_languages.length > 0
                    ? Movie.spoken_languages[0].english_name
                    : ""}
                </span>
                <span className="px-3 py-1 border-primary border-2 rounded-md text-primary text-black dark:text-white">
                  {Movie.production_countries.length > 0
                    ? Movie.production_countries[0].iso_3166_1
                    : ""}
                </span>
                <span className="px-3 py-1 rounded-md bg-primary text-black dark:text-white items-center justify-center">
                  TMDB: {Movie.vote_average.toFixed(1)}
                </span>
              </div>
              <p className="text-justify text-black dark:text-white">{Movie.overview}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 justify-between">
                {subdetails.map((detail) => {
                  return (
                    <SubDetails
                      key={detail.title}
                      Title={detail.title}
                      Value={detail.detail}
                    ></SubDetails>
                  );
                })}
              </div>
            </div>
          </div>
          <hr className="mt-12" />
          <SimilarMovies movies={similarMovies}  className="text-black dark:text-white"/>
        </div>
        <div className=" w-1/5 hidden lg:flex">
          <VCardDiv customStyle={undefined} />
        </div>
      </div>
    </div>
  );
};

export default Watch;
