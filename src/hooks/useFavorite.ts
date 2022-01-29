import { useEffect, useState } from 'react';
import { SimpleMovieApiModel } from '../api/movies/models';
import { API } from '../api/API';

interface UseFavoritesResult {
  favoriteMovies: SimpleMovieApiModel[];
  isLoadingFavoritesMovies: boolean;
  handleAddFavorite: (movieId: number) => void;
  handleRemoveFavorite: (movieId: number) => void;
  handleShowMoreFilms: () => void;
}

export const useFavorites = (accountId?: number, sessionId?: string): UseFavoritesResult => {
  const [favoriteMovies, setFavoriteMovies] = useState<SimpleMovieApiModel[]>([]);
  const [isLoadingFavoritesMovies, setIsLoadingFavoritesMovies] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const requestFavoriteFilms = async () => {
      setIsLoadingFavoritesMovies(true);
      const { movies } = await API.MOVIES.favorites(accountId!, sessionId!);
      setFavoriteMovies(movies);
      setIsLoadingFavoritesMovies(false);
    };

    if (accountId && sessionId) {
      requestFavoriteFilms().catch(console.error);
    }

  }, [accountId, sessionId]);

  const handleAddFavorite = async (movieId: number) => {
    try {
      await API.MOVIES.addFavorite(accountId!, movieId, sessionId!);
      const { movies } = await API.MOVIES.favorites(accountId!, sessionId!);
      setFavoriteMovies(movies);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveFavorite = async (movieId: number) => {
    try {
      await API.MOVIES.removeFavorite(accountId!, movieId, sessionId!);
      const { movies } = await API.MOVIES.favorites(accountId!, sessionId!);
      setFavoriteMovies(movies);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShowMoreFilms = async () => {
    const nextPage = page + 1;
    const { movies: newMovies } = await API.MOVIES.favorites(accountId!, sessionId!, nextPage);
    setFavoriteMovies([...favoriteMovies, ...newMovies]);
    setPage(nextPage);
  };


  return {
    favoriteMovies,
    isLoadingFavoritesMovies,
    handleAddFavorite,
    handleRemoveFavorite,
    handleShowMoreFilms
  };

};
