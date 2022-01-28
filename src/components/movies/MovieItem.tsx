import React, { FC } from 'react';
import { SimpleMovieApiModel } from '../../api/movies/models';
import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { DEFAULT_IMAGE_PATH } from './Movie';
import styled from '@emotion/styled';
import { itemListStyle } from '../search/utils';
import { useNavigate } from 'react-router-dom';

const Image = styled.img`
  max-height: 150px;
  margin-right: 18px;
`;

interface MovieResultProps {
  movie: SimpleMovieApiModel;
}

export const MovieItem: FC<MovieResultProps> = ({ movie }) => {
  const navigate = useNavigate();
  const imagePath = `${process.env.REACT_APP_MOVIEDB_IMAGE_URL}${movie.poster_path}`;
  const source = movie.poster_path ? imagePath : DEFAULT_IMAGE_PATH;

  const handleGotoDetails = () => navigate(`/movie/${movie.id}`);

  return <ListItem alignItems="flex-start" style={itemListStyle} onClick={handleGotoDetails}>
    <ListItemAvatar>
      <Image src={source}/>
    </ListItemAvatar>
    <ListItemText
      primary={<>
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          fontWeight="bold"
          variant="body1"
          color="text.primary"
        >
          {movie.title}
        </Typography>
      </>}
      secondary={
        <>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {movie.overview}
          </Typography>
        </>
      }
    />
  </ListItem>;
};
