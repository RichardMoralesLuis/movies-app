import { useEffect, useState } from 'react';
import { API } from '../api/API';

interface UsePopularFilmsResult {
  popularMovies: any[];
  isLoading: boolean;
  handleShowMorePopularFilms: () => void;
  popularMoviesError: boolean;
  handleClosePopularMoviesError: () => void;
}

export const usePopularMovies = (): UsePopularFilmsResult => {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [popularMoviesError, setPopularMoviesError] = useState<boolean>(false);

  useEffect(() => {
    const handleRequestPopularFilms = async () => {
      setIsLoading(true);
      const { movies: popularFilms, page } = await API.MOVIES.popular();
      setPopularMovies(popularFilms);
      setLastPage(page);
      setIsLoading(false);
    };

    handleRequestPopularFilms()
      .catch(e => {
        console.error(e); // TODO: Send error to sentry.
        setPopularMoviesError(true);
      });
  }, []);

  const handleShowMorePopularFilms = async () => {
    const { movies: newMovies, page: newPage } = await API.MOVIES.popular(lastPage + 1);
    setPopularMovies([...popularMovies, ...newMovies]);
    setLastPage(newPage);
  };

  const closePopularMoviesError = () => setPopularMoviesError(false);

  return {
    popularMovies,
    isLoading,
    handleShowMorePopularFilms,
    popularMoviesError,
    handleClosePopularMoviesError: closePopularMoviesError
  };
};
