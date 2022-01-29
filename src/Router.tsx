import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DiscoverMovies } from './pages/discoverMovies/DiscoverMovies';
import { Home } from './pages/home/Home';
import { SearchResults } from './pages/search/SearchResults';
import { Login } from './pages/login/Login';
import { LoginSession } from './pages/login/LoginSession';
import { MovieDetails } from './pages/movieDetails/MovieDetails';
import { FavoriteMovies } from './pages/favoriteMovies/FavoriteMovies';

export const Router: FC = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/discover" element={<DiscoverMovies/>}/>
      <Route path="/search/:query" element={<SearchResults/>}/>
      <Route path="/login/validate/:token" element={<Login/>}/>
      <Route path="/login/session" element={<LoginSession/>}/>
      <Route path="/movie/:movieId" element={<MovieDetails/>}/>
      <Route path="/movie/favorites" element={<FavoriteMovies/>}/>
    </Routes>
  </BrowserRouter>;
};
