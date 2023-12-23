"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";

const WatchMovie = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-full h-64 md:h-[420px] flex items-center justify-center bg-primary p-0 relative overflow-hidden">
      <Image
        src={`https://www.themoviedb.org/t/p/original/${props.backdrop_path}`}
        alt="cover"
        height={512}
        width={512}
        className="md:w-full h-full md:h-auto object-cover absolute z-0 top-0 left-0"
      ></Image>
      <iframe
        // src={`https://v2.vidsrc.me/embed/${tmdb_id}/color-1000B3`}
        src={`https://vidsrc.to/embed/movie/${props.tmdb_id}`}
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
      ></Image>
    </div>
  );
};

export default WatchMovie;
