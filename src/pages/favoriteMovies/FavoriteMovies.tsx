import React, { FC } from 'react';
import { useFavorites } from '../../hooks/useFavorite';
import { useMainContext } from '../../context/Context';
import { MoviesList } from '../../components/movies/MoviesList';
import { NavBar } from '../../components/navbar/Navbar';
import { PageContainer } from '../../components/containers/PageContainer';
import { Banner } from '../../components/banner/Banner';

export const FavoriteMovies: FC = () => {
  const { userAccount, sessionId } = useMainContext();
  const { favoriteMovies, handleShowMoreFilms, favoritesError, handleCloseFavoriteError } = useFavorites(userAccount?.id, sessionId);

  return <>
    {favoritesError ? <Banner message="Error trying to load the favorites films, please try again" onClose={handleCloseFavoriteError}/> : null}
    <NavBar/>
    <PageContainer>
      <MoviesList movies={favoriteMovies} onShowMoreMovies={handleShowMoreFilms}/>
    </PageContainer>
  </>;
};
