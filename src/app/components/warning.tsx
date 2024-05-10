"use client";

import { Close } from "@mui/icons-material";
import React from "react";
import { useState } from "react";

const Warning = (props) => {
  const [visible, setVisible] = useState("visible");
  return (
    <div
      className={`flex items-center justify-between p-2 text-sm w-full text-white  bg-[#901f1f] ${visible}`}
    >
      <div className="" role="alert">
        <span className="font-medium">ATTENTION PLEASE!</span> {props.message}
      </div>
      <div
        className={`text-white px-1 py-1 border-2 rounded-full border-white hover:bg-white hover:text-black cursor-pointer`}
        onClick={() => setVisible("hidden")}
      >
        <Close />
      </div>
    </div>
  );
};

export default Warning;
