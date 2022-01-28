import React, { FC, useRef } from 'react';
import { SimpleMovieApiModel } from '../../api/movies/models';
import styled from '@emotion/styled';
import { Movie } from './Movie';

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
  isMoreEnable: boolean;
}

export const MoviesCarrousel: FC<MoviesProps> = ({ movies, onUpdateMovies, isMoreEnable }) => {
  const scrollRef = useRef<any>(null);

  const handleScroll = () => {
    const isScrollFinished = scrollRef.current?.scrollWidth - scrollRef.current.scrollLeft === scrollRef.current?.clientWidth;
    if ((isScrollFinished) && (isMoreEnable)) {
      onUpdateMovies();
    }
  };

  return <Container ref={scrollRef} onScroll={handleScroll}>
    {movies.map(movie => <Movie movie={movie} key={movie.id}/>)}
  </Container>;
};
