import React, { FC } from 'react';
import { useFavorites } from '../../hooks/useFavorite';
import { useMainContext } from '../../context/Context';
import { NavBar } from '../../components/navbar/Navbar';
import { PageContainer } from '../../components/containers/PageContainer';
import { Banner } from '../../components/banner/Banner';
import { MORE_RESULTS_BUTTON_STYLE } from '../../components/movies/styles';
import { MovieItem } from '../../components/movies/MovieItem';
import { Button, List } from '@mui/material';

export const FAVORITE_LIST_STYLE = { width: '100%', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' };

export const FavoriteMovies: FC = () => {
  const { userAccount, sessionId } = useMainContext();
  const { favoriteMovies, handleShowMoreFilms, favoritesError, handleCloseFavoriteError } = useFavorites(userAccount?.id, sessionId);

  return <>
    {favoritesError ? <Banner message="Error trying to load the favorites films, please try again" onClose={handleCloseFavoriteError}/> : null}
    <NavBar/>
    <PageContainer>
      <List sx={FAVORITE_LIST_STYLE}>
        {favoriteMovies.map(movie => <MovieItem movie={movie} key={movie.id}/>)}
        <Button variant="contained" onClick={handleShowMoreFilms} color="primary" style={MORE_RESULTS_BUTTON_STYLE}>Show more movies</Button>
      </List>
    </PageContainer>
  </>;
};
