import React, { FC } from 'react';
import { Search } from '../components/filters/Search';
import { useNavigate } from 'react-router-dom';
import { usePopularFilms } from '../hooks/usePopularFilms';
import { MoviesCarrousel } from '../components/movies/MoviesCarrousel';
import styled from '@emotion/styled';
import { NavBar } from '../components/navbar/Navbar';

const Container = styled.div`
  width: 100%;
`;

export const Home: FC = () => {
  const { popularMovies, handleShowMorePopularFilms, isLoading, isMoreEnable } = usePopularFilms();
  const navigate = useNavigate();

  const handleSearch = (movieName: string) => navigate(`/search/${movieName}`);

  if (isLoading) {
    return <div>Searching films...</div>;
  }

  return <Container>
    <NavBar/>
    <Search onSearch={handleSearch}/>
    <MoviesCarrousel movies={popularMovies}/>
    {/*<button onClick={handleShowMorePopularFilms}>Show more films</button>*/}
  </Container>;
};
