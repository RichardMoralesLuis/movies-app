import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Cast } from '../../api/cast/model';
import { CastCarrouselItem } from './CastCarrouselItem';

const Container = styled.div`
  padding: 22px;
  display: flex;
  flex: 1;
  gap: 18px;
  overflow-y: scroll;
`;

interface CastsCarrouselProps {
  casts: Cast[];
}

export const CastsCarrousel: FC<CastsCarrouselProps> = ({ casts = [] }) => {

  const castsToRender: Cast[] = casts.length > 10 ? casts.slice(0, 10) : casts;

  return <Container>
    {castsToRender.map(cast => <CastCarrouselItem cast={cast} key={cast.id}/>)}
  </Container>;
};
