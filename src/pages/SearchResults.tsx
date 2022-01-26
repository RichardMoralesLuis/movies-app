import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';

interface SearchResultsProps {
}

export const SearchResults: FC<SearchResultsProps> = ({}) => {
  const { query }: any = useParams();
  const { isSearching, movies, casts, productionCompanies, handleShowMoreFilms } = useSearch(query);

  if (isSearching) {
    return <div>Searching...</div>;
  }

  return <>
    {movies.map((movie: any) => <span key={movie.id}>{movie.original_title}<br/></span>)}
    <br/>
    <div>Casts</div>
    {casts.map((cast: any) => <span key={cast.id}>{cast.name}<br/></span>)}
    <br/>
    <div>Production Companies</div>
    {productionCompanies.map((movie: any) => <span key={movie.id}>{movie.name}<br/></span>)}
  </>;
};
