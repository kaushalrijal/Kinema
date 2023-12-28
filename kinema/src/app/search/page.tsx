import React from "react";
import Card from "../components/card";
import { getMovies } from "@/utils/request";
import Link from "next/link";

const Search = async ({ searchParams }) => {
  const searchText = searchParams.query;
  const data = await getMovies(searchText);
  return (
    <div className="p-6">
      <p className="text-2xl m-2">
        Search Results for &apos;{searchText}&apos;
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {data.map((movie) => {
          return (
            <Link href={`/watch/movie/${movie.id}`} key={movie.id}>
              <Card
                Img={movie.poster_path}
                Type={"MOVIE"}
                Title={
                  movie.title.length > 15
                    ? movie.title.slice(0, 15)
                    : movie.title
                }
                Date={movie.release_date.slice(0, 4)}
                RunTime={movie.vote_average.toFixed(1)}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
