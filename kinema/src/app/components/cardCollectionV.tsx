import React from "react";
import VCard from "./vCard";
import { getTrendingSeries } from "@/utils/request";
import Link from "next/link";

const VCardDiv = async (props: { customStyle: any }) => {
  const series = await getTrendingSeries();
  return (
    <div className={` ${props.customStyle}`}>
      <span className="m-3 font-extrabold font-serif text-2xl">
        Trending Series
      </span>
      <div>
        {series.map((tv) => {
          return (
            <Link key={tv.id} href={`/watch/series/${tv.id}`}>
              <VCard
                key={tv.id}
                title={
                  tv.name.length > 15 ? tv.name.slice(0, 15) + "..." : tv.name
                }
                year={tv.first_air_date.slice(0, 4)}
                movie="Series"
                ratings={tv.vote_average.toFixed(1)}
                poster={tv.poster_path}
              ></VCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VCardDiv;
