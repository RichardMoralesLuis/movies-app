import React, { FC } from 'react';
import { MovieModel } from '../../api/movies/models';
import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { DEFAULT_IMAGE_PATH } from './Movie';
import styled from '@emotion/styled';

const Image = styled.img`
  max-height: 150px;
  margin-right: 18px;
`;

interface MovieResultProps {
  movie: MovieModel;
}

const itemStyle = {
  border: '1px solid rgba(227,227,227)',
  borderRadius: '8px',
  maxWidth: '70%',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 12px 12px 12px',
  boxShadow: '0 2px 8px rgb(0 0 0 / 10%)'
};

export const MovieResult: FC<MovieResultProps> = ({ movie }) => {
  const imagePath = `${process.env.REACT_APP_MOVIEDB_IMAGE_URL}${movie.posterPath}`;
  const source = movie.posterPath ? imagePath : DEFAULT_IMAGE_PATH;

  return <ListItem alignItems="flex-start" style={itemStyle}>
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
