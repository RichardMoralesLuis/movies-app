import React, { FC } from 'react';
import { useLoadTrailer } from '../../hooks/useLoadTrailer';
import { Modal } from '@mui/material';
import styled from '@emotion/styled';

const YOUTUBE_URL = 'https://www.youtube.com/embed/';

const Iframe = styled.iframe`
  width: 60%;
  height: 60%;
  display: flex;
  justify-self: center;
  align-self: center;
`;

interface TrailerVideoProps {
  movieId: number;
  onClose: () => void;
}

export const TrailerVideo: FC<TrailerVideoProps> = ({ movieId, onClose }) => {
  const { trailerInfo } = useLoadTrailer(movieId);

  const source = `${YOUTUBE_URL}${trailerInfo.key}`;
  return <Modal open={true} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onClose}>
    <Iframe src={source}/>
  </Modal>;
};
