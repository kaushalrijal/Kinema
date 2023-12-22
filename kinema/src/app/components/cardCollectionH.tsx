import {
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import HCard from "./hCard";
import { getTrendingMovies } from "@/utils/request";

const HCardDiv = async () => {
  const movies = await getTrendingMovies();
  return (
    <div className="m-4 pr-15 md:flex flex-col">
      <span className="m-3 font-extrabold font-serif text-3xl">Trending</span>
      <div className="h-fit w-full overflow-x-scroll no-scrollbar flex pr-6">
        {movies.map((movie) => {
          return (
            <HCard
              key={movie.id}
              title={
                movie.original_title!.length > 15
                  ? movie.original_title!.slice(0, 15) + "..."
                  : movie.original_title
              }
              year={movie.release_date.slice(0, 4)}
              movie={movie.media_type === "movie" ? "Movie" : "Series"}
              ratings={movie.vote_average}
              posterPath={movie.backdrop_path}
            ></HCard>
          );
        })}
      </div>
    </div>
  );
};

export default HCardDiv;
