import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchCasts } from '../hooks/search/useSearchCasts';
import styled from '@emotion/styled';
import { ResultsSections, SearchSections } from '../components/search/ResultsSections';
import { Sections } from '../components/search/Sections';
import { useSearchMovies } from '../hooks/search/useSearchMovies';
import { Search } from '../components/filters/Search';
import { useSearchCompanies } from '../hooks/search/useSearchCompanies';
import { NavBar } from '../components/navbar/Navbar';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 22px;
  gap: 20px;
`;

const SectionsName = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;


export const SearchResults: FC = () => {
  const { query }: any = useParams();
  const [searchValue, setSearchValue] = useState(query);
  const [selectedSection, setSelectedSection] = useState<SearchSections>('Movies');
  const { movies, totalMovies, isSearchingMovies, handleShowMoreFilms } = useSearchMovies(searchValue);
  const { casts, totalCasts, isSearchingCast, handleShowMoreCasts } = useSearchCasts(searchValue);
  const { companies, totalCompanies, isSearchingCompanies, handleShowMoreCompanies } = useSearchCompanies(searchValue);

  const handleSelect = (section: SearchSections) => setSelectedSection(section);
  const handleSearch = (searchValue: string) => setSearchValue(searchValue);

  if (isSearchingMovies || isSearchingCast || isSearchingCompanies) {
    return <div>Searching...</div>;
  }

  return <>
    <NavBar/>
    <Search onSearch={handleSearch} defaultValue={searchValue}/>
    <Container>
      <SectionsName>
        <ResultsSections totalMovies={totalMovies} totalCasts={totalCasts} totalCompanies={totalCompanies} onSelect={handleSelect} selectedSection={selectedSection}/>
      </SectionsName>
      <SectionContainer>
        <Sections selectedSection={selectedSection} movies={movies} casts={casts} companies={companies}/>
      </SectionContainer>
    </Container>
  </>;
};
