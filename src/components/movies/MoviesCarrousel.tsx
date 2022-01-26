import React, { FC } from 'react';
import { MovieModel } from '../../api/movies/models';
import styled from '@emotion/styled';
import { Movie } from './Movie';

const Container = styled.div`
  padding: 22px;
  display: flex;
  gap: 18px;
  overflow-y: scroll;
`;

interface MoviesProps {
  movies: MovieModel[];
}

export const MoviesCarrousel: FC<MoviesProps> = ({ movies }) => {

  return <Container>
    {movies.map(movie => <Movie movie={movie} key={movie.id}/>)}
  </Container>;
};
