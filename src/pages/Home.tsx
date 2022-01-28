import React, { FC } from 'react';
import { Search } from '../components/filters/Search';
import { useNavigate } from 'react-router-dom';
import { usePopularFilms } from '../hooks/usePopularFilms';
import { MoviesCarrousel } from '../components/movies/MoviesCarrousel';
import styled from '@emotion/styled';
import { NavBar } from '../components/navbar/Navbar';
import { Typography } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MoviesContainer = styled.div`
  width: 75%;
  flex-direction: column;
  align-self: center;
`;

export const Home: FC = () => {
  const { popularMovies, handleShowMorePopularFilms, isLoading } = usePopularFilms();
  const navigate = useNavigate();

  const handleSearch = (movieName: string) => navigate(`/search/${movieName}`);

  if (isLoading) {
    return <div>Searching films...</div>;
  }

  return <Container>
    <NavBar/>
    <Search onSearch={handleSearch}/>
    <MoviesContainer>
      <Typography component="span" fontWeight="bold" variant="body1" color="text.primary">Popular movies</Typography>
      <MoviesCarrousel movies={popularMovies} onUpdateMovies={handleShowMorePopularFilms}/>
    </MoviesContainer>
  </Container>;
};
