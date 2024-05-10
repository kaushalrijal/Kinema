import { ArrowRightCircleIcon } from "lucide-react";
import React from "react";

const Selctor = (props) => {
  return (
    <div>
      Season:
      <input
        type="number"
        className="bg-secondary p-2 w-12 rounded-md m-2"
        placeholder="1"
        value={props.selectedSeason}
        onChange={(event) => {
          props.setSelectedSeason(parseInt(event.target.value));
        }}
        max={props.movie.number_of_seasons}
      />
      Episode:
      <input
        type="number"
        className="bg-secondary p-2 w-12 rounded-md m-2"
        placeholder="1"
        value={props.episode}
        onChange={(event) => {
          props.setEpisode(parseInt(event.target.value));
        }}
        max={props.movie.seasons[props.selectedSeason - 1].episode_count}
      />
      <button
        className="flex bg-primary text-white w-full justify-center p-2"
        onClick={() => {
          props.setVisible(true);
        }}
      >
        Watch <ArrowRightCircleIcon className="p-1" />
      </button>
    </div>
  );
};

export default Selctor;
