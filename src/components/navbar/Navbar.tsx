import React from 'react';
import { AppBar, Button, Tab, Tabs } from '@mui/material';
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

export const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userAccount, closeSession } = useMainContext();

  const handleChange = (event: React.ChangeEvent<{}>, route: string) => navigate(route);
  const handleLogin = async () => {
    const { request_token } = await API.USER.token();
    navigate(`/login/validate/${request_token}`);
  };

  return <div>
    <AppBar position="static">
      <Tabs onChange={handleChange} aria-label="navbar-tabs" textColor="inherit" value={pathname}>
        <Tab label="Home" value="/"/>
        <Tab label="Discover" value="/discover"/>
        <ButtonContainer>
          {userAccount ? <Button color="inherit" onClick={closeSession}>LogOut</Button> : <Button color="inherit" onClick={handleLogin}>Login</Button>}
        </ButtonContainer>
      </Tabs>
    </AppBar>
  </div>;
};
