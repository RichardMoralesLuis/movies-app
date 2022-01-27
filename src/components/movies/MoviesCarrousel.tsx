import React, { FC, useRef } from 'react';
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
  onUpdateMovies: () => void;
}

export const MoviesCarrousel: FC<MoviesProps> = ({ movies, onUpdateMovies }) => {
  const scrollRef = useRef<any>(null);

  const handleScroll = () => {
    if (scrollRef.current?.scrollWidth - scrollRef.current.scrollLeft === scrollRef.current?.clientWidth) {
      onUpdateMovies();
    }
  };

  return <Container ref={scrollRef} onScroll={handleScroll} >
    {movies.map(movie => <Movie movie={movie} key={movie.id}/>)}
  </Container>;
};
