import React, { FC } from 'react';
import { useFavorites } from '../hooks/useFavorite';
import { useMainContext } from '../context/Context';
import { MoviesList } from '../components/movies/MoviesList';
import { NavBar } from '../components/navbar/Navbar';
import { PageContainer } from './PageContainer';

export const FavoriteFilms: FC = () => {
  const { userAccount, sessionId } = useMainContext();
  const { favoriteMovies, handleShowMoreFilms } = useFavorites(userAccount?.id, sessionId);

  return <>
    <NavBar/>
    <PageContainer>
      <MoviesList movies={favoriteMovies} onShowMoreMovies={handleShowMoreFilms}/>
    </PageContainer>
  </>;
};
