import React, { ChangeEvent, FC, useState } from 'react';
import { Button, TextField } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface SearchProps {
  onSearch: (value: string) => void;
  defaultValue?: string;
}

export const Search: FC<SearchProps> = ({ onSearch, defaultValue }) => {
  const [searchValue, setSearchValue] = useState<string>(defaultValue ?? '');

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);

  const handleSearch = () => onSearch(searchValue!);
  const isSearchDisable = Boolean(!searchValue || searchValue?.length < 3);

  return <Container>
    <TextField name="search" onChange={handleChangeValue} placeholder="Search your film" size={'medium'} style={{ width: '50%', margin: '20px', borderRadius: '20px' }}/>
    <Button name="search button" variant="contained" onClick={handleSearch} color="primary" disabled={isSearchDisable}>Search</Button>
  </Container>;
};
