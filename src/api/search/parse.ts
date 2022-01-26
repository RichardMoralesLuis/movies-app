import { SearchCastResult, SearchCastResultAPI, SearchCompanyResult, SearchCompanyResultAPI, SearchMovieResult, SearchMovieResultAPI } from './model';
import { toMovies } from '../movies/parser';
import { toCasts } from '../cast/parser';
import { toCompanies } from '../companies/parser';

export const toSearchMovies = (response: SearchMovieResultAPI): SearchMovieResult => {
  const { total_results } = response;
  const movies = toMovies(response);

  return {
    ...movies,
    totalResults: total_results
  };
};

export const toSearchCasts = (response: SearchCastResultAPI): SearchCastResult => {
  const { total_results } = response;
  const casts = toCasts(response);

  return {
    ...casts,
    totalResults: total_results
  };
};

export const toSearchCompanies = (response: SearchCompanyResultAPI): SearchCompanyResult => {
  const { total_results } = response;
  const companies = toCompanies(response);

  return {
    ...companies,
    totalResults: total_results
  };
};
