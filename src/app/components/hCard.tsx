import { ButtonBase } from "@mui/material";
import Image from "next/image";
import React from "react";

const VCard = (props: {
  posterPath: any;
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
    <div
      className={`flex flex-nowrap m-2 min-h-[144px] max-h-48 w-auto min-w-[255px] max-w-[320px] relative content-end rounded-md p-0 gap-2 shadow-md  shadow-black group hover:bg-slate-300 cursor-pointer hover:scale-105 duration-75 delay-75 ease-in-out`}
    >
      <Image
        alt=""
        width={320}
        height={144}

        src={`https://www.themoviedb.org/t/p/original/${props.posterPath}`}
        className="absolute object-fit rounded-lg"
      />
      <div className=" p-2 z-10 h-fit self-end bg-gradient-to-t w-full rounded-lg pt-4 dark:from-black dark:to-black/5 from-white to-white/0 object-left-bottom">
        <div className="flex text-xs gap-2">
          <span className="bg-primary  text-white p-1 rounded-md">
            {props.year}
          </span>
          <span className="bg-primary text-white p-1 rounded-md">
            {props.movie}
          </span>
          <span className="bg-primary text-white p-1 rounded-full px-2">
            {props.ratings}
          </span>
        </div>
        <h1 className="font-bold text-lg text-black dark:text-white">{props.title}</h1>
      </div>
    </div>
  );
};

export default VCard;
