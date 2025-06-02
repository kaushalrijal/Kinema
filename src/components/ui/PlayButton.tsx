import React from 'react';

interface PlayButtonProps {
  onClick?: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <button
        onClick={onClick}
        className="w-16 h-16 rounded-full bg-lightprimary dark:bg-darkprimary shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110"
        aria-label="Play"
      >
        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        </svg>
      </button>
    </div>
  );
};

export default PlayButton; 