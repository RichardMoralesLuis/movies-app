import React, { FC } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { itemListStyle } from './utils';
import { CompanyModel } from '../../api/companies/models';
import styled from '@emotion/styled';

const Image = styled.img`
  max-height: 150px;
  margin-right: 18px;
`;

interface CompanyItemProps {
  company: CompanyModel;
}

export const CompanyItem: FC<CompanyItemProps> = ({ company }) => {
  const imagePath = `${process.env.REACT_APP_MOVIEDB_IMAGE_URL}${company.logoPath}`;

  return <ListItem alignItems="flex-start" style={itemListStyle}>
    {company.logoPath ?
      <ListItemAvatar>
        <Image src={imagePath}/>
      </ListItemAvatar>
      : null}
    <ListItemText
      primary={<>
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          fontWeight="bold"
          variant="body1"
          color="text.primary"
        >
          {company.name}
        </Typography>
      </>}
    />
  </ListItem>;
};
