"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/app/components/card";
import { Play } from "lucide-react";

// Assuming you have a type definition for Series data, or use `any` for now
// import type { SeriesData } from "./types";

interface SeriesDetailClientProps {
  series: any; // Replace 'any' with actual type if available
  similarSeries?: any; // Replace 'any' with actual type if available
}

export default function SeriesDetailClient({
  series,
  similarSeries,
}: SeriesDetailClientProps) {
  const [selectedSeason, setSelectedSeason] = useState(series.seasons?.find((s: any) => s.season_number > 0)?.season_number || 1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedServer, setSelectedServer] = useState(0);
  const [playerVisible, setPlayerVisible] = useState(false);

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
    document.title = `Watch ${series.name} - S${selectedSeason}E${selectedEpisode} - Kinema`;
  }, [series, selectedSeason, selectedEpisode]);

  // Format genres and production companies
  const genres = series.genres?.map((genre: any) => genre.name).join(", ") || "N/A";
  const productionCompanies = series.production_companies?.map((producer: any) => producer.name).join(", ") || "N/A";

  // Filter out season 0 (specials) for typical season selection
  const displaySeasons = series.seasons?.filter((season: any) => season.season_number > 0) || [];

  return (
    <div className="container py-8 space-y-12 min-h-screen">
      {/* Player Area */}
      <section>
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
          {!playerVisible && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70">
              <button
                onClick={() => setPlayerVisible(true)}
                className="z-20 p-4 rounded-full bg-lightprimary dark:bg-darkprimary hover:bg-blue-700 dark:hover:bg-[#d97c13] transition-colors text-white"
              >
                <Play size={48} />
              </button>
            </div>
          )}
          <iframe
            src={playerVisible ? servers[selectedServer].url : ''}
            allowFullScreen
            title={`${series.name} Season ${selectedSeason} Episode ${selectedEpisode}`}
            className={`w-full h-full ${playerVisible ? 'block' : 'hidden'}`}
          ></iframe>
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
                {displaySeasons.map((season: any) => (
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
                {Array.from({ length: series.seasons?.find((s: any) => s.season_number === selectedSeason)?.episode_count || 0 }, (_, i) => i + 1).map(episodeNum => (
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
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-darktext">{series.name}</h1>
          
          <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{series.first_air_date ? new Date(series.first_air_date).getFullYear() : "Year"}</span>
            <span>•</span>
            <span>{series.number_of_seasons ? `${series.number_of_seasons} Seasons` : "N/A"}</span>
             <span>•</span>
            <span>{series.number_of_episodes ? `${series.number_of_episodes} Episodes` : "N/A"}</span>
             <span>•</span>
            <span>{series.vote_average ? `TMDB: ${series.vote_average.toFixed(1)}` : "Rating N/A"}</span>
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
             {series.spoken_languages?.length > 0 && (
                 <div>
                   <span className="font-semibold">Language: </span>{series.spoken_languages[0].english_name}
                 </div>
             )}
             {series.origin_country?.length > 0 && (
                 <div>
                   <span className="font-semibold">Country: </span>{series.origin_country[0]}
                 </div>
             )}
          </div>
        </div>
      </section>

      {/* Similar Series */}
      {similarSeries && similarSeries.results && similarSeries.results.length > 0 && (
         <section>
            <h2 className="section-title">More Like This</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
               {similarSeries.results.map((similarShow: any) => (
                  <Link href={`/watch/series/${similarShow.id}`} key={similarShow.id}>
                     <Card
                        Img={similarShow.poster_path}
                        Type="Series"
                        Title={similarShow.name?.length > 24 ? similarShow.name.slice(0, 24) + "…" : similarShow.name}
                        Date={similarShow.first_air_date ? new Date(similarShow.first_air_date).getFullYear() : "Year"}
                        RunTime={similarShow.vote_average ? similarShow.vote_average.toFixed(1) + " Rating" : "Rating"}
                     />
                  </Link>
               ))}
            </div>
         </section>
      )}
    </div>
  );
} 