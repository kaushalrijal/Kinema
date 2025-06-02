"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import PlayButton from "@/components/ui/PlayButton";

interface CardProps {
  Img: string | StaticImport;
  Type: React.ReactNode;
  Title: React.ReactNode;
  Date: React.ReactNode;
  RunTime: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ Img, Type, Title, Date, RunTime, onClick }) => {
  return (
    <div 
      className="group relative bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {/* Type Badge (top-left) */}
        <span className="absolute top-2 left-2 z-20 px-3 py-1 rounded-full bg-lightprimary dark:bg-darkprimary text-white text-xs font-semibold shadow-md">
          {Type}
        </span>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayButton onClick={onClick} />
        </div>

        {/* Poster Image or Placeholder */}
        {Img ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${Img}`}
            alt={`Poster for ${Title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-center p-4">
            No Image Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 line-clamp-2">
          {Title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
          <span>{Date}</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
            {RunTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
