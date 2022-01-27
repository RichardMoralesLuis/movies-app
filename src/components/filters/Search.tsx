import React, { ChangeEvent, FC, useState } from 'react';
import { TextField } from '@mui/material';
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
  const handleKeyPress = (event: any) => {
    const isSearchDisable = Boolean(!searchValue || searchValue?.length < 3);

    if (event.key === 'Enter' && !isSearchDisable) {
      onSearch(searchValue);
    }
  };

  return <Container>
    <TextField name="search" onChange={handleChangeValue} onKeyPress={handleKeyPress} placeholder="Search your film" size={'medium'} style={{ width: '100%', margin: '20px 10px 10px 20px', borderRadius: '20px' }} defaultValue={searchValue}/>
  </Container>;
};
