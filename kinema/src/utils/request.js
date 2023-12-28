const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getTrendingMovies = async () => {
    const res = await fetch(`${BASE_URL}/trending/movie/week?language=en-US&api_key=${API_KEY}`);
    const data = await res.json();
    return data.results
  }
  
  export const getTrendingSeries = async () => {
      const res = await fetch(`${BASE_URL}/trending/tv/day?language=en-US&api_key=${API_KEY}`);
      const data = await res.json();
      return data.results
    }
  
    export const getTrending = async () => {
      const res = await fetch(`${BASE_URL}/trending/all/day?language=en-US&api_key=${API_KEY}`);
      const data = await res.json();
      return data.results
    }

    export const getMovies = async (query) => {
      const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
      const data = await res.json();
      return data.results;
    }
    
    export const getSearch = async (query) => {
      const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
      const data = await res.json();
      return data.results;
    }
    
  export const getMovieDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    const data = await res.json();
    return data;
  }
  
  export const getSeriesDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
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
  
  export const getTopRatedSeries = async () => {
    const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
  }

  export const discoverMovies = async () => {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}`);
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
  
  export const getAddedMovies = async () => {
    const res = await fetch("https://vidsrc.xyz/movies/latest/page-1.json")
    const data = await res.json();
    return data.result
  }
  
  export const getAddedSeries = async () => {
    const res = await fetch("https://vidsrc.xyz/tvshows/latest/page-1.json")
    const data = await res.json();
    return data.result
    print(data.result);
  }
  export const getEpisodes = async(id)=> {
    const url = `https://movies-api14.p.rapidapi.com/show/${id}`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "252739274bmsheb338140961d5e9p1853f0jsne1fd1d2dba6e",
            "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
          },
        };

    const res = await fetch(url, options)
    const data = await res.json();
    return data.seasons;
  }


