import React, { FC } from 'react';
import { MovieModel } from '../../api/movies/models';
import { MovieItem } from './MovieItem';
import { Button, List } from '@mui/material';
import { SearchInformation } from '../../api/search/model';

interface MoviesProps {
  movies: MovieModel[];
  searchInformation: SearchInformation;
  onUpdateMovies: () => void;
}


export const MoviesList: FC<MoviesProps> = ({ movies, onUpdateMovies, searchInformation }) => {

  const handleShowMore = () => onUpdateMovies();

  return <List sx={{ width: '100%', padding: 0 }}>
    {movies.map(movie => <MovieItem movie={movie} key={movie.id}/>)}
    <Button variant="contained" onClick={handleShowMore} color="primary" style={{ width: '60%' }}>Show more movies</Button>
  </List>;
};
