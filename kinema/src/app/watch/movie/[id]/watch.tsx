"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

const WatchMovie = (props) => {
  const servers = [
    {
      name: "VidSrc1",
      url: `https://vidsrc.to/embed/movie/${props.tmdb_id}`,
    },
    {
      name: "VidSrc2",
      url: `https://v2.vidsrc.me/embed/${props.tmdb_id}/color-1000B3`,
    },
    {
      name: "Superembed",
      url: `https://multiembed.mov/?video_id=${props.tmdb_id}&tmdb=1`,
    },
    {
      name: "Smashystream",
      url: `https://embed.smashystream.com/playere.php?tmdb=${props.tmdb_id}`,
    },
  ];
  const [visible, setVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState(0);
  let serverUrl = servers[selectedServer].url;
  return (
    <>
      <div className="w-full h-64 md:h-[420px] flex items-center justify-center bg-primary p-0 relative overflow-hidden">
        <Image
          src={`https://www.themoviedb.org/t/p/original/${props.backdrop_path}`}
          alt="cover"
          height={512}
          width={512}
          className="w-full h-full md:h-auto object-cover absolute z-0 top-0 left-0"
          unoptimized
        ></Image>
        <iframe
          src={serverUrl}
          // src={`https://vidsrc.to/embed/movie/${props.tmdb_id}`}
          className={`w-full h-full content-strech z-50 ${
            visible ? "block" : "hidden"
          } absolute`}
          allowFullScreen
        />
        <Image
          src="/play.png"
          alt="play icon"
          width={64}
          height={64}
          className={`cursor-pointer z-10 hover:scale-125  duration-75 transition ease-in-out bg-white/75 border-2 m-0 border-primary rounded-full {
            visible ? "hidden" : "block"
          }`}
          onClick={() => {
            setVisible(true);
          }}
          unoptimized
        ></Image>
      </div>
      <div className="w-full px-8 py-4 flex items-center justify-center flex-col">
        <p>
          If the current server doesn't work try using a different server...
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full my-4">
          {servers.map((server, i) => {
            return (
              <div
                className={`flex flex-row items-center justify-center border-2 border-primary p-2 rounded-md gap-4 text-${
                  servers[selectedServer].name === server.name
                    ? "white"
                    : "primary"
                } bg-${
                  servers[selectedServer].name === server.name ? "primary" : ""
                } cursor-pointer`}
                key={server.url}
                onClick={() => setSelectedServer(i)}
              >
                <Play></Play>
                <div className="flex flex-row sm:flex-col fill-primary">
                  Server <span>{server.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WatchMovie;
