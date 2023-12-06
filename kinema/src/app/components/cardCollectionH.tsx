import React from "react";
import Card from "./card";
import VCard from "./vCard";

const HCardDiv = () => {
  return (
    <div className="m-4 pr-15">
      <span className="m-3 font-extrabold font-serif text-3xl">Trending</span>
      <div className="h-fit w-screen overflow-x-scroll no-scrollbar hidden md:flex pr-6">
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
