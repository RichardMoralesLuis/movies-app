import React, { FC } from 'react';
import { MovieModel } from '../../api/movies/models';
import styled from '@emotion/styled';
import { MOVIE_POSTER_RATIO } from '../../api/movies/utils';

const Container = styled.div`
  flex: 1;
  border-radius: 18px;
`;

const Image = styled.img`
  aspect-ratio: ${MOVIE_POSTER_RATIO};
  border-radius: 18px;
  box-shadow: 0 0 15px -2px #575456;
`;

interface MovieProps {
  movie: MovieModel;
}

export const Movie: FC<MovieProps> = ({ movie }) => {
  const url = `${process.env.REACT_APP_MOVIEDB_IMAGE_URL}${movie.posterPath}`;


  const handlePress = () => console.log('movie');

  return <Container onClick={handlePress}>
    <Image src={url} alt="film-poster"/>
  </Container>;
};
