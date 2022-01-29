import { MoviesApiResponse, MoviesResult, Video, VideoResponse } from './models';

export const toMovies = (moviesResponse: MoviesApiResponse): MoviesResult => {
  const { results, total_pages, page } = moviesResponse;

  return {
    totalPages: total_pages,
    page,
    movies: results
  };
};

export const toTrailer = (trailerResponse: VideoResponse): Video => {
  const { results } = trailerResponse;
  return results.find((video: any) => video.type === 'Trailer') || results[0];
};
