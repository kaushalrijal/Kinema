import React from "react";
import CardsFullDiv from "./cardCollectionFull";
import { getTopRatedMovies, getTopRatedSeries } from "@/utils/request";

const CardsGrid = () => {
  return (
    <div>
      <CardsFullDiv
        section="Top Rated Movies"
        action={getTopRatedMovies}
      ></CardsFullDiv>
      <CardsFullDiv
        section="Top Rated Series"
        action={getTopRatedSeries}
      ></CardsFullDiv>
      {/* <CardsFullDiv section="Shows" data={data}></CardsFullDiv> */}
    </div>
  );
};

export default CardsGrid;
