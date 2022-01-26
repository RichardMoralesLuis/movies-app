import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import styled from '@emotion/styled';
import { ResultsSections, SearchSections } from '../components/search/ResultsSections';
import { Sections } from '../components/search/Sections';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 22px;
  gap: 20px;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SectionsName = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SearchResults: FC = ({}) => {
  const { query }: any = useParams();
  const { isSearching, movies, casts, productionCompanies, handleShowMoreFilms, totalMovies } = useSearch(query);
  const [selectedSection, setSelectedSection] = useState<SearchSections>('Movies');

  const handleSelect = (section: SearchSections) => setSelectedSection(section);

  if (isSearching) {
    return <div>Searching...</div>;
  }

  return <Container>
    <SectionsName>
      <ResultsSections movies={totalMovies} casts={casts} productionCompanies={productionCompanies} onSelect={handleSelect} selectedSection={selectedSection}/>
    </SectionsName>
    <SectionContainer>
      <Sections selectedSection={selectedSection} movies={movies} casts={casts} productionCompanies={productionCompanies}/>
    </SectionContainer>
    {/*<div>Casts</div>*/}
    {/*{casts.map((cast: any) => <span key={cast.id}>{cast.name}<br/></span>)}*/}
    {/*<br/>*/}
    {/*<div>Production Companies</div>*/}
    {/*{productionCompanies.map((movie: any) => <span key={movie.id}>{movie.name}<br/></span>)}*/}
  </Container>;
};
