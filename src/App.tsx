import React, { useState } from 'react';
import './App.css';
import { Search } from './components/Search';
import { useSearchFilm } from './hooks/useSearchFilm';

function App() {

  const [nameToSearch, setNameToSearch] = useState('');
  const { isSearching, movies, casts, productionCompanies } = useSearchFilm(nameToSearch);

  const handleSearch = (movieName: string) => setNameToSearch(movieName);

  if (isSearching) {
    return <div>Searching films...</div>;
  }

  return (
    <>
      <Search onSearch={handleSearch}/>
      <br/>
      <div>Movies</div>
      {movies.map((movie: any) => <span key={movie.id}>{movie.original_title}<br/></span>)}
      <br/>
      <div>Casts</div>
      {casts.map((cast: any) => <span key={cast.id}>{cast.name}<br/></span>)}
      <br/>
      <div>Production Companies</div>
      {productionCompanies.map((movie: any) => <span key={movie.id}>{movie.name}<br/></span>)}
    </>

  );
}

export default App;
