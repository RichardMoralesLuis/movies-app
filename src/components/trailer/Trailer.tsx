import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { TrailerVideo } from './TrailerVideo';
import { MovieDetailModel } from '../../api/movies/models';

const Container = styled.div`
  box-sizing: border-box;
  background: rgba(3, 37, 65, 1);
  border-radius: 50%;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 12px;
`;

interface TrailerProps {
  movie?: MovieDetailModel;
}

export const Trailer: FC<TrailerProps> = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const handleShowTrailer = () => setShowTrailer(true);
  const handleCloseTrailer = () => setShowTrailer(false);

  if (movie?.video) {
    return null;
  }

  if (showTrailer) {
    return <TrailerVideo movieId={movie!.id} onClose={handleCloseTrailer}/>;
  }

  return <Container>
    <OndemandVideoIcon onClick={handleShowTrailer}/>
  </Container>;
};
