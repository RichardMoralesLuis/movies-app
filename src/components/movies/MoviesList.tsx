import React, { FC } from 'react';
import { SimpleMovieApiModel } from '../../api/movies/models';
import { MovieItem } from './MovieItem';
import { Button, List } from '@mui/material';
import { LIST_STYLE, MORE_RESULTS_BUTTON_STYLE } from './styles';
import { EmptyResults } from '../search/EmptyResults';

interface MoviesProps {
  movies: SimpleMovieApiModel[];
  onShowMoreMovies: () => void;
}

export const MoviesList: FC<MoviesProps> = ({ movies, onShowMoreMovies }) => {

  const handleShowMore = () => onShowMoreMovies();

  if (!movies.length) {
    return <EmptyResults/>;
  }

  return <List sx={LIST_STYLE}>
    {movies.map(movie => <MovieItem movie={movie} key={movie.id}/>)}
    <Button variant="contained" onClick={handleShowMore} color="primary" style={MORE_RESULTS_BUTTON_STYLE}>Show more movies</Button>
  </List>;
};
