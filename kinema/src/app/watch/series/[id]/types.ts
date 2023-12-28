
// types.ts

export default interface ShowData {
  first_air_date: string;
  last_air_date: string;
  number_of_episodes: number;
  original_language: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  number_of_seasons: number;
  vote_average: number;
  backdrop_path: string;
  last_episode_to_air : {
    air_date: string;
    season_number: number;
    episode_number: number;
  }
  origin_country : [
    string
  ];
  genres: [
    {
        id: number;
        name: string;
    }
  ];
  production_companies: [
    {
        id: number;
        name: string;
        origin_country: string;
    }
  ];
  production_countries: [
    {
        iso_3166_1 : string;
        name: string;
    }
  ];
  seasons: [{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
}
  ]
}