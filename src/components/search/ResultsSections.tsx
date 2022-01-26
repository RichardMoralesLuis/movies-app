import styled from '@emotion/styled';
import React, { FC } from 'react';
import { List } from '@mui/material';
import { SearchResultSections } from './SearchResultSections';
import { SearchMovieResult } from '../../api/search/model';

const Container = styled.div`
  width: 260px;
  height: 400px;
  aspect-ratio: 1;
  border-radius: 18px;
  border: 1px solid rgb(227, 227, 227);
`;

export type SearchSections = 'Movies' | 'Casts' | 'Companies';

interface ResultSections {
  casts: any;
  productionCompanies: any;
  movies: number;
  onSelect: (section: SearchSections) => void;
  selectedSection: SearchSections;
}

export const ResultsSections: FC<ResultSections> = ({ movies, casts, productionCompanies, onSelect, selectedSection }) => {
  const numberOfCasts = casts.length;
  const numberOfCompanies = productionCompanies.length;

  const handleSelect = (section: SearchSections) => onSelect(section);

  return <Container>
    <List sx={{ width: '100%', padding: '8px 0' }}>
      <SearchResultSections section="Movies" numberOfResults={movies} selectedSection={selectedSection} onSelect={handleSelect}/>
      <SearchResultSections section="Casts" numberOfResults={numberOfCasts} selectedSection={selectedSection} onSelect={handleSelect}/>
      <SearchResultSections section="Companies" numberOfResults={numberOfCompanies} selectedSection={selectedSection} onSelect={handleSelect}/>
    </List>
  </Container>;
};
