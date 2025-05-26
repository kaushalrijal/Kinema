export const API_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const POSTER_SIZES = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original'
} as const;

export const BACKDROP_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
  original: 'original'
} as const;

export const ROUTES = {
  HOME: '/',
  MOVIES: '/movies',
  SHOWS: '/shows',
  SEARCH: '/search',
  ABOUT: '/about',
  WATCH: '/watch'
} as const; 