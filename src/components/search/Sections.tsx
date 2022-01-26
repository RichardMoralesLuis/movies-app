import React, { FC } from 'react';
import { SearchSections } from './ResultsSections';
import { MoviesList } from '../movies/MoviesList';
import { MovieModel } from '../../api/movies/models';

interface SectionsProps {
  selectedSection: SearchSections;
  movies: MovieModel[];
  casts: any;
  productionCompanies: any;
}

export const Sections: FC<SectionsProps> = ({ selectedSection, movies, casts, productionCompanies }) => {

  if (selectedSection === 'Movies') {
    return <MoviesList movies={movies}/>;
  }

  if (selectedSection === 'Casts') {
    return null;
  }

  if (selectedSection === 'Companies') {
    return null;
  }

  return null;
};
