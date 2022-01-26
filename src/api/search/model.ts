import { MoviesApiResponse, MoviesResult } from '../movies/models';
import { CastAPIResponse, CastResult } from '../cast/model';
import { CompaniesAPIResponse, CompanyResult } from '../companies/models';

export interface SearchMovieResultAPI extends MoviesApiResponse {
  total_results: number;
}

export interface SearchMovieResult extends MoviesResult {
  totalResults: number;
}

export interface SearchCastResultAPI extends CastAPIResponse {
  total_results: number;
}

export interface SearchCastResult extends CastResult {
  totalResults: number;
}

export interface SearchCompanyResultAPI extends CompaniesAPIResponse {
  total_results: number;
}

export interface SearchCompanyResult extends CompanyResult {
  totalResults: number;
}

