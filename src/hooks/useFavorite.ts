import { useEffect, useState } from 'react';
import { SimpleMovieApiModel } from '../api/movies/models';
import { API } from '../api/API';

interface UseFavoritesResult {
  favoriteMovies: SimpleMovieApiModel[];
  isLoadingFavoritesMovies: boolean;
  handleAddFavorite: (movieId: number) => void;
  handleRemoveFavorite: (movieId: number) => void;
  handleShowMoreFilms: () => void;
  favoritesError: boolean;
  handleCloseFavoriteError: () => void;
}

export const useFavorites = (accountId?: number, sessionId?: string): UseFavoritesResult => {
  const [favoriteMovies, setFavoriteMovies] = useState<SimpleMovieApiModel[]>([]);
  const [isLoadingFavoritesMovies, setIsLoadingFavoritesMovies] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [favoritesError, setFavoritesError] = useState<boolean>(false);

  useEffect(() => {
    const requestFavoriteFilms = async () => {
      setIsLoadingFavoritesMovies(true);
      const { movies } = await API.MOVIES.favorites(accountId!, sessionId!);
      setFavoriteMovies(movies);
      setIsLoadingFavoritesMovies(false);
    };

    if (accountId && sessionId) {
      requestFavoriteFilms().catch(e => {
        console.error(e); // TODO: send error to sentry
        setFavoritesError(true);
      });
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

  const handleCloseFavoriteError = async () => setFavoritesError(false);


  return {
    favoriteMovies,
    isLoadingFavoritesMovies,
    handleAddFavorite,
    handleRemoveFavorite,
    handleShowMoreFilms,
    favoritesError,
    handleCloseFavoriteError
  };

};
