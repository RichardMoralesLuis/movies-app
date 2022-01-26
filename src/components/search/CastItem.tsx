import React, { FC } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { CastModel } from '../../api/cast/model';
import { DEFAULT_IMAGE_PATH } from '../movies/Movie';
import { itemListStyle } from './utils';

const Image = styled.img`
  max-height: 150px;
  margin-right: 18px;
`;

interface MovieResultProps {
  cast: CastModel;
}

export const CastItem: FC<MovieResultProps> = ({ cast }) => {
  const imagePath = `${process.env.REACT_APP_MOVIEDB_IMAGE_URL}${cast.profilePath}`;
  const source = cast.profilePath ? imagePath : DEFAULT_IMAGE_PATH;

  return <ListItem alignItems="flex-start" style={itemListStyle}>
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
          {cast.name}
        </Typography>
      </>}
    />
  </ListItem>;
};
