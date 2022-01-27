import { useEffect, useState } from 'react';
import { API } from '../api/API';

interface UsePopularFilmsResult {
  popularMovies: any[];
  isLoading: boolean;
  isMoreEnable: boolean;
  handleShowMorePopularFilms: () => void;
}

export const usePopularFilms = (): UsePopularFilmsResult => {
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isMoreEnable, setIsMoreEnable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRequestPopularFilms = async () => {
      setIsLoading(true);
      const { movies: popularFilms, page, totalPages } = await API.MOVIES.popular();
      setPopularMovies(popularFilms);
      setLastPage(page);
      setIsMoreEnable(lastPage <= totalPages);
      setIsLoading(false);
    };

    handleRequestPopularFilms().catch(console.error);
  }, []);

  const handleShowMorePopularFilms = async () => {
    const { movies: newMovies, page: newPage, totalPages } = await API.MOVIES.popular(lastPage + 1);
    setPopularMovies([...popularMovies, ...newMovies]);
    setLastPage(newPage);
    setIsMoreEnable(lastPage <= totalPages);
  };

  return {
    popularMovies,
    isLoading,
    isMoreEnable,
    handleShowMorePopularFilms
  };
};
