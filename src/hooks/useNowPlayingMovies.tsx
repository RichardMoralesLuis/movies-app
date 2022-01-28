import { useEffect, useState } from 'react';
import { API } from '../api/API';

interface UseNowPlayingMoviesResult {
  nowPlayingMovies: any[];
  isLoading: boolean;
  handleShowMoreNowPlayingFilms: () => void;
}

export const useNowPlayingMovies = (): UseNowPlayingMoviesResult => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRequestPopularFilms = async () => {
      setIsLoading(true);
      const { movies: popularFilms, page } = await API.MOVIES.nowPlaying();
      setNowPlayingMovies(popularFilms);
      setLastPage(page);
      setIsLoading(false);
    };

    handleRequestPopularFilms().catch(console.error);
  }, []);

  const handleShowMoreNowPlayingFilms = async () => {
    const { movies: newMovies, page: newPage } = await API.MOVIES.nowPlaying(lastPage + 1);
    setNowPlayingMovies([...nowPlayingMovies, ...newMovies]);
    setLastPage(newPage);
  };

  return {
    nowPlayingMovies,
    isLoading,
    handleShowMoreNowPlayingFilms
  };
};
