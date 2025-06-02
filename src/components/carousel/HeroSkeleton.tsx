import React from "react";

const HeroSkeleton = () => {
  return (
    <div className="relative w-full h-[60vh] md:aspect-[21/9] rounded-2xl overflow-hidden animate-pulse bg-gray-300 dark:bg-gray-800">
      {/* Placeholder for background image/overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Placeholder for Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="max-w-3xl space-y-4">
          {/* Placeholder for Title */}
          <div className="h-10 md:h-14 bg-gray-400 dark:bg-gray-700 rounded w-3/4" />
          
          {/* Placeholder for Metadata Pills */}
          <div className="flex items-center flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-400 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-16 bg-gray-400 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-24 bg-gray-400 dark:bg-gray-700 rounded-full" />
          </div>

          {/* Placeholder for Overview */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded w-4/6" />
          </div>

          {/* Placeholder for Button */}
          <div className="mt-6">
            <div className="h-10 w-36 bg-gray-400 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton; 