import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Context, ContextResult } from '../context/Context';


export interface ContextMockProps {
  withUser?: boolean;
}

const USER_ACCOUNT_MOCK = { username: 'test', name: 'test', id: 1 };

export async function renderWithRouter(ui: any, { route = '/' } = {}, contextValue: ContextMockProps = {}) {

  const values: Partial<ContextResult> = {
    userAccount: contextValue.withUser ? USER_ACCOUNT_MOCK : undefined,
    sessionId: '111'
  };

  return {
    ...render(<Context.Provider value={values as ContextResult}>
      <BrowserRouter>{ui}
      </BrowserRouter>
    </Context.Provider>)
  };
}
