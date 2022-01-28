import { CreditsResponse, MovieDetailModel, MoviesResult } from './movies/models';
import { toMovies } from './movies/parser';
import { SearchCastResult, SearchCompanyResult, SearchMovieResult } from './search/model';
import { toSearchCasts, toSearchCompanies, toSearchMovies } from './search/parse';
import { Account, LoginResponse, SessionResponse } from './user/models';

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

const post = async <T>(path: string, body?: any, params?: any, parser?: any): Promise<T> => {
  const searchParams = buildURLParams(params);
  const url = `${process.env.REACT_APP_BASE_URL}/${path}?${searchParams}`;

  const response = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
  const responseJson = await response.json();

  if (parser) {
    return parser(responseJson);
  }

  return responseJson;
};

export const API = {
  MOVIES: {
    popular: (page: number = 1) => get<MoviesResult>('movie/popular', { page }, toMovies),
    nowPlaying: (page: number = 1) => get<MoviesResult>('movie/now_playing', { page }, toMovies),
    search: (query: string, page = 1) => get<SearchMovieResult>('search/movie', { query, page }, toSearchMovies),
    byId: (movieId: number) => get<MovieDetailModel>(`movie/${movieId}`),
    credits: (movieId: number) => get<CreditsResponse>(`movie/${movieId}/credits`),
    favorites: (accountId: number, sessionId: string, page: number = 1) => get<MoviesResult>(`account/${accountId}/favorite/movies`, { session_id: sessionId, page }, toMovies),
    addFavorite: (accountId: number, movieId: number, sessionId: string) => post(`account/${accountId}/favorite`, { media_type: 'movie', media_id: movieId, favorite: true }, { session_id: sessionId }),
    removeFavorite: (accountId: number, movieId: number, sessionId: string) => post(`account/${accountId}/favorite`, { media_type: 'movie', media_id: movieId, favorite: false }, { session_id: sessionId })
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
  },
  USER: {
    token: () => get<LoginResponse>('authentication/token/new'),
    login: (credentials: any, request_token: string) => post<LoginResponse>('authentication/token/validate_with_login', { username: credentials.username, password: credentials.password, request_token }),
    session: (token: string) => post<SessionResponse>('authentication/session/new', { request_token: token }),
    account: (sessionId: string) => get<Account>('account', { session_id: sessionId })
  }
};
