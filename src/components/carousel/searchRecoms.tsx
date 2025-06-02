import Link from "next/link";
import React from "react";

const Recomm = (props: { results: any[]; setSearch: (value: string) => void }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        {props.results.map((result) => {
          return (
            <Link
              href={`/watch/${
                result.media_type == "movie" ? "movie" : "series"
              }/${result.id}`}
              key={result.id}
              onClick={() => props.setSearch("")}
            >
              <div className="text-gray-900 dark:text-darktext py-2 px-4 rounded-sm text-xs w-full flex justify-between items-center">
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
