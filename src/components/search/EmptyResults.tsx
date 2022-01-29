import React from 'react';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  margin-left: 20px;
`;
export const EmptyResults = () => {

  return <Container>
    <Typography component="span" fontWeight="bold" variant="body1" color="text.primary">No results for your search</Typography>
  </Container>;
};
