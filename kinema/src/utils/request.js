const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getTrendingMovies = async () => {
    const res = await fetch(`${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`);
    const data = await res.json();
    return data.results
  }
  
  export const getMovies = async (query) => {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    return data.results;
  }
  
  export const getMovieDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const data = await res.json();
    return data;
  }
  
  export const getSimilarMovies = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
  }
  export const getTopRatedMovies = async () => {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
  }
  
  export const getPopularMovies = async() => {
    // const res = await fetch(`${BASE_URL}/movie/popular?api_key={$API_KEY}`)
    // const data = await res.json();
    // return data.results;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjFiYWZiMWIzMjM1MTc3ZWQ0OTA0Mjc4YzE1NTI0OSIsInN1YiI6IjY1ODJkYmM4OTkyZmU2M2U3ZTcyNDIzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-g9tn45Un-Sdi5beHrcrY5mGnPDJ_XVWzGLOtjwNtU'
      }
    };
    
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const data = await res.json();
    return data.results;

  }
  