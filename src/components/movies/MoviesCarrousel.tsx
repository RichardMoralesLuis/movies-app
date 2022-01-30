import React, { FC, useRef } from 'react';
import { SimpleMovieApiModel } from '../../api/movies/models';
import styled from '@emotion/styled';
import { MovieCarrouselItem } from './MovieCarrouselItem';

const Container = styled.div`
  padding: 22px;
  display: flex;
  flex: 1;
  gap: 18px;
  overflow-y: scroll;
`;

interface MoviesProps {
  movies: SimpleMovieApiModel[];
  onUpdateMovies: () => void;
}

export const MoviesCarrousel: FC<MoviesProps> = ({ movies, onUpdateMovies }) => {
  const scrollRef = useRef<any>(null);

  const handleScroll = () => {
    const isScrollFinished = scrollRef.current?.scrollWidth - scrollRef.current.scrollLeft === scrollRef.current?.clientWidth;
    if (isScrollFinished) {
      onUpdateMovies();
    }
  };

  return <Container ref={scrollRef} onScroll={handleScroll}>
    {movies.map(movie => <MovieCarrouselItem movie={movie} key={movie.id}/>)}
  </Container>;
};
