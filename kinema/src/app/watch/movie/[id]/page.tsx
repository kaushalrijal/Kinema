import React from "react";
import Image from "next/image";
import SubDetails from "../subdetails";
import WatchMovie from "./watch";
import { getMovieDetails, getSimilarMovies } from "@/utils/request";
import VCardDiv from "@/app/components/cardCollectionV";
import CardsFullDiv from "@/app/components/cardCollectionFull";
import { Recommend } from "@mui/icons-material";

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

  return (
    <div>
      <WatchMovie tmdb_id={Movie.id} backdrop_path={Movie.backdrop_path} />
      <div className="flex flex-col md:flex-row p-6 py-8 gap-6">
        <div className="hidden md:flex basis-1/4">
          <Image
            src={`https://www.themoviedb.org/t/p/original/${Movie.poster_path}`}
            alt="movie poster"
            height={96}
            width={180}
            className="w-auto h-80"
          ></Image>
        </div>

        <div className="flex-col flex basis-1/2 gap-2">
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

        <div className="basis-1/4 relative">
          <VCardDiv customStyle={undefined} />
        </div>
      </div>
      {/* <CardsFullDiv section={"Similar Movies"} action={getSimilarMovies} /> */}
      similar movies go here
    </div>
  );
};

export default Watch;
