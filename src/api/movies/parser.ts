import { MoviesApiResponse, MoviesResult } from './models';

export const toMovies = (moviesResponse: MoviesApiResponse): MoviesResult => {
  const { results, total_pages, page } = moviesResponse;

  return {
    totalPages: total_pages,
    page,
    movies: results
  };
};
