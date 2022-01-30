import React, { FC } from 'react';
import { Button, List } from '@mui/material';
import { Cast } from '../../api/cast/model';
import { CastItem } from './CastItem';
import { LIST_STYLE, MORE_RESULTS_BUTTON_STYLE } from '../movies/styles';
import { EmptyResults } from './EmptyResults';

interface CastListProps {
  casts: Cast[];
  onShowMoreCasts: () => void;
}

export const CastList: FC<CastListProps> = ({ casts, onShowMoreCasts }) => {

  if (!casts.length) {
    return <EmptyResults/>;
  }

  return <List sx={LIST_STYLE}>
    {casts.map(cast => <CastItem cast={cast} key={cast.id}/>)}
    <Button variant="contained" onClick={onShowMoreCasts} color="primary" style={MORE_RESULTS_BUTTON_STYLE}>Show more casts</Button>
  </List>;
};
