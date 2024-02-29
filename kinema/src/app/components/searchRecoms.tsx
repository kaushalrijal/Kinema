import Link from "next/link";
import React from "react";

const Recomm = (props) => {
  console.log(props);
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        {props.results.map((result) => {
          return (
            <Link href={`/watch/movie/${result.id}`} key={result.id}>
              <div className="bg-secondary text-black p-1 rounded-sm  text-xs w-full flex justify-between items-center">
                <span>
                  {result.media_type == "movie" ? result.title : result.name}
                </span>
                <span>
                  {result.media_type == "movie"
                    ? result.release_date?.slice(0, 4)
                    : result.first_air_date?.slice(0, 4)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Recomm;
