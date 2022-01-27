import React, { createContext, useCallback, useContext, useState } from 'react';

export interface ContextResult {
  sessionId?: string;
  setSessionId: (sessionId: string) => void;
  closeSession: () => void;
}

export const Context = createContext<ContextResult | null>(null);

const useCreateState = (): ContextResult => {
  const sessionSaved = localStorage.getItem('session');
  const [sessionId, setSessionId] = useState<string | undefined>(sessionSaved ?? undefined);

  const handleSetSessionId = useCallback((sessionId: string) => {
    setSessionId(sessionId);
    localStorage.setItem('session', sessionId);
  }, []);

  const handleCloseSession = useCallback(() => {
    setSessionId(undefined);
    localStorage.removeItem('session');
  }, []);

  return {
    sessionId,
    setSessionId: handleSetSessionId,
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
