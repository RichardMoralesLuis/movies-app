import { Company } from '../companies/models';
import { Genre } from '../genres/models';
import { Cast } from '../cast/model';

export interface MoviesApiResponse {
  results: SimpleMovieApiModel[];
  total_pages: number;
  page: number;
}

export interface SimpleMovieApiModel {
  title: string;
  genre_ids: number[];
  id: number;
  poster_path?: string;
  backdrop_path?: string;
  video?: boolean;
  overview: string;
}

export interface MovieDetailModel {
  title: string;
  original_title: string;
  genres: Genre[];
  id: number;
  poster_path?: string;
  video: boolean;
  overview: string;
  backdrop_path?: string;
  status: string;
  release_date: string;
  revenue: number;
  production_companies: Company[];
  budget: number;
  vote_average: number;
}

export interface MoviesResult {
  movies: SimpleMovieApiModel[];
  page: number;
  totalPages: number;
}

export interface CreditsResponse {
  id: number;
  cast: Cast[];
}

export interface Video {
  name: string;
  key: string;
  site: string;
  id: string;
  type: string;
}

export interface VideoResponse {
  results: Video[];
  id: number;
}


