import { useCallback, useEffect, useState } from 'react';
import { Account } from '../api/user/models';
import { API } from '../api/API';

interface UseAccountResult {
  account?: Account;
  closeSession: () => void;
}

export const useAccount = (sessionId?: string): UseAccountResult => {
  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    const requestAccount = async () => {
      const account = await API.USER.account(sessionId!);
      setAccount(account);
    };

    if (sessionId !== undefined) {
      requestAccount().catch(console.error);
    }

  }, [sessionId]);

  const closeSession = useCallback(() => setAccount(undefined), []);

  return { account, closeSession };

};
