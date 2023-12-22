import React from "react";
import VCard from "./vCard";
import { getTrendingMovies } from "@/utils/request";

const VCardDiv = async (props: { customStyle: any }) => {
  const movies = await getTrendingMovies();
  return (
    <div className={`p-4 ${props.customStyle}`}>
      <span className="m-3 font-extrabold font-serif text-2xl">Trending</span>
      <div>
        {movies.map((movie) => {
          return (
            <VCard
              key={movie.id}
              title={
                movie.original_title.length > 15
                  ? movie.original_title.slice(0, 15) + "..."
                  : movie.original_title
              }
              year={movie.release_date.slice(0, 4)}
              movie={movie.media_type === "movie" ? "Movie" : "Series"}
              ratings={movie.vote_average}
              poster={movie.poster_path}
            ></VCard>
          );
        })}
      </div>
    </div>
  );
};

export default VCardDiv;
