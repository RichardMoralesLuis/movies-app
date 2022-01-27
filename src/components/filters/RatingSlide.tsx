import React, { FC } from 'react';
import { Box, Slider } from '@mui/material';

interface RatingSlideProps {
  value?: number[];
  onChange: (value: number[]) => void;
}

export const RatingSlide: FC<RatingSlideProps> = ({ value = [0, 10], onChange }) => {
  const handleChange = (event: Event, newValue: number | number[]) => onChange(newValue as number[]);

  return <Box sx={{ width: 300 }}>
    <Slider
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      max={10}
      min={0}
    />
  </Box>;
};
