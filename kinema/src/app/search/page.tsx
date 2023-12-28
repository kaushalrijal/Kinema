import React from "react";
import Card from "../components/card";
import { getMovies } from "@/utils/request";
import Link from "next/link";

const Search = async ({ searchParams }) => {
  const searchText = searchParams.query;
  const data = await getMovies(searchText);
  console.log(data);
  return (
    <div className="p-6">
      Search Results for &apos;{searchText}&apos;
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-5">
        {data.map((movie) => {
          return (
            <Link href={`/watch/movie/${movie.id}`} key={movie.id}>
              <Card
                Img={movie.poster_path}
                Type={"MOVIE"}
                Title={movie.title}
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
