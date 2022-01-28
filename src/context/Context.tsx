import React, { createContext, useCallback, useContext, useState } from 'react';
import { Account } from '../api/user/models';
import { useAccount } from '../hooks/useAccount';

export interface ContextResult {
  sessionId?: string;
  userAccount?: Account;
  setAccount: (sessionId: string) => void;
  closeSession: () => void;
}

export const Context = createContext<ContextResult | null>(null);

const useCreateState = (): ContextResult => {
  const sessionSaved = localStorage.getItem('session');
  const [sessionId, setSessionId] = useState<string | undefined>(sessionSaved ?? undefined);
  const { account, closeSession } = useAccount(sessionId ?? undefined);

  const handleSetAccount = useCallback((sessionId: string) => {
    setSessionId(sessionId);
    localStorage.setItem('session', sessionId);
  }, []);

  const handleCloseSession = useCallback(() => {
    closeSession();
    setSessionId(undefined);
    localStorage.removeItem('session');
  }, [closeSession]);

  return {
    userAccount: account,
    sessionId,
    setAccount: handleSetAccount,
    closeSession: handleCloseSession
  };
};

export const ContextProvider = ({ children }: any) => {
  const state = useCreateState();

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
};

export function useMainContext(): ContextResult {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useMainContext must be used within a ContextProvider');
  }
  return context;
}
