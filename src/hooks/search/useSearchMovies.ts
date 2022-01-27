import { useEffect, useState } from 'react';
import { MovieModel } from '../../api/movies/models';
import { API } from '../../api/API';
import { SearchInformation } from '../../api/search/model';

interface UseSearchMoviesResult {
  isSearchingMovies: boolean;
  movies: any;
  handleShowMoreFilms: () => void;
  searchInformation: SearchInformation;
}

export const useSearchMovies = (query: string): UseSearchMoviesResult => {
  const [isSearchingMovies, setIsSearchingMovies] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [searchInformation, setSearchInformation] = useState<SearchInformation>({ totalResults: 0, totalPages: 0 });
  const [page, setPage] = useState<number>(1);


  useEffect(() => {
    const doSearchRequests = async () => {
      setIsSearchingMovies(true);
      const { movies, page, totalResults, totalPages } = await API.MOVIES.search(query);
      setMovies(movies);
      setPage(page);
      setSearchInformation({ totalPages, totalResults });
      setIsSearchingMovies(false);
    };

    if (query.length) {
      doSearchRequests().catch(console.error);
    }
  }, [query]);

  const handleShowMoreFilms = async () => {
    const nextPage = page + 1;
    const { movies: newMovies } = await API.MOVIES.search(query, nextPage);
    setMovies([...movies, ...newMovies]);
    setPage(nextPage);
  };

  return {
    isSearchingMovies,
    movies,
    searchInformation,
    handleShowMoreFilms
  };
};
