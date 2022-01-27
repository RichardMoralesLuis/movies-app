import React from 'react';
import './App.css';
import { Router } from './Router';
import { ContextProvider } from './context/Context';

function App() {

  return <ContextProvider>
    <Router/>
  </ContextProvider>;
}

export default App;
