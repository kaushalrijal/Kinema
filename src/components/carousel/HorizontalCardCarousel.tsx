"use client";

import React, { useRef, useEffect, useState } from 'react';
// We will not use the base Card component directly inside the carousel anymore
// import Card from './card';
import Link from 'next/link';
import Image from 'next/image';
import { Movie, Show, SearchResult } from "@/types";

interface HorizontalCardCarouselProps {
  title: string;
  items: SearchResult[];
}

const HorizontalCardCarousel: React.FC<HorizontalCardCarouselProps> = ({ title, items }) => {
    // Determine the field names based on the type
    const titleField = (item: Movie | Show) => 'title' in item ? 'title' : 'name';
    const dateField = (item: Movie | Show | SearchResult) => 'release_date' in item ? 'release_date' : 'first_air_date';

    // Scroll indicator logic
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showIndicator, setShowIndicator] = useState(false);
    const [atEnd, setAtEnd] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const checkScroll = () => {
            setShowIndicator(el.scrollWidth > el.clientWidth);
            setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8); // 8px tolerance
        };
        checkScroll();
        el.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [items]);

  return (
    <div className="space-y-6 relative">
      <h2 className="section-title">{title}</h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar"
        >
          {items.map((item, index) => (
            <Link
              href={`/watch/${item.media_type === 'movie' ? 'movie' : 'series'}/${item.id}`}
              key={item.id}
              className="flex-shrink-0 w-56 h-40 sm:w-64 sm:h-44 md:w-72 md:h-48 group block relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={`Poster for ${item.title || item.name}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white space-y-1 flex flex-col justify-end h-full">
                <div className="flex items-center flex-wrap gap-1 text-xs font-semibold">
                  {/* Display year if release_date or first_air_date exists */}
                  {item.release_date || item.first_air_date ? (
                    <span className="px-2 py-0.5 rounded-md bg-lightprimary dark:bg-darkprimary text-white">{new Date(item.release_date ? item.release_date : item.first_air_date!).getFullYear()}</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-lightprimary dark:bg-darkprimary text-white">N/A</span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-lightprimary dark:bg-darkprimary text-white">{item.media_type === 'movie' ? 'Movie' : 'Series'}</span>
                  {typeof item.vote_average === 'number' && (
                    <span className="px-2 py-0.5 rounded-md bg-lightprimary dark:bg-darkprimary text-white">{item.vote_average > 0 ? item.vote_average.toFixed(1) : 'N/A'}</span>
                  )}
                </div>
                <h3 className="text-sm font-bold line-clamp-2">
                  {item.title || item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        {/* Scroll indicator: right fade + chevron */}
        {showIndicator && !atEnd && (
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-16 flex items-center justify-end">
            <div className="h-full w-full bg-gradient-to-l from-white/90 to-transparent rounded-r-lg" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 animate-bounce-x">
              {/* Chevron Right SVG */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
        )}
      </div>
       {/* Add basic scrollbar hiding style - can be moved to global styles if needed */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(8px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1.2s infinite;
        }
      `}</style>
    </div>
  );
};

export default HorizontalCardCarousel; 