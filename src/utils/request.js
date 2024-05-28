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

export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export const getSeriesDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export const getSimilarMovies = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};

export const getSimilarSeries = async (id) => {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};

export const getTopRatedMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
};

export const getTopRatedSeries = async () => {
  const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
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
  const res = await fetch("https://vidsrc.to/vapi/tv/add", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.result;
};
