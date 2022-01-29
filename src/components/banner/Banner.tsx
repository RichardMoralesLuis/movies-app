import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

const Container = styled.div`
  width: fit-content;
  padding: 14px 14px;
  position: absolute;
  border-radius: 18px;
  top: 5%;
  left: 40%;
  right: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: red;
`;

const AcrossContainer = styled.div`
  width: 24px;
  color: #FFF;
  cursor: pointer;
  margin-left: 36px;
`;

interface BannerProps {
  message: string;
  onClose: () => void;
}

export const Banner: FC<BannerProps> = ({ message, onClose }) => {

  return <Container>
    <Typography sx={{ color: '#FFF' }} component="span" fontWeight="bold" variant="body1" color="text.primary">{message}</Typography>
    <AcrossContainer onClick={onClose}>
      <Close color="inherit"/>
    </AcrossContainer>
  </Container>;
};
