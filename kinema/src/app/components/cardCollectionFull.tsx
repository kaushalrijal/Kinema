import React from "react";
import Card from "./card";
import Link from "next/link";
import { getTrendingMovies } from "@/utils/request";

const CardsFullDiv = async (props: {
  [x: string]: any;
  section:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
}) => {
  const elements = await props.action();
  return (
    <div className="p-3 ">
      <span className="mx-3 font-extrabold font-serif text-3xl">
        {props.section}
      </span>
      <div
        className={`grid 2xl:grid-cols-8 lg:grid-cols-4 xs:grid-cols-1 md:grid-cols-3 grid-cols-2 gap-0`}
      >
        {elements.map((item) => (
          <Link key={item.id} href={`/watch/movie/` + item.id}>
            <Card
              Title={
                item.original_title!.length > 18
                  ? item.original_title!.slice(0, 18) + "..."
                  : item.original_title
              }
              Img={item.poster_path}
              Type={item.media_type === "series" ? "Series" : "Movie"}
              Date={item.release_date.slice(0, 4)}
              RunTime={item.vote_average.toFixed(1)}
              key={item.id}
            ></Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardsFullDiv;
