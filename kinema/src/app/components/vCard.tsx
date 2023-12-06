import { ButtonBase } from "@mui/material";
import Image from "next/image";
import React from "react";

const VCard = () => {
  return (
    <div className="flex flex-nowrap m-2 h-[140px] min-w-[220px] bg-slate-100 rounded-md p-2 gap-2 shadow-md shadow-black group">
      <div className="static group">
        <Image
          src="/brbad.jpg"
          width={104}
          height={120}
          alt="soe image"
          className="h-full w-auto rounded-md"
        ></Image>
      </div>
      <div className="flex flex-col py-3">
        <strong>Breaking Bad</strong>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <span>2025</span>
            <span className="border rounded-lg px-0.5 p-0.5 group-hover:bg-[#1000b3] group-hover:text-white">
              Series
            </span>
          </div>
          <span>5 Seasons</span>
          <button className="bg-[#1000b3] text-white rounded-lg m-1 p-1 text-sm transition delay-75 hover:scale-105 duration-75">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VCard;
