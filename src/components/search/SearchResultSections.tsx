import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { SearchSections } from './ResultsSections';

const Container = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${props => props.background};
  cursor: pointer;
`;

interface SearchResultsSections {
  numberOfResults: number;
  section: SearchSections;
  selectedSection: SearchSections;
  onSelect: (section: SearchSections) => void;
}

export const SearchResultSections: FC<SearchResultsSections> = ({ numberOfResults, section, selectedSection, onSelect }) => {

  const background = section === selectedSection ? 'rgba(0,0,0,0.08)' : undefined;

  const handleSelect = () => onSelect(section);
  return <Container background={background} onClick={handleSelect}>
    <Typography sx={{ display: 'inline' }} component="span" fontWeight="bold" variant="body1" color="text.primary">{section}</Typography>
    <Typography sx={{ display: 'inline' }} component="span" fontWeight="bold" variant="body1" color="text.primary">{numberOfResults}</Typography>
  </Container>;
};
