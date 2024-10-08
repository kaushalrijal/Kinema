import {
  discoverMovies,
  getAddedMovies,
  getMovieDetails,
} from "@/utils/request";
import React from "react";
import Card from "../components/card";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies - Kinema",
  description: "Catch on the new releases and latest added movies on Kinema",
};

const Movie = async () => {
  const addedMovies = await getAddedMovies();
  return (
    <div className="p-4 bg-lightbg dark:bg-darkbg">
      <strong className="mx-3 font-extrabold font-serif text-3xl text-black dark:text-white">
        Recently Added Movies
      </strong>
      <div className="p-1 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {addedMovies.map(async (movie) => {
          const data = await getMovieDetails(movie.tmdb_id);
          return (
            <Link href={`/watch/movie/${movie.tmdb_id}`} key={data.id}>
              <Card
                Img={data.poster_path}
                Type="Movie"
                Title={
                  data.title
                    ? data.title.length > 16
                      ? data.title.slice(0, 16) + "..."
                      : data.title
                    : "Title"
                }
                Date={
                  data.release_date ? data.release_date.slice(0, 4) : "Year"
                }
                RunTime={
                  data.vote_average ? data.vote_average.toFixed(1) : "Rating"
                }
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Movie;
