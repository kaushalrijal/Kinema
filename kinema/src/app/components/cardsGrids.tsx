import React from "react";
import CardsFullDiv from "./cardCollectionFull";
import { getTopRatedMovies, getTrendingMovies } from "@/utils/request";

const CardsGrid = () => {
  return (
    <div>
      <CardsFullDiv
        section="Top Rated Movies"
        action={getTopRatedMovies}
      ></CardsFullDiv>
      <CardsFullDiv
        section="Trending Movies"
        action={getTrendingMovies}
      ></CardsFullDiv>
      {/* <CardsFullDiv section="Shows" data={data}></CardsFullDiv> */}
    </div>
  );
};

export default CardsGrid;
