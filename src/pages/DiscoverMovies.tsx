import React, { FC } from 'react';
import { useLoadGenres } from '../hooks/useLoadGenres';

export const DiscoverMovies: FC = () => {
  const { genres, isLoadingGenres } = useLoadGenres();

  if (isLoadingGenres) {
    return <div>Loading...</div>;
  }

  return <div>
    {genres.map((genre: any) => genre.name)}
  </div>;
};
