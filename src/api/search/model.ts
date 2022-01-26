import { MoviesApiResponse, MoviesResult } from '../movies/models';

export interface SearchMovieResultAPI extends MoviesApiResponse {
  total_results: number;
}

export interface SearchMovieResult extends MoviesResult {
  totalResults: number;
}

