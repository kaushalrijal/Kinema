"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SubDetails from "../../movie/subdetails";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { getSeriesDetails } from "@/utils/request";
import { error } from "console";

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
  const [movie, setMovie] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(new Set(["1"]));
  const [episode, setEpisode] = useState(1);

  const selectedValue = React.useMemo(
    () => Array.from(selectedSeason).join(", ").replaceAll("_", " "),
    [selectedSeason]
  );

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getSeriesDetails(params.id)
      .then((result) => {
        const data = result;
        setMovie(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!movie) return <div>Loading...</div>;

  const productions = String(
    movie.production_companies.map((producer) => {
      return ` ${producer.name}`;
    })
  );

  return (
    <div>
      <div className="w-full h-60 md:h-96 flex items-center justify-center bg-primary p-0 relative overflow-hidden">
        <Image
          src="https://www.themoviedb.org/t/p/original/vFxjuhENDjEKzWXUGKmRFct15bA.jpg"
          alt="cover"
          height={512}
          width={512}
          className="md:w-full h-full md:h-auto object-cover absolute z-0 top-0 left-0"
        ></Image>
        <iframe
          src={`https://vidsrc.xyz/embed/tv?tmdb=${params.id}&season${selectedSeason}&episode=${episode}`}
          className={`w-full h-full z-50 ${visible ? "block" : "hidden"}`}
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
        <div className="hidden md:flex basis-1/4">
          <Image
            src="https://www.themoviedb.org/t/p/original/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg"
            alt="movie poster"
            height={80}
            width={80}
            className="h-full w-auto"
          ></Image>
        </div>
        <div className="flex-col flex basis-1/2 gap-2">
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
              Title="Genre(s)"
              Value={movie.genres.map((genre) => {
                return genre.name + " ";
              })}
            ></SubDetails>
            <SubDetails
              Title="Last Aired"
              Value={movie.last_episode_to_air.air_date}
            ></SubDetails>
            <SubDetails
              Title="Seasons"
              Value={movie.number_of_seasons}
            ></SubDetails>
            <SubDetails
              Title="Created by"
              Value={"movie.created_by[0].name ? movie.created_by[0].name : "}
            ></SubDetails>
            <SubDetails
              Title="Production"
              Value={productions.slice(0, productions.length - 2)}
            ></SubDetails>
          </div>
        </div>
        <div className="basis-1/4 flex items-center flex-col bg-secondary p-4">
          <div className="bg-primary flex items-center text-white p-2 rounded-lg">
            <Dropdown content="border-2 border-black">
              <DropdownTrigger>
                <Button variant="solid" className="capitalize" color="primary">
                  Season {selectedSeason}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="solid"
                color="primary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedSeason}
                onSelectionChange={setSelectedSeason}
                itemClasses={{
                  base: [
                    "rounded-sm",
                    "text-default-500",
                    "transition-opacity",
                    "bg-secondary",
                    "border-2 border-black",
                    "data-[hover=true]:text-white",
                    "data-[hover=true]:bg-primary",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
              >
                <DropdownItem key="1">Season 1</DropdownItem>
                <DropdownItem key="2">Season 2</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <TriangleDownIcon />
          </div>
          <div className="flex flex-col w-64 mx-4 my-1 bg-secondary">
            <div className="border-2 border-secondary p-2 rounded-sm">
              Episode 1: Pilot
            </div>
            <div className="border-2 border-secondary p-2 rounded-sm bg-primary border-none text-white">
              Episode 1: Pilot
            </div>
            <div className="border-2 border-secondary p-2 rounded-sm">
              Episode 1: Pilot
            </div>
            <div className="border-2 border-secondary p-2 rounded-sm">
              Episode 1: Pilot
            </div>
            <div className="border-2 border-secondary p-2 rounded-sm">
              Episode 1: Pilot
            </div>
            <div className="border-2 border-secondary p-2 rounded-sm">
              Episode 1: Pilot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Series;
