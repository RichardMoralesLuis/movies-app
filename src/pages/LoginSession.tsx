import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../api/API';
import { useMainContext } from '../context/Context';
import { PageContainer } from '../components/containers/PageContainer';
import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginSession: FC = () => {
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { setAccount } = useMainContext();

  useEffect(() => {
    const requestSession = async () => {
      const query = new URLSearchParams(location.search);
      const denied = query.get('denied');
      const requestTokenValidated = query.get('request_token');

      if (!denied) {
        setIsLoadingSession(true);
        const { session_id } = await API.USER.session(requestTokenValidated!);
        setAccount(session_id);
        setIsLoadingSession(false);
      }
    };


    requestSession().catch(console.error);

  }, [location, setAccount]);

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
