"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/cards/card";
import Example from "./dropdown";
import { SearchResult } from "@/types";
import Image from "next/image";
import { Play } from "lucide-react";

interface SearchPageProps {
  movies: SearchResult[];
  series: SearchResult[];
  searchQuery: string;
}

export default function SearchPage({ movies, series, searchQuery }: SearchPageProps) {
  const [filteredMovies, setFilteredMovies] = useState<SearchResult[]>(movies);
  const [filteredSeries, setFilteredSeries] = useState<SearchResult[]>(series);
  const [filter, setFilter] = useState("Release Date");
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [selectedServer, setSelectedServer] = useState(0);

  useEffect(() => {
    setFilteredMovies(movies);
    setFilteredSeries(series);
  }, [movies, series]);

  const filterMovies = (filter) => {
    let sortedMovies: SearchResult[] = [...movies];
    let sortedSeries: SearchResult[] = [...series];
    switch (filter) {
      case "Release Date":
        sortedMovies = [...movies].sort((a, b) => {
          const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
          const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
          return dateB - dateA;
        });
        sortedSeries = [...series].sort((a, b) => {
          const dateA = a.first_air_date ? new Date(a.first_air_date).getTime() : 0;
          const dateB = b.first_air_date ? new Date(b.first_air_date).getTime() : 0;
          return dateB - dateA;
        });
        break;

      case "Popularity":
        sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
        sortedSeries = [...series].sort((a, b) => b.popularity - a.popularity);
        break;

      case "Ratings":
        sortedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);
        sortedSeries = [...series].sort((a, b) => b.vote_average - a.vote_average);
        break;

      default:
        break;
    }
    setFilteredMovies(sortedMovies);
    setFilteredSeries(sortedSeries);
  };

  const servers = [
    {
      name: "VidSrc",
      url: selectedItem ? `https://vidsrc.to/embed/${selectedItem.media_type}/${selectedItem.id}` : '',
    },
    {
      name: "Superembed",
      url: selectedItem ? `https://multiembed.mov/?video_id=${selectedItem.id}&tmdb=1` : '',
    },
    {
      name: "SmashyStream",
      url: selectedItem ? `https://embed.smashystream.com/playere.php?tmdb=${selectedItem.id}` : '',
    },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="section-title">Search Results for "{searchQuery}"</h1>
        <Example setFilter={filterMovies} />
      </div>

      {/* Streaming UI */}
      {selectedItem && (
        <section className="space-y-6">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
            {!playerVisible && selectedItem.backdrop_path && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${selectedItem.backdrop_path}`}
                  alt={`${selectedItem.media_type === 'movie' ? selectedItem.title : selectedItem.name} backdrop`}
                  fill
                  className="object-cover opacity-50"
                />
                <button
                  onClick={() => setPlayerVisible(true)}
                  className="z-20 p-4 rounded-full bg-lightprimary dark:bg-darkprimary hover:bg-blue-700 dark:hover:bg-[#d97c13] transition-colors text-white"
                >
                  <Play size={48} />
                </button>
              </div>
            )}

            {playerVisible && (
              <iframe
                src={servers[selectedServer].url}
                allowFullScreen
                title={`${selectedItem.media_type === 'movie' ? selectedItem.title : selectedItem.name} Player`}
                className="w-full h-full"
              ></iframe>
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
                    setPlayerVisible(true);
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedServer === i ? 'bg-lightprimary dark:bg-darkprimary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                >
                  {`Server ${i + 1}`}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Movies Section */}
      {filteredMovies.length > 0 && (
        <section>
          <h2 className="section-title">Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {filteredMovies.map((item) => (
              <div key={item.id} onClick={() => {
                setSelectedItem(item);
                setPlayerVisible(false);
                setSelectedServer(0);
              }}>
                <Card
                  Img={item.poster_path}
                  Type="Movie"
                  Title={item.title && item.title.length > 24 ? item.title.slice(0, 24) + "…" : item.title || "Untitled"}
                  Date={item.release_date ? new Date(item.release_date).getFullYear() : "Year"}
                  RunTime={item.vote_average ? item.vote_average.toFixed(1) + " Rating" : "Rating"}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Series Section */}
      {filteredSeries.length > 0 && (
        <section>
          <h2 className="section-title">TV Series</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {filteredSeries.map((item) => (
              <div key={item.id} onClick={() => {
                setSelectedItem(item);
                setPlayerVisible(false);
                setSelectedServer(0);
              }}>
                <Card
                  Img={item.poster_path}
                  Type="Series"
                  Title={item.name && item.name.length > 24 ? item.name.slice(0, 24) + "…" : item.name || "Untitled"}
                  Date={item.first_air_date ? new Date(item.first_air_date).getFullYear() : "Year"}
                  RunTime={item.vote_average ? item.vote_average.toFixed(1) + " Rating" : "Rating"}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No Results Message */}
      {filteredMovies.length === 0 && filteredSeries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">No results found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
