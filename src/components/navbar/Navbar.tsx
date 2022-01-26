import React from 'react';
import { AppBar, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<{}>, route: string) => navigate(route);

  return <div>
    <AppBar position="static">
      <Tabs onChange={handleChange} aria-label="navbar-tabs" textColor="inherit" value={pathname}>
        <Tab label="Home" value="/"/>
        <Tab label="Discover" value="/discover"/>
      </Tabs>
    </AppBar>
  </div>;
};
