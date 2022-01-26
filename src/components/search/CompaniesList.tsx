import React, { FC } from 'react';
import { List } from '@mui/material';
import { CompanyModel } from '../../api/companies/models';
import { CompanyItem } from './CompanyItem';

interface CastListProps {
  companiesList: CompanyModel[];
}

export const CompaniesList: FC<CastListProps> = ({ companiesList }) => {

  return <List sx={{ width: '100%', padding: 0 }}>
    {companiesList.map(company => <CompanyItem company={company} key={company.id}/>)}
  </List>;
};
