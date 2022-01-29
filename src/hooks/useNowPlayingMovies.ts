import { useEffect, useState } from 'react';
import { API } from '../api/API';

interface UseNowPlayingMoviesResult {
  nowPlayingMovies: any[];
  isLoading: boolean;
  handleShowMoreNowPlayingFilms: () => void;
  nowPlayingMoviesError: boolean;
  handleCloseNowPlayingMoviesError: () => void;
}

export const useNowPlayingMovies = (): UseNowPlayingMoviesResult => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nowPlayingMoviesError, setNowPlayingMoviesError] = useState<boolean>(false);

  useEffect(() => {
    const handleRequestPopularFilms = async () => {
      setIsLoading(true);
      const { movies: popularFilms, page } = await API.MOVIES.nowPlaying();
      setNowPlayingMovies(popularFilms);
      setLastPage(page);
      setIsLoading(false);
    };

    handleRequestPopularFilms()
      .catch(e => {
        console.error(e); // TODO: Send to sentry;
        setNowPlayingMoviesError(true);
      });
  }, []);

  const handleShowMoreNowPlayingFilms = async () => {
    const { movies: newMovies, page: newPage } = await API.MOVIES.nowPlaying(lastPage + 1);
    setNowPlayingMovies([...nowPlayingMovies, ...newMovies]);
    setLastPage(newPage);
  };

  const handleCloseNowPlayingMoviesError = () => setNowPlayingMoviesError(false);

  return {
    nowPlayingMovies,
    isLoading,
    handleShowMoreNowPlayingFilms,
    nowPlayingMoviesError,
    handleCloseNowPlayingMoviesError
  };
};
