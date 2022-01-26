
export interface MoviesApiResponse {
  results: MovieAPI[];
  total_pages: number;
  page: number;
}
export interface MovieAPI {
    title: string;
    genre_ids: number[];
    id: number;
    poster_path?: string;
    backdrop_path?: string;
    video: boolean;
    overview: string;
}

export interface MovieModel {
  title: string;
  genres: number[];
  id: number;
  posterPath?: string;
  video: boolean;
  overview: string;
  backdropPath?: string;
}

export interface MoviesResult {
  movies: MovieModel[];
  page: number;
  totalPages: number;
}


