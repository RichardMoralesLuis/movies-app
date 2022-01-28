import { useEffect, useState } from 'react';
import { MovieDetailModel } from '../api/movies/models';
import { API } from '../api/API';
import { CastAPI } from '../api/cast/model';

interface UseMovieResult {
  movie?: MovieDetailModel;
  isLoadingMovie: boolean;
  movieCasts: CastAPI[];
}

export const useMovie = (id: number): UseMovieResult => {
  const [movie, setMovie] = useState<MovieDetailModel>();
  const [movieCasts, setMovieCasts] = useState<CastAPI[]>([]);
  const [isLoadingMovie, setIsLoadingMovie] = useState<boolean>(true);

  useEffect(() => {
    const requestMovie = async () => {
      const movie = await API.MOVIES.byId(id);
      const credits = await API.MOVIES.credits(id);
      setMovie(movie);
      setMovieCasts(credits.cast);
      setIsLoadingMovie(false);
    };

    requestMovie().catch(console.error);
  }, [id]);


  return { movie, isLoadingMovie, movieCasts };
};
