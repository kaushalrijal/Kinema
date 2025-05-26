import { Movie, MovieDetails, Show, ShowDetails, ApiResponse, SimilarResponse, SearchResult } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getTrendingMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?language=en-US&api_key=${API_KEY}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.results;
};

export const getTrendingSeries = async () => {
  const res = await fetch(
    `${BASE_URL}/trending/tv/day?language=en-US&api_key=${API_KEY}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.results;
};

export const getTrending = async () => {
  const res = await fetch(
    `${BASE_URL}/trending/all/day?language=en-US&api_key=${API_KEY}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.results;
};

export const getMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
};

export const getSearch = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) {
      console.error(`HTTP error fetching movie ${id}! status: ${res.status}`);
      return undefined as any; // Return undefined or null on HTTP error
    }
    const data = await res.json();
    // Add a check here if the data structure is not as expected
    if (!data || typeof data.id !== 'number') {
        console.error(`Invalid data structure for movie ID ${id}:`, data);
        return undefined as any; // Return undefined or null on invalid data
    }
    return data;
  } catch (error) {
    console.error(`Error in getMovieDetails for ID ${id}:`, error);
    return undefined as any; // Return undefined or null on other errors
  }
};

export const getSeriesDetails = async (id: number): Promise<ShowDetails> => {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export const getSimilarMovies = async (id: number): Promise<SimilarResponse> => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export const getSimilarSeries = async (id: number): Promise<SimilarResponse> => {
  const res = await fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
     if (!Array.isArray(data.results)) {
      console.error('Unexpected API response for top rated movies:', data);
      throw new Error('API response for top rated movies does not contain a results array');
    }
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

export const getTopRatedSeries = async (): Promise<Show[]> => {
  try {
    const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
     if (!Array.isArray(data.results)) {
      console.error('Unexpected API response for top rated series:', data);
      throw new Error('API response for top rated series does not contain a results array');
    }
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated series:', error);
    throw error;
  }
};

export const discoverMovies = async () => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const getAddedMovies = async () => {
  const res = await fetch("https://vidsrc.xyz/movies/latest/page-1.json");
  const data = await res.json();
  return data.result;
};

export const getAddedSeries = async () => {
  const res = await fetch("https://vidsrc.xyz/tvshows/latest/page-15.json", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.result;
};

export const searchMulti = async (query: string): Promise<ApiResponse<SearchResult>> => {
  const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  return data;
};
