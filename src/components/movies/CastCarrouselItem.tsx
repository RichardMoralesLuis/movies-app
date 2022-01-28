import React, { FC } from 'react';
import { CastAPI } from '../../api/cast/model';
import { DEFAULT_IMAGE_PATH } from './Movie';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Container = styled.div`
  width: 100%;
`;

const Image = styled.img`
  max-height: 150px;
  margin-right: 18px;
`;

interface CastCarrouselItemProps {
  cast: CastAPI;
}

export const CastCarrouselItem: FC<CastCarrouselItemProps> = ({ cast }) => {
  const imagePath = `${process.env.REACT_APP_MOVIEDB_IMAGE_URL}${cast.profile_path}`;
  const source = cast.profile_path ? imagePath : DEFAULT_IMAGE_PATH;

  return <Container>
    <Image src={source} alt="cast-profile"/>
    <Typography sx={{ boxSizing: 'border-box' }} component="p" fontWeight="bold" variant="body1" color="text.primary">{cast.name}</Typography>
  </Container>;
};
