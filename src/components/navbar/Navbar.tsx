import React, { useState } from 'react';
import { AppBar, Button, Dialog, Tab, Tabs, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMainContext } from '../../context/Context';
import styled from '@emotion/styled';
import { API } from '../../api/API';

const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  margin-right: 22px;
  justify-content: flex-end;
`;

const DialogButtons = styled.div`
  display: flex;
  flex: 1;
  margin: 22px;
  justify-content: space-between;
`;

const DialogContainer = styled.div`
  width: fit-content;
  padding: 20px;
  flex-direction: column;
`;

export const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userAccount, closeSession } = useMainContext();

  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (event: React.ChangeEvent<{}>, route: string) => navigate(route);
  const handleShowLoginDialog = () => setShowDialog(true);
  const handleHideDialog = () => setShowDialog(false);

  const handleLogin = async () => {
    const { request_token } = await API.USER.token();
    navigate(`/login/validate/${request_token}`);
  };

  return <div>
    <Dialog open={showDialog} style={{ position: 'absolute', bottom: '60%' }} maxWidth={false}>
      <DialogContainer>
        <Typography component="span" variant="body1" color="text.secondary">You are being redirected to the TMDB home page. There, you will be able to login or register.</Typography>
        <DialogButtons>
          <Button variant="contained" color="primary" onClick={handleLogin}>Go for it!</Button>
          <Button variant="contained" color="error" onClick={handleHideDialog}>Cancel</Button>
        </DialogButtons>
      </DialogContainer>
    </Dialog>
    <AppBar position="static">
      <Tabs onChange={handleChange} aria-label="navbar-tabs" textColor="inherit" value={pathname}>
        <Tab label="Home" value="/"/>
        <Tab label="Discover" value="/discover"/>
        {userAccount ? <Tab label="Favorites" value="/movie/favorites"/> : null}
        <ButtonContainer>
          {userAccount ? <Button color="inherit" onClick={closeSession}>LogOut</Button> : <Button color="inherit" onClick={handleShowLoginDialog}>Login</Button>}
        </ButtonContainer>
      </Tabs>
    </AppBar>
  </div>;
};
