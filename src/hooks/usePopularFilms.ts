import { useEffect, useState } from 'react';
import { API } from '../api/API';

interface UsePopularFilmsResult {
  popularMovies: any[];
  isLoading: boolean;
  handleShowMorePopularFilms: () => void;
}

export const usePopularFilms = (): UsePopularFilmsResult => {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRequestPopularFilms = async () => {
      setIsLoading(true);
      const { movies: popularFilms, page } = await API.MOVIES.popular();
      setPopularMovies(popularFilms);
      setLastPage(page);
      setIsLoading(false);
    };

    handleRequestPopularFilms().catch(console.error);
  }, []);

  const handleShowMorePopularFilms = async () => {
    const { movies: newMovies, page: newPage } = await API.MOVIES.popular(lastPage + 1);
    setPopularMovies([...popularMovies, ...newMovies]);
    setLastPage(newPage);
  };

  return {
    popularMovies,
    isLoading,
    handleShowMorePopularFilms
  };
};
