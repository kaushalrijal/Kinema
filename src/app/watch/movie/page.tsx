"use client";

import React, { useState } from "react";
import Image from "next/image";
import SubDetails from "./subdetails";

const subdetails = [
  { title: "Year", detail: "1994-09-23" },
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

const Movie = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="bg-lightbg dark:bg-darkbg">
      <div className="w-full h-60 md:h-96 flex items-center justify-center bg-lightprimary p-0 relative overflow-hidden">
        <Image
          src="/movieBackground.png"
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
      <div>Server</div>
      <div className="flex flex-col-reverse md:flex-row p-6 py-8 gap-6">
        <div className="hidden md:flex basis-1/4">
          <Image
            src="/poster.jpg"
            alt="movie poster"
            height={128}
            width={240}
            className="h-full w-auto"
          ></Image>
        </div>
        <div className="flex-col flex basis-1/2 gap-2">
          <h1 className="font-bold text-xl md:text-2xl lg:text-4xl">
            The Shawshank Redemption
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
            Framed in the 1940s for the double murder of his wife and her lover,
            upstanding banker Andy Dufresne begins a new life at the Shawshank
            prison, where he puts his accounting skills to work for an amoral
            warden. During his long stretch in prison, Dufresne comes to be
            admired by the other inmates -- including an older prisoner named
            Red -- for his integrity and unquenchable sense of hope.
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
        <div className="basis-1/4">
          <button
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors duration-200"
            onClick={() => {
              setVisible(true);
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
