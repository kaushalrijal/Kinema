"use client";

import React, { useEffect, useState } from "react";
import Card from "./card";
import VCard from "./vCard";

const HCardDiv = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const query = await fetch("https://vidsrc.xyz/movies/latest/page-1.json");
      const response = await query.json();
      setData(response);
    };
    getData();
  }, []);

  return (
    <div className="m-4 pr-15 hidden md:flex flex-col">
      <span className="m-3 font-extrabold font-serif text-3xl">Trending</span>
      <div className="h-fit w-full overflow-x-scroll no-scrollbar flex pr-6">
        <VCard></VCard>
        <VCard></VCard>
        <VCard></VCard>
        <VCard></VCard>
        <VCard></VCard>
        <VCard></VCard>
        <VCard></VCard>
        <VCard></VCard>
        <VCard></VCard>
        <VCard></VCard>
        <VCard></VCard>
        <VCard></VCard>
      </div>
    </div>
  );
};

export default HCardDiv;
