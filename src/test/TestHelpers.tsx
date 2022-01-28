import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ContextProvider } from '../context/Context';

export function renderWithRouter(ui: any, { route = '/' } = {}) {
  return {
    ...render(<ContextProvider>
      <BrowserRouter>{ui}
      </BrowserRouter>
    </ContextProvider>), history
  };
}
