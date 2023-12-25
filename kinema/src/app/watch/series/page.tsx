"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SubDetails from "../movie/subdetails";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { TriangleDownIcon } from "@radix-ui/react-icons";

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

const data = [
  {
    key: "1",
    title: "Oppenheimer",
    year: "2023",
    type: "Movie",
    runtime: "181m",
    img: "/posters/oppenheimer.jpg",
  },
  {
    key: "2",
    title: "Tenet",
    year: "2020",
    type: "Movie",
    runtime: "150m",
    img: "/posters/tenet.jpg",
  },
  {
    key: "3",
    title: "Dunkirk",
    year: "2017",
    type: "Movie",
    runtime: "107m",
    img: "/posters/dunkirk.jpg",
  },
  {
    key: "4",
    title: "Interstellar",
    year: "2014",
    type: "Movie",
    runtime: "169m",
    img: "/posters/interstellar.jpg",
  },
  {
    key: "5",
    title: "The Dark Knight Rises",
    year: "2012",
    type: "Movie",
    runtime: "165m",
    img: "/posters/darkknightrises.jpg",
  },
  {
    key: "6",
    title: "Inception",
    year: "2010",
    type: "Movie",
    runtime: "148m",
    img: "/posters/inception.jpg",
  },
  {
    key: "7",
    title: "The Dark Knight",
    year: "2008",
    type: "Movie",
    runtime: "152m",
    img: "/posters/darkknight.jpg",
  },
  {
    key: "8",
    title: "Batman Begins",
    year: "2005",
    type: "Movie",
    runtime: "140m",
    img: "/posters/batmanbegins.jpg",
  },
];

const Series = () => {
  const [selectedSeason, setSelectedSeason] = useState(new Set(["1"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedSeason).join(", ").replaceAll("_", " "),
    [selectedSeason]
  );

  const [visible, setVisible] = useState(false);
  useEffect(() => {}, []);
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
          src="https://vidsrc.to/embed/movie/tt0111161"
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
            width={60}
            className="h-full w-auto"
          ></Image>
        </div>
        <div className="flex-col flex basis-1/2 gap-2">
          <h1 className="font-bold text-xl md:text-2xl lg:text-4xl">
            Breaking Bad
          </h1>
          <div className="flex gap-4">
            <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
              HD
            </span>
            <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
              R
            </span>
            <span className="px-3 py-1 rounded-md bg-primary text-white items-center justify-center">
              IMDB: 9.3
            </span>
          </div>
          <p className="text-justify">
            When Walter White, a New Mexico chemistry teacher, is diagnosed with
            Stage III cancer and given a prognosis of only two years left to
            live. He becomes filled with a sense of fearlessness and an
            unrelenting desire to secure his family's financial future at any
            cost as he enters the dangerous world of drugs and crime.
          </p>
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
