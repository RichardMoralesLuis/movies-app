import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../api/API';
import { useMainContext } from '../context/Context';
import { PageContainer } from './PageContainer';
import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginSession: FC = () => {
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const context = useMainContext();

  useEffect(() => {
    const requestSession = async (requestTokenValidated: string) => {
      setIsLoadingSession(true);
      const { session_id } = await API.USER.session(requestTokenValidated);
      context.setSessionId(session_id);
      setIsLoadingSession(false);
    };


    const denied = query.get('denied');
    const requestTokenValidated = query.get('request_token');

    if (!denied) {
      requestSession(requestTokenValidated!).catch(console.error);
    }

  }, []);

  const handleGoHome = () => navigate('/');


  if (isLoadingSession) {
    return <PageContainer>Loading session...</PageContainer>;
  }

  return <PageContainer>
    <Container>
      <Typography component="span" fontWeight="bold" variant="h2" color="text.primary">Login with success🙌🏻</Typography>
      <Button onClick={handleGoHome} variant="contained" style={{ marginTop: 22 }}>Go Home🏠</Button>
    </Container>
  </PageContainer>;
};
