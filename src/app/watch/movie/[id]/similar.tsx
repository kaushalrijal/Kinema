import Card from "@/components/ui/cards/card";
import Link from "next/link";
import React from "react";

const SimilarMovies = (props) => {
  return (
    <div className="mt-8">
      <span className="text-4xl font-bold text-black dark:text-white">You may also like</span>
      <div className="grid grid-cols-2 md:grid-3 lg:grid-cols-3 xl:grid-cols-4">
        {props.movies.length === 0
          ? "OOPS no suggestions."
          : props.movies.map((movie) => {
              return (
                <Link href={`/watch/movie/${movie.id}`} key={movie.id}>
                  <Card
                    Img={movie.poster_path}
                    Type="Movie"
                    Title={
                      movie.title
                        ? movie.title.length > 16
                          ? movie.title.slice(0, 16) + "..."
                          : movie.title
                        : "Title"
                    }
                    Date={
                      movie.release_date
                        ? movie.release_date.slice(0, 4)
                        : "Year"
                    }
                    RunTime={
                      movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "Rating"
                    }
                  />
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default SimilarMovies;
