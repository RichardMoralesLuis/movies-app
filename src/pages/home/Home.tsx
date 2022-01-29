import React, { FC } from 'react';
import { Search } from '../../components/filters/Search';
import { useNavigate } from 'react-router-dom';
import { usePopularMovies } from '../../hooks/usePopularMovies';
import { MoviesCarrousel } from '../../components/movies/MoviesCarrousel';
import styled from '@emotion/styled';
import { NavBar } from '../../components/navbar/Navbar';
import { Typography } from '@mui/material';
import { useNowPlayingMovies } from '../../hooks/useNowPlayingMovies';
import { Banner } from '../../components/banner/Banner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Information = styled.div`
  width: 75%;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-self: center;
  margin: 20px;
`;

const MoviesContainer = styled.div`
  width: 75%;
  flex-direction: column;
  align-self: center;
  margin: 20px;
`;

export const Home: FC = () => {
  const { popularMovies, handleShowMorePopularFilms, isLoading: isLoadingPopularMovies, popularMoviesError, handleClosePopularMoviesError } = usePopularMovies();
  const { nowPlayingMovies, handleShowMoreNowPlayingFilms, isLoading: isLoadingNowPlayingMovies, nowPlayingMoviesError, handleCloseNowPlayingMoviesError } = useNowPlayingMovies();
  const navigate = useNavigate();

  const handleSearch = (movieName: string) => navigate(`/search/${movieName}`);
  const handleClose = () => {
    handleClosePopularMoviesError();
    handleCloseNowPlayingMoviesError();
  };

  if (isLoadingPopularMovies || isLoadingNowPlayingMovies) {
    return <div>Searching films...</div>;
  }

  const error = popularMoviesError || nowPlayingMoviesError;

  return <Container>
    {error ? <Banner message="Error loading films, please refresh the page" onClose={handleClose}/> : null}
    <NavBar/>
    <Information>
      <Typography component="span" fontWeight="bold" variant="h2">🐒 Welcome to the Movies App 🐒</Typography>
      <Typography component="span" variant="h4" color="text.secondary">Feel free to find the best film for today!</Typography>
    </Information>
    <Search onSearch={handleSearch}/>
    {popularMovies?.length ? <MoviesContainer>
      <Typography component="span" fontWeight="bold" variant="body1" color="text.primary">Popular movies</Typography>
      <MoviesCarrousel movies={popularMovies} onUpdateMovies={handleShowMorePopularFilms}/>
    </MoviesContainer> : null}
    {nowPlayingMovies?.length ? <MoviesContainer>
      <Typography component="span" fontWeight="bold" variant="body1" color="text.primary">Now playing</Typography>
      <MoviesCarrousel movies={nowPlayingMovies} onUpdateMovies={handleShowMoreNowPlayingFilms}/>
    </MoviesContainer> : null}
  </Container>;
};
