import React, { FC } from 'react';
import { MovieModel } from '../../api/movies/models';
import styled from '@emotion/styled';
import { MOVIE_POSTER_RATIO } from '../../api/movies/utils';

export const DEFAULT_IMAGE_PATH = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

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
  const imagePath = `${process.env.REACT_APP_MOVIEDB_IMAGE_URL}${movie.posterPath}`;
  const source = movie.posterPath ? imagePath : DEFAULT_IMAGE_PATH;


  const handlePress = () => console.log('movie');

  return <Container onClick={handlePress}>
    <Image src={source} alt="film-poster"/>
  </Container>;
};
