import { useEffect, useState } from 'react';
import { API } from '../api/API';
import { MovieModel } from '../api/movies/models';

interface UseSearchFilmResult {
  isSearching: boolean;
  movies: any;
  casts: any;
  productionCompanies: any;
  handleShowMoreFilms: () => void;
  totalMovies: number;
}

export const useSearch = (query: string): UseSearchFilmResult => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [casts, setCasts] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);

  useEffect(() => {
    const doSearchRequests = async () => {
      setIsSearching(true);
      const { movies, page, totalResults } = await API.MOVIES.search(query);
      const { results: casts }: any = await API.CASTS.search(query);
      const { results: productionCompanies }: any = await API.PRODUCTION_COMPANIES.search(query);
      setMovies(movies);
      setPage(page);
      setTotalMovies(totalResults);
      setCasts(casts);
      setProductionCompanies(productionCompanies);
      setIsSearching(false);
    };

    if (query.length) {
      doSearchRequests().catch(console.error);
    }
  }, [query]);

  const handleShowMoreFilms = async () => {
    setIsSearching(true);
    const { movies: newMovies, page: newPage } = await API.MOVIES.search(query, page + 1);
    setMovies([...movies, ...newMovies]);
    setPage(newPage);
    setIsSearching(false);
  };

  return {
    isSearching,
    movies,
    casts,
    productionCompanies,
    handleShowMoreFilms,
    totalMovies
  };

};
