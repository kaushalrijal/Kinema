"use client";

import { useEffect, useState } from "react";
import { getAddedSeries, getSeriesDetails } from "@/utils/request";
import Card from "@/components/ui/cards/card";
import Link from "next/link";
import SkeletonCard from "@/components/ui/cards/SkeletonCard";
import { Show } from "@/types";

export default function ShowsPage() {
  const [series, setSeries] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      const addedSeries = await getAddedSeries();
      // Fetch all details in parallel
      const details = await Promise.all(
        addedSeries.map((show: { tmdb_id: number }) => getSeriesDetails(show.tmdb_id))
      );
      setSeries(details.filter(data => data && data.id !== undefined));
      setLoading(false);
    };
    fetchSeries();
  }, []);

  return (
    <div className="container py-12 min-h-screen">
      <h1 className="section-title mb-10">Recently Added Series</h1>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {/* Render multiple skeleton cards while loading */}
          {Array.from({ length: 20 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {series.map((data) => (
            <Link href={`/watch/series/${data.id}`} key={data.id}>
              <Card
                Img={data.poster_path}
                Type="Series"
                Title={data.name?.length > 24 ? data.name.slice(0, 24) + "…" : data.name}
                Date={data.number_of_seasons ? `${data.number_of_seasons} SS` : "Seasons"}
                RunTime={data.number_of_episodes ? `${data.number_of_episodes} Eps` : "Episodes"}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
