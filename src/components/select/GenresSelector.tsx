import React, { FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface SelectProps {
  genres: any;
  onSelectGenres: (genres: string[]) => void;
  selectedGenres: any;
}

const MenuProps = {
  PaperProps: {
    style: {
      width: 300
    }
  }
};

export const GenresSelector: FC<SelectProps> = ({ genres = [], onSelectGenres, selectedGenres = [] }) => {
  const handleSelectGenres = (event: any) => {
    const { target: { value } } = event;
    const genres = typeof value === 'string' ? value.split(',') : value;
    onSelectGenres(genres);
  };

  return <FormControl sx={{ width: 300 }}>
    <InputLabel>Genres</InputLabel>
    <Select
      autoWidth={false}
      multiple
      onChange={handleSelectGenres}
      value={selectedGenres}
      MenuProps={MenuProps}>
      {genres.map((genre: any) => <MenuItem value={genre.id} key={genre.id}>{genre.name}</MenuItem>)}
    </Select>
  </FormControl>;
};
