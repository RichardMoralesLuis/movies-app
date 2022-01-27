import { MoviesResult } from './movies/models';
import { toMovies } from './movies/parser';
import { SearchCastResult, SearchCompanyResult, SearchMovieResult } from './search/model';
import { toSearchCasts, toSearchCompanies, toSearchMovies } from './search/parse';

const buildURLParams = (params: any = {}): URLSearchParams => {
  const searchParams = new URLSearchParams();
  searchParams.append('api_key', process.env.REACT_APP_API_KEY!);
  Object.keys(params).forEach(paramKey => searchParams.append(paramKey, params[paramKey]));
  return searchParams;
};

const get = async <T>(path: string, params?: any, parser?: any): Promise<T> => {
  const searchParams = buildURLParams(params);
  const url = `${process.env.REACT_APP_BASE_URL}/${path}?${searchParams}`;

  const response = await fetch(url);
  const responseJson = await response.json();

  if (parser) {
    return parser(responseJson);
  }

  return responseJson;
};

export const API = {
  MOVIES: {
    popular: (page: number = 1) => get<MoviesResult>('movie/popular', { page }, toMovies),
    search: (query: string, page = 1) => get<SearchMovieResult>('search/movie', { query, page }, toSearchMovies)
  },
  CASTS: {
    search: (query: string, page = 1) => get<SearchCastResult>('search/person', { query, page }, toSearchCasts)
  },
  PRODUCTION_COMPANIES: {
    search: (query: string, page = 1) => get<SearchCompanyResult>('search/company', { query, page }, toSearchCompanies)
  },
  GENRES: {
    all: () => get('genre/movie/list')
  },
  DISCOVER: {
    filter: (params: any) => get<MoviesResult>('discover/movie', { ...params, sort_by: 'original_title.asc' }, toMovies)
  }
};
