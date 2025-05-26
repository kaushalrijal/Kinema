import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm h-72 animate-pulse">
      {/* Image Placeholder */}
      <div className="relative aspect-[2/3] w-full bg-gray-300 dark:bg-gray-600"></div>

      {/* Content Placeholder */}
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        <div className="flex items-center justify-between text-sm">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard; 