"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SubDetails from "../../movie/subdetails";

import { TriangleDownIcon } from "@radix-ui/react-icons";
import {
  getEpisodes,
  getSeriesDetails,
  getSimilarMovies,
} from "@/utils/request";
import ShowData from "./types";
import { error } from "console";
import Dropdown from "./dropdown";
import {
  ArrowBigRightDash,
  ArrowRight,
  ArrowRightCircleIcon,
} from "lucide-react";
import { maxHeaderSize } from "http";
import Warning from "@/app/components/warning";
import Card from "@/app/components/card";
import Link from "next/link";

const subdetails = [
  { title: "Released", detail: "2008-01-20" },
  { title: "Genre", detail: "Drama, Crime" },
  { title: "Duration", detail: "142 min" },
  { title: "Country", detail: "USA" },
  {
    title: "Casts",
    detail:
      "James Whitmore, William Sadler, David Proval, Rohan Thomas, Sergio Kato",
  },
  { title: "Production", detail: "Warner Bros. Pictures" },
];

const Series = ({ params }) => {
  const [movie, setMovie] = useState<ShowData | null>(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  const [episodesData, setEpisodesData] = useState(null);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getSeriesDetails(params.id).then((result) => {
      const data = result;
      setMovie(data);
    });
  }, []);

  if (!movie) {
    return <div>Loading...</div>;
  } else {
    const productions = String(
      movie.production_companies.map((producer) => {
        return ` ${producer.name}`;
      })
    );
    let seasons = movie.seasons.filter((season) => season.season_number !== 0);
    return (
      <div>
        <Warning message="Some TV/Web shows are yet to be added and won't load right now. Check back soon :)" />
        <div className="w-full h-60 md:h-96 flex items-center justify-center bg-primary p-0 relative overflow-hidden">
          <Image
            src={`https://www.themoviedb.org/t/p/original/${movie.backdrop_path}`}
            alt="cover"
            height={512}
            width={512}
            className="md:w-full h-full md:h-auto object-cover absolute z-0 top-0 left-0"
          ></Image>
          <iframe
            src={`https://vidsrc.xyz/embed/tv/${params.id}/${selectedSeason}-${episode}`}
            // src={`https://vidsrc.me/embed/tv?tmdb=${params.id}&season=${selectedValue}&episode=${episode}`}
            className={`w-full h-full z-50 object-contain ${
              visible ? "block" : "hidden"
            }`}
            allow="fullscreen"
          />
          <Image
            src="/play.png"
            alt="play icon"
            width={64}
            height={64}
            className={`cursor-pointer z-10 hover:scale-125 duration-75 transition ease-in-out bg-white/75 border-2 m-0 border-primary rounded-full ${
              visible ? "hidden" : "block"
            }`}
            onClick={() => {
              setVisible(true);
            }}
          ></Image>
        </div>
        <div className="flex flex-col-reverse md:flex-row p-6 py-8 gap-6">
          <div className="hidden md:flex basis-1/4 w-1/4">
            <Image
              src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
              alt="movie poster"
              height={96}
              width={180}
              className="w-auto lg:h-80 md:h-56 xl:h-96"
            ></Image>
          </div>
          <div className="flex-col flex basis-1/2 gap-2 w-1/2">
            <h1 className="font-bold text-xl md:text-2xl lg:text-4xl">
              {movie.name}
            </h1>
            <div className="flex gap-4">
              <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
                {movie.original_language.toUpperCase()}
              </span>
              <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
                {movie.origin_country[0]}
              </span>
              <span className="px-3 py-1 rounded-md bg-primary text-white items-center justify-center">
                TMDB: {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <p className="text-justify">{movie.overview}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between">
              <SubDetails
                Title="Released"
                Value={movie.first_air_date}
              ></SubDetails>
              <SubDetails
                Title="Last Aired"
                Value={
                  movie.last_episode_to_air
                    ? movie.last_episode_to_air.air_date
                    : ""
                }
              ></SubDetails>
              <SubDetails
                Title="Seasons"
                Value={
                  movie.number_of_seasons != undefined
                    ? movie.number_of_seasons
                    : ""
                }
              ></SubDetails>
              <SubDetails
                Title="Episodes"
                Value={
                  movie.number_of_episodes != undefined
                    ? movie.number_of_episodes
                    : ""
                }
              ></SubDetails>
              <SubDetails
                Title="Genre(s)"
                Value={movie.genres.map((genre) => {
                  return genre.name + " ";
                })}
              ></SubDetails>
              <SubDetails
                Title="Production"
                Value={productions.slice(0, productions.length - 2)}
              ></SubDetails>
            </div>
          </div>
          <div className="lg:w-1/3 justify-center">
            {/* dropdown */}
            <Dropdown
              seasons={seasons}
              selectedSeason={selectedSeason}
              setSelectedSeason={setSelectedSeason}
            />
            <div>
              {selectedSeason && seasons[selectedSeason - 1] && (
                <ul className="my-4">
                  {Array.from(
                    { length: seasons[selectedSeason - 1].episode_count },
                    (_, index) => (
                      <li
                        key={index}
                        className={`p-2 text-sm md:text-xs rounded-md cursor-pointer ${
                          episode === index + 1
                            ? "bg-primary text-white"
                            : "bg secondary text-black"
                        }`}
                        onClick={() => {
                          setEpisode(index + 1);
                          setVisible(true);
                        }}
                      >{`Episode ${index + 1}`}</li>
                    )
                  )}
                </ul>
              )}
              <button
                className="flex bg-secondary my-4 text-black w-full justify-center p-2"
                onClick={() => {
                  setVisible(true);
                  setSelectedSeason(
                    movie.last_episode_to_air
                      ? movie.last_episode_to_air.season_number
                      : 1
                  );
                  setEpisode(
                    movie.last_episode_to_air
                      ? movie.last_episode_to_air.episode_number
                      : 1
                  );
                }}
              >
                Watch last episode <ArrowRightCircleIcon className="p-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Series;
