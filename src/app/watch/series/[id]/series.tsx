"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SubDetails from "../../movie/subdetails";

import { TriangleDownIcon } from "@radix-ui/react-icons";
import {
  getSeriesDetails,
  getSimilarMovies,
  getSimilarSeries,
} from "@/utils/request";
import ShowData from "./types";
import { error } from "console";
import Dropdown from "./dropdown";
import {
  ArrowBigRightDash,
  ArrowRight,
  ArrowRightCircleIcon,
  Play,
} from "lucide-react";
import { maxHeaderSize } from "http";
import Warning from "@/app/components/warning";
import Card from "@/app/components/card";
import Link from "next/link";
import Recommendations from "./recommendations";

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

const Series = ({ props }) => {
  const [movie, setMovie] = useState<ShowData | null>(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  const [selectedServer, setSelectedServer] = useState(0);

  const [recoms, setRecoms] = useState(null);

  const servers = [
    {
      name: "VidSrc1",
      url: `https://vidsrc.to/embed/tv?tmdb=${props.id}&season=${selectedSeason}&episode=${episode}`,
    },
    {
      name: "VidSrc2",
      url: `https://vidsrc.xyz/embed/tv?tmdb=${props.id}&season=${selectedSeason}&episode=${episode}`,
    },
    {
      name: "Superembed",
      url: `https://multiembed.mov/directstream.php?video_id=${props.id}&tmdb=1&s=${selectedSeason}&e=${episode}`,
    },
    {
      name: "Smashystream",
      url: `https://embed.smashystream.com/playere.php?tmdb=${props.id}&season=${selectedSeason}&episode=${episode}`,
    },
  ];

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getSeriesDetails(props.id).then((result) => {
      const data = result;
      setMovie(data);
    });

    getSimilarSeries(props.id).then((result) => {
      const data = result;
      setRecoms(data);
    });
  }, []);

  useEffect(() => {
    if (movie) {
      document.title = `Watch ${movie.name} (${new Date(
        movie.first_air_date
      ).getFullYear()}) - Season: ${selectedSeason} Episode: ${episode} - Kinema`;
      const metaDescription = document.querySelector(
        "meta[name='description']"
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `${movie.name} series stream,${movie.name} season ${selectedSeason}, ${movie.name} episode {episode}, ${movie.name} season ${selectedSeason} episode ${episode}, ${movie.name} s${selectedSeason}e${episode}, ${movie.name} online series download, watch ${movie.name} online, ${movie.name} watch online, ${movie.name} free download, ${movie.name} online streaming, kinema, kinematv, kinema tv, kinema hd, kinematv hd, watch ${movie.name} show online`
        );
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = `${movie.name} series stream,${movie.name} season ${selectedSeason}, ${movie.name} episode ${episode}, ${movie.name} season ${selectedSeason} episode ${episode}, ${movie.name} s${selectedSeason}e${episode}, ${movie.name} online series download, watch ${movie.name} online, ${movie.name} watch online, ${movie.name} free download, ${movie.name} online streaming, kinema, kinematv, kinema tv, kinema hd, kinematv hd, watch ${movie.name} show online`;
        document.head.appendChild(meta);
      }

      const metaImage = document.querySelector("meta[property='og:image']");
      if (metaImage) {
        metaImage.setAttribute(
          "content",
          `https://www.themoviedb.org/t/p/original/${movie.poster_path}`
        );
      } else {
        const meta = document.createElement("meta");
        meta.name = "og:image";
        meta.content = `https://www.themoviedb.org/t/p/original/${movie.poster_path}`;
        document.head.appendChild(meta);
      }
    }
  }, [movie, selectedSeason, episode]);

  if (!movie) {
    return <div>Loading...</div>;
  } else if (!recoms) {
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
            unoptimized
          ></Image>
          <iframe
            src={servers[selectedServer].url}
            className={`w-full h-full z-40 object-contain ${
              visible ? "block" : "hidden"
            }`}
            allow="fullscreen"
            referrerPolicy="origin"
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
            unoptimized
          ></Image>
        </div>
        {/*A section to select servers */}
        <div className="w-full flex items-center justify-center flex-col pt-4 text-black dark:text-white">
          If the current server doesn't work, try using a different server...
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-6 gap-4 my-4 w-full">
            {servers.map((server, i) => {
              return (
                <div
                  className={`flex items-center justify-center border-2 p-2 rounded-md gap-4 border-primary text-${
                    selectedServer === i ? "white" : "primary"
                  } bg-${selectedServer === i ? "primary" : ""} cursor-pointer`}
                  key={server.url}
                  onClick={() => setSelectedServer(i)}
                >
                  <Play></Play>
                  <div className="flex flex-col text-black dark:text-white">
                    Server <span>{server.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row p-6 py-8 gap-6">
          <div className="hidden md:flex md:basis-1/4 w-1/4">
            <Image
              src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
              alt="movie poster"
              height={96}
              width={180}
              className="w-auto lg:h-80 md:h-56 xl:h-96"
              unoptimized
            ></Image>
          </div>
          <div className="flex-col flex md:basis-1/2 gap-2 md:w-1/2">
            <h1 className="font-bold text-xl md:text-2xl lg:text-4xl text-black dark:text-white">
              {movie.name}
            </h1>
            <div className="flex gap-4">
              <span className="px-3 py-1 border-primary border-2 rounded-md text-primary text-black dark:text-white">
                {movie.original_language.toUpperCase()}
              </span>
              <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
                {movie.origin_country[0]}
              </span>
              <span className="px-3 py-1 rounded-md bg-primary items-center justify-center text-black dark:text-white">
                TMDB: {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <p className="text-justify text-black dark:text-white">{movie.overview}</p>
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
          {/* Season selector */}
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
                className="flex bg-secondary my-4 text-black dark:text-white w-full justify-center p-2"
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
        <Recommendations data={recoms} />
      </div>
    );
  }
};

export default Series;
