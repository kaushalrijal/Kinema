"use client";

import React from "react";
import { useState } from "react";

const Warning = () => {
  const [visible, setVisible] = useState("visible");
  return (
    <div
      className={`flex items-center justify-between p-2 text-sm w-full text-white  bg-[#ff5555] ${visible}`}
    >
      <div className="" role="alert">
        <span className="font-medium">ATTENTION PLEASE!</span> This site is
        currently under development, so most features aren&apos;t working, check
        back soon :)
      </div>
      <div
        className={`text-white px-2 py-0.5 border-2 rounded-full border-white hover:bg-white hover:text-black cursor-pointer`}
        onClick={() => setVisible("hidden")}
      >
        X
      </div>
    </div>
  );
};

export default Warning;
