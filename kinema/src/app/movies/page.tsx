import {
  discoverMovies,
  getAddedMovies,
  getMovieDetails,
} from "@/utils/request";
import CardsFullDiv from "../components/cardCollectionFull";
import React from "react";
import Card from "../components/card";
import Link from "next/link";

const Movie = async () => {
  const addedMovies = await getAddedMovies();
  return (
    <div className="p-4">
      <strong className="mx-3 font-extrabold font-serif text-3xl">
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
                Title={data.original_title}
                Date={data.release_date}
                RunTime={data.vote_average}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Movie;
