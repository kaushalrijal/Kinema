import React from "react";
import SubDetails from "../subdetails";
import { getMovieDetails } from "@/utils/request";

const subdetails = [
  { title: "Year", detail: "1994-09-23" },
  { title: "Genre", detail: "Drama, Crime" },
  { title: "Duration", detail: "142 min" },
  { title: "Country", detail: "USA" },
  {
    title: "Casts",
    detail:
      "James Whitmore, William Sadler, David Proval, Rohan Thomas, Sergio Kato",
  },
  { title: "Production", detail: "Warner Bros. Pictures" },
];

const Details = async (props) => {
  const Movie = await getMovieDetails(props.id);
  console.log(Movie);

  return (
    <div className="flex-col flex basis-1/2 gap-2">
      <h1 className="font-bold text-xl md:text-2xl lg:text-4xl">
        {Movie.title}
      </h1>
      <div className="flex gap-4">
        <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
          HD
        </span>
        <span className="px-3 py-1 border-primary border-2 rounded-md text-primary">
          R
        </span>
        <span className="px-3 py-1 rounded-md bg-primary text-white items-center justify-center">
          IMDB: 9.3
        </span>
      </div>
      <p className="text-justify">
        Framed in the 1940s for the double murder of his wife and her lover,
        upstanding banker Andy Dufresne begins a new life at the Shawshank
        prison, where he puts his accounting skills to work for an amoral
        warden. During his long stretch in prison, Dufresne comes to be admired
        by the other inmates -- including an older prisoner named Red -- for his
        integrity and unquenchable sense of hope.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between">
        {subdetails.map((detail) => {
          return (
            <SubDetails
              key={detail.title}
              Title={detail.title}
              Value={detail.detail}
            ></SubDetails>
          );
        })}
      </div>
    </div>
  );
};

export default Details;
