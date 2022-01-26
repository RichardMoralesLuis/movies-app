import { useEffect, useState } from 'react';
import { MovieModel } from '../../api/movies/models';
import { API } from '../../api/API';

interface UseSearchMoviesResult {
  isSearchingMovies: boolean;
  movies: any;
  handleShowMoreFilms: () => void;
  totalMovies: number;
}

export const useSearchMovies = (query: string): UseSearchMoviesResult => {
  const [isSearchingMovies, setIsSearchingMovies] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);


  useEffect(() => {
    const doSearchRequests = async () => {
      setIsSearchingMovies(true);
      const { movies, page, totalResults } = await API.MOVIES.search(query);
      setMovies(movies);
      setPage(page);
      setTotalMovies(totalResults);
      setIsSearchingMovies(false);
    };

    if (query.length) {
      doSearchRequests().catch(console.error);
    }
  }, [query]);

  const handleShowMoreFilms = async () => {
    setIsSearchingMovies(true);
    const { movies: newMovies, page: newPage } = await API.MOVIES.search(query, page + 1);
    setMovies([...movies, ...newMovies]);
    setPage(newPage);
    setIsSearchingMovies(false);
  };

  return {
    isSearchingMovies,
    movies,
    totalMovies,
    handleShowMoreFilms
  };
};
