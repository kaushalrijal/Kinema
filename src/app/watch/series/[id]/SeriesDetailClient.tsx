"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/cards/card";
import { Play } from "lucide-react";
import PlayButton from "@/components/ui/PlayButton";
import { Show, Movie, SimilarResponse } from "@/types";

// Assuming you have a type definition for Series data, or use `any` for now
// import type { SeriesData } from "./types";

interface SeriesDetailClientProps {
  series: Show & { seasons?: { season_number: number; episode_count: number; id: number }[]; genres?: { name: string }[]; production_companies?: { name: string }[]; spoken_languages?: { english_name: string }[]; origin_country?: string[]; number_of_seasons?: number; number_of_episodes?: number; };
  similarSeries?: SimilarResponse; // Reverted type to expect SimilarResponse object
}

export default function SeriesDetailClient({
  series,
  similarSeries,
}: SeriesDetailClientProps) {

  const [selectedSeason, setSelectedSeason] = useState(
    series.seasons?.find((s) => s.season_number > 0)?.season_number || 1
  );
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedServer, setSelectedServer] = useState(1);
  const [playerVisible, setPlayerVisible] = useState(false);
  const isMounted = useRef(false);

  // Example servers - you may want to fetch these or manage differently
  const servers = [
    {
      name: "VidSrc",
      url: `https://vidsrc.to/embed/tv?tmdb=${series.id}&season=${selectedSeason}&episode=${selectedEpisode}`,
    },
    {
      name: "Superembed",
      url: `https://multiembed.mov/?video_id=${series.id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`,
    },
    {
      name: "SmashyStream",
      url: `https://embed.smashystream.com/playere.php?tmdb=${series.id}&season=${selectedSeason}&episode=${selectedEpisode}`,
    },
    // Add more servers as needed
  ];

  // Effect to update document title (optional, but good for UX)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    document.title = `Watch ${series.name} - S${selectedSeason}E${selectedEpisode} - Kinema`;
  }, [series, selectedSeason, selectedEpisode]);

  // Format genres and production companies
  const genres = series.genres?.map((genre) => genre.name).join(", ") || "N/A";
  const productionCompanies = series.production_companies?.map((producer) => producer.name).join(", ") || "N/A";

  // Filter out season 0 (specials) for typical season selection
  const displaySeasons = series.seasons?.filter((season) => season.season_number > 0) || [];

  return (
    <div className="container py-8 space-y-12 min-h-screen">
      {/* Player Area */}
      <section>
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
          {!playerVisible && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70">
              <PlayButton onClick={() => setPlayerVisible(true)} />
            </div>
          )}
          {playerVisible && (
            <iframe
              src={servers[selectedServer].url}
              allowFullScreen
              title={`${series.name} Season ${selectedSeason} Episode ${selectedEpisode}`}
              className="w-full h-full"
            />
          )}
        </div>
      </section>

      {/* Playback Controls (Season/Episode + Servers) */}
      <section>
        <div className="flex flex-col gap-6 sm:gap-8 items-center justify-center w-full text-center">
          {/* Server Selection */}
          <div className="flex flex-col items-center justify-center w-full sm:w-auto">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-darktext">Select Server</h3> {/* Changed to h3 and smaller margin */}
            <div className="flex flex-wrap gap-4">
              {servers.map((server, i) => (
                <button
                  key={server.name}
                  onClick={() => {
                    setSelectedServer(i);
                    setPlayerVisible(true); // Auto-play on server change
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedServer === i ? 'bg-lightprimary dark:bg-darkprimary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                >
                  {`Server ${i + 1}`}
                </button>
              ))}
            </div>
          </div>

          {/* Episode and Season Selection */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center">

            {/* Season Select */}
            <div>
              <label htmlFor="season-select" className="block text-sm font-medium mb-2 text-gray-900 dark:text-darktext">Season</label>
              <select
                id="season-select"
                value={selectedSeason}
                onChange={(e) => {
                  setSelectedSeason(Number(e.target.value));
                  setSelectedEpisode(1); // Reset episode to 1 when season changes
                  setPlayerVisible(false); // Hide player to show play button again
                }}
                className="block w-32 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-lightprimary dark:focus:ring-darkprimary focus:border-lightprimary dark:focus:border-darkprimary sm:text-sm"
              >
                {displaySeasons.map((season) => (
                  <option key={season.id} value={season.season_number}>
                    Season {season.season_number}
                  </option>
                ))}
              </select>
            </div>

            {/* Episode Select */}
            <div>
              <label htmlFor="episode-select" className="block text-sm font-medium mb-2 text-gray-900 dark:text-darktext">Episode</label>
              <select
                id="episode-select"
                value={selectedEpisode}
                onChange={(e) => {
                  setSelectedEpisode(Number(e.target.value));
                  setPlayerVisible(false); // Hide player to show play button again
                }}
                className="block w-32 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-lightprimary dark:focus:ring-darkprimary focus:border-lightprimary dark:focus:border-darkprimary sm:text-sm"
              >
                {/* Render options based on selected season's episode count */}
                {Array.from({ length: series.seasons?.find((s) => s.season_number === selectedSeason)?.episode_count || 0 }, (_, i) => i + 1).map(episodeNum => (
                  <option key={episodeNum} value={episodeNum}>
                    Episode {episodeNum}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Series Details */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1 hidden md:flex justify-center relative w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] mx-auto md:mx-0 aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
            alt={`${series.name} poster`}
            fill
            className="object-cover rounded-lg shadow-lg"
            priority
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-darktext">{series.name}</h1>
          
          <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            {series.first_air_date && (
               <span className="badge">{new Date(series.first_air_date).getFullYear()}</span>
            )}
            {series.number_of_seasons && (
               <span className="badge">{`${series.number_of_seasons} Seasons`}</span>
            )}
             {series.number_of_episodes && (
               <span className="badge">{`${series.number_of_episodes} Episodes`}</span>
            )}
            {series.vote_average && (
               <span className="badge">{`TMDB: ${series.vote_average.toFixed(1)}`}</span>
            )}
          </div>
          
          <p className="text-lg text-gray-900 dark:text-darktext leading-relaxed">{series.overview}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-900 dark:text-darktext">
             {genres && (
                <div>
                   <span className="font-semibold">Genres: </span>{genres}
                </div>
             )}
             {productionCompanies && (
                <div>
                   <span className="font-semibold">Production: </span>{productionCompanies}
                </div>
             )}
             {series.spoken_languages && series.spoken_languages.length > 0 && (
                 <div>
                   <span className="font-semibold">Language: </span>{series.spoken_languages[0]?.english_name}
                 </div>
             )}
             {series.origin_country && series.origin_country.length > 0 && (
                 <div>
                   <span className="font-semibold">Country: </span>{series.origin_country[0]}
                 </div>
             )}
          </div>
        </div>
      </section>

      {/* Similar Series */}
      {similarSeries?.results && similarSeries.results.length > 0 && (
         <section>
            <h2 className="section-title">You May Also Like</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
               {similarSeries.results.map((similarItem) => {
                const mediaType = 'media_type' in similarItem ? similarItem.media_type : 'tv'; // Assume 'tv' if media_type is missing
                const href = `/watch/${mediaType === 'movie' ? 'movie' : 'series'}/${similarItem.id}`;
                const title = 'title' in similarItem ? similarItem.title : similarItem.name;
                const date = 'release_date' in similarItem ? similarItem.release_date : similarItem.first_air_date;
                const year = date ? new Date(date).getFullYear() : "Year";
                const runtime = similarItem.vote_average ? similarItem.vote_average.toFixed(1) + " Rating" : "Rating";
                const cardTitle = title?.length > 24 ? title.slice(0, 24) + "…" : title;
                 
                return (
                  <Link href={href} key={similarItem.id}>
                     <Card
                        Img={similarItem.poster_path}
                        Type={mediaType === 'movie' ? 'Movie' : 'Series'}
                        Title={cardTitle}
                        Date={year}
                        RunTime={runtime}
                     />
                  </Link>
                );
              })}
            </div>
         </section>
      )}
    </div>
  );
} 