import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DiscoverMovies } from './pages/DiscoverMovies';
import { Home } from './pages/Home';

interface RouterProps {
}

export const Router: FC<RouterProps> = ({}) => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/discover" element={<DiscoverMovies/>}/>
    </Routes>
  </BrowserRouter>;
};
