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
      <div className="bg-slate-100 md:h-md md:w-56 rounded-md m-2 p-1.5 flex shadow-md flex-col flex-initial gap-1 shadow-black group text-black transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-150">
        <div className="overflow-hidden max-w-80 relative">
          {/* <div className="hidden absolute max-h-[250px] md:max-h-[318px] max-w-[212px] h-full w-full mx-0 bg-white/70 items-center justify-center group-hover:flex rounded-md">
          <PlayCircleFilledIcon
            sx={{ color: [`#1000b3`] }}
            className="w-[48px] h-[48px]"
          ></PlayCircleFilledIcon>
        </div> */}
          <Image
            src="/overlay.png"
            width={196}
            height={196}
            className="w-80 rounded-md absolute hidden group-hover:flex"
            alt="overlay laba"
          ></Image>

          <Image
            src={props.Img}
            alt="labalaba"
            width={196}
            height={196}
            className="w-80 rounded-md flex"
          ></Image>
        </div>
        <span className="border p-0.5 rounded-md group-hover:bg-[#1000b3] group-hover:text-teal-100 w-fit">
          {props.Type}
        </span>
        <strong className="group-hover:text-[#1000b3]">{props.Title}</strong>
        <div className="flex justify-between">
          <span key="date">{props.Date}</span>
          <span key="runtime">{props.RunTime}</span>
        </div>
      </div>
    </>
  );
};

export default Card;
