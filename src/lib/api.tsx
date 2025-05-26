"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const ViewAPI = () => {
  const [movies, setMovies] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const query = await fetch("https://vidsrc.xyz/movies/latest/page-1.json");
      const response = await query.json();
      console.log("response from the API", response);
      setMovies(response.result);
    };
    getData();
  }, []);

  return (
    <div>
      <h3>howdy!!</h3>
      {movies &&
        movies.length &&
        movies.map((movie: any) => {
          const url = `https://movies-tv-shows-database.p.rapidapi.com/?movieid=tt1954470`;
          const options = {
            method: "GET",
            headers: {
              Type: "get-movies-images-by-imdb",
              "X-RapidAPI-Key":
                "252739274bmsheb338140961d5e9p1853f0jsne1fd1d2dba6e",
              "X-RapidAPI-Host": "movies-tv-shows-database.p.rapidapi.com",
            },
          };
          async function getImage() {
            try {
              const response = await fetch(url, options);
              const result = await response.json();
              console.log(result.poster);
              setImage(result);
            } catch (error) {
              console.log(error);
            }
          }

          // getImage();

          return (
            <>
              <h2>{movie.title}</h2>
              {/* <img src={image} width={64} height={196}></img> */}
            </>
          );
        })}
    </div>
  );
};

export default ViewAPI;
