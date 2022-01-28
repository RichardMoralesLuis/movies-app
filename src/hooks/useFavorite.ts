import { useEffect, useState } from 'react';
import { SimpleMovieApiModel } from '../api/movies/models';
import { API } from '../api/API';

interface UseFavoritesResult {
  favoriteMovies: SimpleMovieApiModel[];
  isLoadingFavoritesMovies: boolean;
  handleAddFavorite: (movieId: number) => void;
  handleRemoveFavorite: (movieId: number) => void;
}

export const useFavorites = (accountId?: number, sessionId?: string): UseFavoritesResult => {
  const [favoriteMovies, setFavoriteMovies] = useState<SimpleMovieApiModel[]>([]);
  const [isLoadingFavoritesMovies, setIsLoadingFavoritesMovies] = useState<boolean>(true);

  useEffect(() => {
    const requestFavoriteFilms = async () => {
      setIsLoadingFavoritesMovies(true);
      const { movies } = await API.MOVIES.favorites(accountId!, sessionId!);
      setIsLoadingFavoritesMovies(false);
      setFavoriteMovies(movies);
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


  return {
    favoriteMovies,
    isLoadingFavoritesMovies,
    handleAddFavorite,
    handleRemoveFavorite
  };

};
