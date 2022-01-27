import React, { FC } from 'react';
import { FormControl, Input } from '@mui/material';

interface DatePickerProps {
  onChange: (date: string) => void;
  date?: string;
}

export const FilterDatePicker: FC<DatePickerProps> = ({ onChange, date }) => {
  const [value, setValue] = React.useState<string>();

  const handleChange = (event: any) => {
    const { value } = event.target;
    setValue(value);
    onChange(value);
  };

  return <FormControl>
    <Input type="date" onChange={handleChange} placeholder="Release date" value={value}/>
  </FormControl>;
};
