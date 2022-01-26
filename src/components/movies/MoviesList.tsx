import React, { FC } from 'react';
import { MovieModel } from '../../api/movies/models';
import styled from '@emotion/styled';
import { MovieItem } from './MovieItem';
import { List } from '@mui/material';

const Container = styled.div``;

interface MoviesProps {
  movies: MovieModel[];
}

export const MoviesList: FC<MoviesProps> = ({ movies }) => {

  return <Container>
    <List sx={{ width: '100%', padding: 0 }}>
      {movies.map(movie => <MovieItem movie={movie} key={movie.id}/>)}
    </List>
  </Container>;
};
