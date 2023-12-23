"use client";

import React, { useState } from "react";
import Image from "next/image";
import SubDetails from "../subdetails";
import { getMovieDetails } from "@/utils/request";

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

const Watch = async ({ params }: { params: { id: number } }) => {
  const MovieDetails = await getMovieDetails();
  console.log(MovieDetails);
  const tmdb_id = params.id;
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <div className="w-full h-64 md:h-96 flex items-center justify-center bg-primary p-0 relative overflow-hidden">
        <Image
          src="/movieBackground.png"
          alt="cover"
          height={512}
          width={512}
          className="md:w-full h-full md:h-auto object-cover absolute z-0 top-0 left-0"
        ></Image>
        <iframe
          // src={`https://v2.vidsrc.me/embed/${tmdb_id}/color-1000B3`}
          src={`https://vidsrc.to/embed/movie/${tmdb_id}`}
          className={`w-full h-full content-strech z-50 ${
            visible ? "block" : "hidden"
          }`}
          allowFullScreen
        />
      </div>
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
        <div className="basis-1/4 relative">
          <Image
            src="/play.png"
            alt="play icon"
            width={64}
            height={64}
            className={`cursor-pointer z-10 hover:scale-125 absolute top-[-] lg:top-[-250px] lg:left-[-360px] duration-75 transition ease-in-out bg-white/75 border-2 m-0 border-primary rounded-full ${
              visible ? "hidden" : "block"
            }`}
            onClick={() => {
              setVisible(true);
            }}
          ></Image>
          <button
            className="bg-primary px-4 py-3 text-white object-cover w-full rounded-md"
            onClick={() => {
              setVisible(true);
            }}
          >
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Watch;
