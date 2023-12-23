// "use client";

import React from "react";
import Image from "next/image";
import SubDetails from "../subdetails";
import Details from "./movieDetails";
import { getMovieDetails } from "@/utils/request";

const Watch = async ({ params }: { params: { id: number } }) => {
  const tmdb_id = params.id;
  const Movie = await getMovieDetails(tmdb_id);
  const subdetails = [
    { title: "Year", detail: Movie.release_date.slice(0, 4) },
    {
      title: "Genre(s)",
      detail: Movie.genres.map((genre) => {
        return ` ` + genre.name;
      }),
    },
    { title: "Duration", detail: Movie.runtime + " min" },
    { title: "Country", detail: Movie.production_countries[0].name },
    {
      title: "Popularity",
      detail: Movie.popularity,
    },
    {
      title: "Production",
      detail: Movie.production_companies.map((producer) => {
        return producer.name;
      }),
    },
  ];

  // const [visible, setVisible] = useState(false);
  return (
    <div>
      <div className="w-full h-64 md:h-[420px] flex items-center justify-center bg-primary p-0 relative overflow-hidden">
        <Image
          src={`https://www.themoviedb.org/t/p/original/${Movie.backdrop_path}`}
          alt="cover"
          height={512}
          width={512}
          className="md:w-full h-full md:h-auto object-cover absolute z-0 top-0 left-0"
        ></Image>
        {/* <iframe
          // src={`https://v2.vidsrc.me/embed/${tmdb_id}/color-1000B3`}
          src={`https://vidsrc.to/embed/movie/${tmdb_id}`}
          className={`w-full h-full content-strech z-50 ${
            visible ? "block" : "hidden"
          }`}
          allowFullScreen
        /> */}
        <Image
          src="/play.png"
          alt="play icon"
          width={64}
          height={64}
          className={`cursor-pointer z-10 hover:scale-125  duration-75 transition ease-in-out bg-white/75 border-2 m-0 border-primary rounded-full {
            visible ? "hidden" : "block"
          }`}
          // onClick={() => {
          //   setVisible(true);
          // }}
        ></Image>
      </div>
      <div className="flex flex-col-reverse md:flex-row p-6 py-8 gap-6">
        <div className="hidden justify-center md:flex basis-1/4">
          <Image
            src={`https://www.themoviedb.org/t/p/original/${Movie.poster_path}`}
            alt="movie poster"
            height={128}
            width={240}
            className="object-contain"
          ></Image>
        </div>

        <div className="flex-col flex basis-1/2 gap-2">
          <h1 className="font-bold text-xl md:text-2xl lg:text-4xl">
            {Movie.title}
          </h1>
          <div className="flex gap-4">
            <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
              {Movie.spoken_languages[0].english_name}
            </span>
            <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
              R
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
          <button
            className="bg-primary px-4 py-3 text-white object-cover w-full rounded-md"
            // onClick={() => {
            //   setVisible(true);
            // }}
          >
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Watch;
