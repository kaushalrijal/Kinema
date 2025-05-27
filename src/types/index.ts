export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string }[];
  spoken_languages: { english_name: string; iso_639_1: string }[];
  production_countries: { name: string; iso_3166_1: string }[];
}

export interface Show {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
}

export interface ShowDetails extends Show {
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: {
    id: number;
    season_number: number;
    episode_count: number;
    name: string;
    overview: string;
    poster_path: string;
  }[];
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string }[];
  spoken_languages: { english_name: string; iso_639_1: string }[];
  origin_country?: string[];
  original_language: string;
  last_air_date?: string;
  last_episode_to_air?: {
    air_date: string;
    season_number: number;
    episode_number: number;
  };
}

export interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: 'movie' | 'tv';
  poster_path: string;
  backdrop_path?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  popularity: number;
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface SimilarResponse {
  page: number;
  results: (Movie | Show)[];
  total_pages: number;
  total_results: number;
}

export type MediaType = 'movie' | 'tv'; 