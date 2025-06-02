"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import PlayButton from "@/components/ui/PlayButton";

interface MoviePlayerClientProps {
  tmdbId: number;
  backdropPath?: string;
}

export default function MoviePlayerClient({
  tmdbId,
  backdropPath,
}: MoviePlayerClientProps) {
  const servers = [
    {
      name: "VidSrc",
      url: `https://vidsrc.to/embed/movie/${tmdbId}`,
    },
    {
      name: "Superembed",
      url: `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`,
    },
    {
      name: "SmashyStream",
      url: `https://embed.smashystream.com/playere.php?tmdb=${tmdbId}`,
    },
    // Add more servers as needed
  ];

  const [playerVisible, setPlayerVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState(0);
  const serverUrl = servers[selectedServer].url;

  return (
    <div className="space-y-6">
      {/* Player Area */}
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
        {!playerVisible && backdropPath && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70">
            <Image
              src={`https://image.tmdb.org/t/p/original/${backdropPath}`}
              alt="Movie backdrop"
              fill
              className="object-cover opacity-50"
              unoptimized
            />
             <PlayButton onClick={() => setPlayerVisible(true)} />
          </div>
        )}

        {playerVisible && (
           <iframe
            src={serverUrl}
            allowFullScreen
            title="Movie Player"
            className="w-full h-full"
          ></iframe>
        )}
         {!playerVisible && !backdropPath && (
             <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70 text-white text-xl">
                No backdrop image available.
             </div>
         )}
      </div>

      {/* Server Selection */}
      <div className="w-full flex flex-col items-center justify-center pt-4 space-y-4">
        <p className="text-sm text-gray-900 dark:text-darktext">
          If the current server doesn't work, try using a different server...
        </p>
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
    </div>
  );
} 