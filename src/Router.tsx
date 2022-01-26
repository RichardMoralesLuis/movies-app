import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DiscoverMovies } from './pages/DiscoverMovies';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';

export const Router: FC = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/discover" element={<DiscoverMovies/>}/>
      <Route path="/search/:query" element={<SearchResults/>}/>
    </Routes>
  </BrowserRouter>;
};
