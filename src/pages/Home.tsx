import React, { FC, useState } from 'react';
import { Search } from '../components/Search';
import { useSearchFilm } from '../hooks/useSearchFilm';
import { useNavigate } from 'react-router-dom';

export const Home: FC = () => {
  const [nameToSearch, setNameToSearch] = useState('');
  const { isSearching, movies, casts, productionCompanies } = useSearchFilm(nameToSearch);
  const navigate = useNavigate();

  const handleSearch = (movieName: string) => setNameToSearch(movieName);
  const handleGoToDiscover = () => navigate('/discover');

  if (isSearching) {
    return <div>Searching films...</div>;
  }

  return <>
    <Search onSearch={handleSearch}/>
    <button onClick={handleGoToDiscover}>Go to Discover</button>
    <br/>
    <div>Movies</div>
    {movies.map((movie: any) => <span key={movie.id}>{movie.original_title}<br/></span>)}
    <br/>
    <div>Casts</div>
    {casts.map((cast: any) => <span key={cast.id}>{cast.name}<br/></span>)}
    <br/>
    <div>Production Companies</div>
    {productionCompanies.map((movie: any) => <span key={movie.id}>{movie.name}<br/></span>)}
  </>;
};