import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../api/API';
import { useMainContext } from '../../context/Context';
import { PageContainer } from '../../components/containers/PageContainer';
import { Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Banner } from '../../components/banner/Banner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginSession: FC = () => {
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isSessionDenied, setIsSessionDenied] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { setAccount } = useMainContext();

  const [error, setError] = useState(false);

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
        return;
      }
      setIsLoadingSession(false);
      setIsSessionDenied(true);
    };

    requestSession().catch(e => {
      console.error(e); // TODO: send error to sentry
      setError(true);
    });

  }, [location, setAccount]);

  const handleGoHome = () => navigate('/');
  const handleCloseError = () => setError(false);


  if (isLoadingSession) {
    return <PageContainer>Loading session...</PageContainer>;
  }

  return <PageContainer>
    {error ? <Banner message="Error trying to login, please go home an try again" onClose={handleCloseError}/> : null}
    <Container>
      {!isSessionDenied ? <Typography component="span" fontWeight="bold" variant="h2" color="text.primary">Login with success🙌🏻</Typography> : <Typography component="span" fontWeight="bold" variant="h2" color="text.primary">Session denied😥</Typography>}
      <Button onClick={handleGoHome} variant="contained" style={{ marginTop: 22 }}>Go Home🏠</Button>
    </Container>
  </PageContainer>;
};
