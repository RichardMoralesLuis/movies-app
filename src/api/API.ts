import { MoviesResult } from './movies/models';
import { toMovies } from './movies/parser';
import { SearchMovieResult } from './search/model';
import { toSearchMovies } from './search/parse';

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
    search: (query: string, page = 1) => get('search/person', { query, page })
  },
  PRODUCTION_COMPANIES: {
    search: (query: string, page = 1) => get('search/company', { query, page })
  },
  GENRES: {
    all: () => get('genre/movie/list')
  },
  DISCOVER: {
    filter: (params: any) => get('discover/movie', params, toMovies)
  }
};
