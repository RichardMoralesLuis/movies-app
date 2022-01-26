import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchCasts } from '../hooks/search/useSearchCasts';
import styled from '@emotion/styled';
import { ResultsSections, SearchSections } from '../components/search/ResultsSections';
import { Sections } from '../components/search/Sections';
import { useSearchMovies } from '../hooks/search/useSearchMovies';
import { useSearchCompanies } from '../hooks/search/useSearchCompanies';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 22px;
  gap: 20px;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const SectionsName = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SearchResults: FC = () => {
  const { query }: any = useParams();
  const { movies, totalMovies, isSearchingMovies, handleShowMoreFilms } = useSearchMovies(query);
  const { casts, totalCasts, isSearchingCast, handleShowMoreCasts } = useSearchCasts(query);
  const { companies, totalCompanies, isSearchingCompanies, handleShowMoreCompanies } = useSearchCompanies(query);
  const [selectedSection, setSelectedSection] = useState<SearchSections>('Movies');

  const handleSelect = (section: SearchSections) => setSelectedSection(section);

  if (isSearchingMovies || isSearchingCast || isSearchingCompanies) {
    return <div>Searching...</div>;
  }

  return <Container>
    <SectionsName>
      <ResultsSections totalMovies={totalMovies} totalCasts={totalCasts} totalCompanies={totalCompanies} onSelect={handleSelect} selectedSection={selectedSection}/>
    </SectionsName>
    <SectionContainer>
      <Sections selectedSection={selectedSection} movies={movies} casts={casts} companies={companies}/>
    </SectionContainer>
  </Container>;
};
