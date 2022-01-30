import { useEffect, useState } from 'react';
import { MovieDetailModel } from '../api/movies/models';
import { API } from '../api/API';
import { Cast } from '../api/cast/model';

interface UseMovieResult {
  movie?: MovieDetailModel;
  isLoadingMovie: boolean;
  movieCasts: Cast[];
  movieError: boolean;
  handleCloseMovieError: () => void;
}

export const useMovie = (id: number): UseMovieResult => {
  const [movie, setMovie] = useState<MovieDetailModel>();
  const [movieCasts, setMovieCasts] = useState<Cast[]>([]);
  const [isLoadingMovie, setIsLoadingMovie] = useState<boolean>(true);
  const [movieError, setMovieError] = useState<boolean>(false);

  useEffect(() => {
    const requestMovie = async () => {
      const movie = await API.MOVIES.byId(id);
      const credits = await API.MOVIES.credits(id);
      setMovie(movie);
      setMovieCasts(credits.cast);
      setIsLoadingMovie(false);
    };

    requestMovie().catch(e => {
      console.error(e); // TODO: send to sentry
      setMovieError(true);
    });
  }, [id]);

  const handleCloseMovieError = () => setMovieError(false);


  return { movie, isLoadingMovie, movieCasts, movieError, handleCloseMovieError };
};
