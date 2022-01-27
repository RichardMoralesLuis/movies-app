import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchCasts } from '../hooks/search/useSearchCasts';
import styled from '@emotion/styled';
import { ResultsSections, SearchSections } from '../components/search/ResultsSections';
import { useSearchMovies } from '../hooks/search/useSearchMovies';
import { Search } from '../components/filters/Search';
import { useSearchCompanies } from '../hooks/search/useSearchCompanies';
import { MoviesList } from '../components/movies/MoviesList';
import { CastList } from '../components/search/CastList';
import { CompaniesList } from '../components/search/CompaniesList';
import { PageContainer } from './PageContainer';

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
  const { movies, searchInformation: moviesSearchInformation, isSearchingMovies, handleShowMoreFilms } = useSearchMovies(searchValue);
  const { casts, totalCasts, isSearchingCast, handleShowMoreCasts } = useSearchCasts(searchValue);
  const { companies, totalCompanies, isSearchingCompanies, handleShowMoreCompanies } = useSearchCompanies(searchValue);

  const handleSelect = (section: SearchSections) => setSelectedSection(section);
  const handleSearch = (searchValue: string) => setSearchValue(searchValue);


  if (isSearchingMovies || isSearchingCast || isSearchingCompanies) {
    return <div>Searching...</div>;
  }

  const searchSections = {
    'Movies': <MoviesList movies={movies} onUpdateMovies={handleShowMoreFilms} searchInformation={moviesSearchInformation}/>,
    'Casts': <CastList casts={casts}/>,
    'Companies': <CompaniesList companiesList={companies}/>
  };

  const sectionToShow = searchSections[selectedSection];

  return <>
    <Search onSearch={handleSearch} defaultValue={searchValue}/>
    <PageContainer>
      <SectionsName>
        <ResultsSections totalMovies={moviesSearchInformation.totalResults} totalCasts={totalCasts} totalCompanies={totalCompanies} onSelect={handleSelect} selectedSection={selectedSection}/>
      </SectionsName>
      <SectionContainer>
        {sectionToShow}
      </SectionContainer>
    </PageContainer>
  </>;
};
