import { ButtonBase } from "@mui/material";
import Image from "next/image";
import React from "react";

const VCard = (props: {
  poster: any;
  title:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
  year:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
  movie:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
  ratings:
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
  return (
    <div className="flex flex-nowrap m-2 max-h-36 w-auto max-w-[320px] items-center bg-lightbg dark:bg-darkbg rounded-md p-2 gap-2 shadow-md shadow-black group hover:bg-slate-300 cursor-pointer hover:scale-105 duration-75 delay-75 ease-in-out">
      <div className="static group">
        <Image
          src={`http://image.tmdb.org/t/p/w500/${props.poster}`}
          width={104}
          height={120}
          alt="Poster"
          className="max-h-28 w-auto rounded-md min-w-80"
          unoptimized
        ></Image>
      </div>
      <div>
        <h1 className="font-bold text-black dark:text-white">{props.title}</h1>
        <div className="flex py-3 text-sm gap-2">
          <span className="bg-primary ext-black dark:text-white p-1 rounded-md">
            {props.year}
          </span>
          <span className="bg-primary ext-black dark:text-white p-1 rounded-md">
            {props.movie}
          </span>
          <span className="bg-primary ext-black dark:text-white p-1 rounded-md">
            {props.ratings}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VCard;
