import React from "react";
import Image from "next/image";
import SubDetails from "../subdetails";
import WatchMovie from "./watch";
import { getMovieDetails, getSimilarMovies } from "@/utils/request";
import VCardDiv from "@/app/components/cardCollectionV";
import CardsFullDiv from "@/app/components/cardCollectionFull";
import { Recommend } from "@mui/icons-material";
import Warning from "@/app/components/warning";
import Link from "next/link";
import Card from "@/app/components/card";
import SimilarMovies from "./similar";

const Watch = async ({ params }: { params: { id: number } }) => {
  const tmdb_id = params.id;
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
    <div>
      <Warning message="Some movies are yet to be added and won't load. Please check back soon :)" />
      <WatchMovie tmdb_id={Movie.id} backdrop_path={Movie.backdrop_path} />
      <div className="w-full px-8 py-4 flex itmes-center justify-center">
        <p>
          If the current server doesn't work try using a different server...
          <div className="flex">Server Upcloud</div>
        </p>
      </div>
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
              <h1 className="font-bold text-xl md:text-2xl lg:text-4xl">
                {Movie.title}
              </h1>
              <div className="flex gap-4">
                <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
                  {Movie.spoken_languages.length > 0
                    ? Movie.spoken_languages[0].english_name
                    : ""}
                </span>
                <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
                  {Movie.production_countries.length > 0
                    ? Movie.production_countries[0].iso_3166_1
                    : ""}
                </span>
                <span className="px-3 py-1 rounded-md bg-primary text-white items-center justify-center">
                  TMDB: {Movie.vote_average.toFixed(1)}
                </span>
              </div>
              <p className="text-justify">{Movie.overview}</p>
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
          <SimilarMovies movies={similarMovies} />
        </div>
        <div className=" w-1/5 hidden lg:flex">
          <VCardDiv customStyle={undefined} />
        </div>
      </div>
    </div>
  );
};

export default Watch;
