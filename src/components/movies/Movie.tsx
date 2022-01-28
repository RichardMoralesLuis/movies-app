import React, { FC } from 'react';
import { SimpleMovieApiModel } from '../../api/movies/models';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

export const DEFAULT_IMAGE_PATH = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';

const Container = styled.div`
  flex: 1;
  border-radius: 18px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 200px;
  height: 290px;
  border-radius: 18px;
  box-shadow: 0 0 15px -2px #575456;
`;

interface MovieProps {
  movie: SimpleMovieApiModel;
}

export const Movie: FC<MovieProps> = ({ movie }) => {
  const navigate = useNavigate();
  const imagePath = `${process.env.REACT_APP_MOVIEDB_IMAGE_URL}${movie.poster_path}`;
  const source = movie.poster_path ? imagePath : DEFAULT_IMAGE_PATH;


  const handlePress = () => navigate(`/movie/${movie.id}`);

  return <Container onClick={handlePress}>
    <Image src={source} alt="film-poster"/>
  </Container>;
};
