import React, { FC } from 'react';
import { SearchSections } from './ResultsSections';
import { MoviesList } from '../movies/MoviesList';
import { MovieModel } from '../../api/movies/models';
import { CastList } from './CastList';
import { CompaniesList } from './CompaniesList';
import { CastModel } from '../../api/cast/model';
import { CompanyModel } from '../../api/companies/models';

interface SectionsProps {
  selectedSection: SearchSections;
  movies: MovieModel[];
  casts: CastModel[];
  companies: CompanyModel[];
}

export const Sections: FC<SectionsProps> = ({ selectedSection, movies, casts, companies }) => {

  if (selectedSection === 'Movies') {
    return <MoviesList movies={movies}/>;
  }

  if (selectedSection === 'Casts') {
    return <CastList casts={casts}/>;
  }

  if (selectedSection === 'Companies') {
    return <CompaniesList companiesList={companies}/>;
  }

  return null;
};
