import React, { FC } from 'react';
import { Button, List } from '@mui/material';
import { CompanyModel } from '../../api/companies/models';
import { CompanyItem } from './CompanyItem';
import { LIST_STYLE, MORE_RESULTS_BUTTON_STYLE } from '../movies/styles';
import { EmptyResults } from './EmptyResults';

interface CastListProps {
  companiesList: CompanyModel[];
  onShowMoreCompanies: () => void;
}

export const CompaniesList: FC<CastListProps> = ({ companiesList, onShowMoreCompanies }) => {

  if (!companiesList.length) {
    return <EmptyResults/>;
  }

  return <List sx={LIST_STYLE}>
    {companiesList.map(company => <CompanyItem company={company} key={company.id}/>)}
    <Button variant="contained" onClick={onShowMoreCompanies} color="primary" style={MORE_RESULTS_BUTTON_STYLE}>Show more companies</Button>
  </List>;
};
