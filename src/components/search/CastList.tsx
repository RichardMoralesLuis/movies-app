import React, { FC } from 'react';
import { List } from '@mui/material';
import { Cast } from '../../api/cast/model';
import { CastItem } from './Cast';

interface CastListProps {
  casts: Cast[];
}

export const CastList: FC<CastListProps> = ({ casts }) => {

  return <div>
    <List sx={{ width: '100%', padding: 0 }}>
      {casts.map(cast => <CastItem cast={cast} key={cast.id}/>)}
    </List>
  </div>;
};
