import React from "react";
import Series from "./series";

import { Metadata } from "next";
import { getSeriesDetails } from "@/utils/request";

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const series = await getSeriesDetails(params.id);
  const { name, release_date } = series;
  const pageTitle = `Watch ${name} (${new Date(
    series.first_air_date
  ).getFullYear()}) Kinema`;
  const pageDescription = `${name} series stream, ${name} online series download, watch ${name} online, ${name} watch online, ${name} free download, ${name} online streaming, kinema, kinematv, kinema tv, kinema hd, kinematv hd, watch ${name} show online`;

  const openGraph = {
    type: "website",
    url: `https://kinematv.vercel.app/watch/movie/${params.id}`,
    images: [
      {
        url: `https://www.themoviedb.org/t/p/original/${series.poster_path}`,
        alt: `${series.name} backdrop`,
      },
    ],
  };

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph,
  };
}

const page = ({ params }) => {
  return (
    <div>
      <Series props={params} />
    </div>
  );
};

export default page;
