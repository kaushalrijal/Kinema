

import HCard from "./hCard";
import { getTrendingMovies } from "@/utils/request";
import Link from "next/link";

const HCardDiv = async () => {
  const movies = await getTrendingMovies();
  return (
    <div className="m-4 pr-15 md:flex flex-col">
      <span className="m-3 font-extrabold font-serif text-3xl text-black dark:text-white">
        Popular Now
      </span>
      <div className="h-fit w-full overflow-x-scroll flex pr-6  ">
        {movies.map((movie) => {
          return (
            <Link key={movie.id} href={`watch/movie/${movie.id}`}>
              <HCard
                key={movie.id}
                title={
                  movie.original_title!.length > 15
                    ? movie.original_title!.slice(0, 15) + "..."
                    : movie.original_title
                }
                year={movie.release_date.slice(0, 4)}
                movie={movie.media_type === "movie" ? "Movie" : "Series"}
                ratings={movie.vote_average.toFixed(1)}
                posterPath={movie.backdrop_path}
              ></HCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HCardDiv;
