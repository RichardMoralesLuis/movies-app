import { MovieModel, MovieAPI, MoviesApiResponse, MoviesResult } from './models';

const toMovie = (movie: MovieAPI): MovieModel => {
  const { poster_path, genre_ids, backdrop_path } = movie;
  return {
    ...movie,
    posterPath: poster_path,
    genres: genre_ids,
    backdropPath: backdrop_path
  };
};

export const toMovies = (moviesResponse: MoviesApiResponse): MoviesResult => {
  const { results, total_pages, page } = moviesResponse;

  return {
    totalPages: total_pages,
    page,
    movies: results.map(toMovie)
  };
};

