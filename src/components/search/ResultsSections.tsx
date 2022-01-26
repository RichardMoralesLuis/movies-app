import styled from '@emotion/styled';
import React, { FC } from 'react';
import { List } from '@mui/material';
import { SearchResultSections } from './SearchResultSections';

const Container = styled.div`
  width: 260px;
  height: 400px;
  aspect-ratio: 1;
  border-radius: 18px;
  border: 1px solid rgb(227, 227, 227);
`;

export type SearchSections = 'Movies' | 'Casts' | 'Companies';

interface ResultSections {
  totalCasts: number;
  totalCompanies: any;
  totalMovies: number;
  onSelect: (section: SearchSections) => void;
  selectedSection: SearchSections;
}

export const ResultsSections: FC<ResultSections> = ({ totalMovies, totalCasts, totalCompanies, onSelect, selectedSection }) => {
  const handleSelect = (section: SearchSections) => onSelect(section);

  return <Container>
    <List sx={{ width: '100%', padding: '8px 0' }}>
      <SearchResultSections section="Movies" numberOfResults={totalMovies} selectedSection={selectedSection} onSelect={handleSelect}/>
      <SearchResultSections section="Casts" numberOfResults={totalCasts} selectedSection={selectedSection} onSelect={handleSelect}/>
      <SearchResultSections section="Companies" numberOfResults={totalCompanies} selectedSection={selectedSection} onSelect={handleSelect}/>
    </List>
  </Container>;
};
