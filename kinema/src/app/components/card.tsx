import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const Card = (props: {
  Img: string | StaticImport;
  Type:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
  Title:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
  Date:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
  RunTime:
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
    <>
      <div className="bg-secondary md:h-md md:w-56 rounded-md m-2 p-1.5 flex shadow-md flex-col flex-initial gap-1 shadow-black group text-black transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-150 cursor-pointer">
        <div className="overflow-hidden max-w-80 relative">
          <Image
            src="/overlay.png"
            width={196}
            height={196}
            className="w-80 rounded-md absolute hidden group-hover:flex"
            alt="overlay laba"
          ></Image>

          <Image
            src={`http://image.tmdb.org/t/p/w500/${props.Img}`}
            alt="labalaba"
            width={196}
            height={196}
            className="w-80 rounded-md flex"
          ></Image>
        </div>
        <span className="border p-0.5 rounded-md group-hover:bg-primary group-hover:text-teal-100 w-fit">
          {props.Type}
        </span>
        <strong className="group-hover:text-primary">{props.Title}</strong>
        <div className="flex justify-between">
          <span key="date" className="md:text-base text-xs">
            {props.Date}
          </span>
          <span key="runtime" className="md:text-base text-xs">
            {props.RunTime}
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
