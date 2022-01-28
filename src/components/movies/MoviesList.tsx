import React, { FC } from 'react';
import { SimpleMovieApiModel } from '../../api/movies/models';
import { MovieItem } from './MovieItem';
import { Button, List } from '@mui/material';
import { SearchInformation } from '../../api/search/model';
import { LIST_STYLE, MORE_RESULTS_BUTTON_STYLE } from './styles';

interface MoviesProps {
  movies: SimpleMovieApiModel[];
  searchInformation: SearchInformation;
  onShowMoreMovies: () => void;
}

export const MoviesList: FC<MoviesProps> = ({ movies, onShowMoreMovies, searchInformation }) => {

  const handleShowMore = () => onShowMoreMovies();

  return <List sx={LIST_STYLE}>
    {movies.map(movie => <MovieItem movie={movie} key={movie.id}/>)}
    <Button variant="contained" onClick={handleShowMore} color="primary" style={MORE_RESULTS_BUTTON_STYLE}>Show more movies</Button>
  </List>;
};
