import {
  discoverMovies,
  getAddedMovies,
  getAddedSeries,
  getSeriesDetails,
} from "@/utils/request";
import CardsFullDiv from "../components/cardCollectionFull";
import React from "react";
import Card from "../components/card";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shows and Series - Kinema",
  description: "Newly added series on Kinema",
};

const Shows = async () => {
  const addedSeries = await getAddedSeries();

  return (
    <div className="p-4">
      <strong className="mx-3 font-extrabold font-serif text-3xl">
        Recently Added Series
      </strong>
      <div className="p-1 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {addedSeries.items.map(async (series) => {
          const data = await getSeriesDetails(series.tmdb_id);
          if (!data.name) return null;
          return (
            <Link href={`/watch/series/${series.tmdb_id}`} key={data.id}>
              <Card
                Img={data.poster_path}
                Type="Series"
                Title={
                  data.name!.length > 15
                    ? data.name!.slice(0, 15) + "..."
                    : data.name
                }
                Date={data.number_of_seasons + " SS"}
                RunTime={data.number_of_episodes + " Eps"}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Shows;
