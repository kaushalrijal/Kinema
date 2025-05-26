import React from "react";
import { getSeriesDetails, getSimilarSeries } from "@/utils/request";

import { Metadata } from "next";
import Link from "next/link";
import SeriesDetailClient from "./SeriesDetailClient";

// List of unavailable series (consider moving this to a config or env var)
const UNAVAILABLE_SERIES: number[] = [/* add unavailable series IDs here if any */];

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Check if series is unavailable first
  if (UNAVAILABLE_SERIES.includes(Number(params.id))) {
    return {
      title: "Content Not Available - Kinema",
      description: "This content is currently not available on Kinema",
    };
  }

  const series = await getSeriesDetails(Number(params.id));
  const { name, first_air_date } = series;
  const year = first_air_date ? new Date(first_air_date).getFullYear() : "";
  const pageTitle = `Watch ${name} (${year}) - Kinema`;
  const pageDescription = `${name} series stream, ${name} online series download, watch ${name} online, ${name} watch online, ${name} free download, ${name} online streaming, kinema, kinematv, kinema tv, kinema hd, kinematv hd, watch ${name} show online`;

  const openGraph = {
    type: "website",
    url: `https://kinematv.vercel.app/watch/series/${params.id}`,
    images: [
      {
        url: series.backdrop_path ? `https://image.tmdb.org/t/p/original/${series.backdrop_path}` : series.poster_path ? `https://image.tmdb.org/t/p/original/${series.poster_path}` : '',
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

export default async function WatchSeriesPage({ params }: { params: { id: string } }) {
  const tmdb_id = Number(params.id);

  // Check if series is unavailable
  if (UNAVAILABLE_SERIES.includes(tmdb_id)) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-darkbg text-gray-900 dark:text-darktext">
        <div className="text-center p-8 max-w-lg mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Content Not Available</h1>
          <p className="text-lg">We apologize, but this content is currently not available on our platform.</p>
          <Link href="/" className="text-lightprimary dark:text-darkprimary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Fetch series details and similar series in parallel
  const [series, similarSeries] = await Promise.all([
    getSeriesDetails(tmdb_id),
    getSimilarSeries(tmdb_id)
  ]);

  if (!series) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-darkbg text-gray-900 dark:text-darktext">
        <div className="text-center p-8 max-w-lg mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Error loading series details</h1>
          <p className="text-lg">Could not fetch series details. Please try again later.</p>
           <Link href="/" className="text-lightprimary dark:text-darkprimary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Render the client component with fetched data
  return <SeriesDetailClient series={series} similarSeries={similarSeries} />;
}
