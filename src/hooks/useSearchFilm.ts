import { useEffect, useState } from 'react';
import { API } from '../api/API';

interface UseSearchFilmResult {
  isSearching: boolean;
  movies: any;
  casts: any;
  productionCompanies: any;
}

export const useSearchFilm = (query: string): UseSearchFilmResult => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [movies, setMovies] = useState([]);
  const [casts, setCasts] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);

  useEffect(() => {
    const doSearchRequests = async () => {
      setIsSearching(true);
      const { results: movies }: any = await API.MOVIES.search(query);
      const { results: casts }: any = await API.CASTS.search(query);
      const { results: productionCompanies }: any = await API.PRODUCTION_COMPANIES.search(query);
      setMovies(movies);
      setCasts(casts);
      setProductionCompanies(productionCompanies);
      setIsSearching(false);
    };

    if (query.length) {
      doSearchRequests().catch(console.error);
    }
  }, [query]);

  return {
    isSearching,
    movies,
    casts,
    productionCompanies
  };

};
