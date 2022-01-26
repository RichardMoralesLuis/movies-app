import { SearchMovieResult, SearchMovieResultAPI } from './model';
import { toMovies } from '../movies/parser';

export const toSearchMovies = (response: SearchMovieResultAPI): SearchMovieResult => {
  const { total_results } = response;
  const movies = toMovies(response);

  return {
    ...movies,
    totalResults: total_results
  };
};

export const toSearchCasts = (response: SearchMovieResultAPI): SearchMovieResult => {
  const { total_results } = response;
  const movies = toMovies(response);

  return {
    ...movies,
    totalResults: total_results
  };
};
