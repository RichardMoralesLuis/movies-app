import { MoviesApiResponse, MoviesResult } from '../movies/models';
import { CastAPIResponse, CastModel } from '../cast/model';

export interface SearchMovieResultAPI extends MoviesApiResponse {
  total_results: number;
}

export interface SearchMovieResult extends MoviesResult {
  totalResults: number;
}

export interface SearchCastResultAPI extends CastAPIResponse {
  total_results: number;
}

export interface SearchCastResult extends CastModel {
  totalResults: number;
}

