import React from "react";
import VCard from "./vCard";

const VCardDiv = (props) => {
  return (
    <div className={`p-4 ${props.customStyle}`}>
      <span className="m-3 font-extrabold font-serif text-2xl">
        Recently Added
      </span>
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
  );
};

export default VCardDiv;
