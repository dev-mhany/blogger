'use client';
import { createContext, ReactNode, useMemo } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebaseClient';

interface FirebaseAuthProviderProps {
  children: ReactNode;
}

interface FirebaseAuthContextType {
  auth: ReturnType<typeof getAuth>;
}

export const FirebaseAuthContext = createContext<
  FirebaseAuthContextType | undefined
>(undefined);

const FirebaseAuthProvider = ({ children }: FirebaseAuthProviderProps) => {
  const auth = useMemo(() => getAuth(app), []);

  const contextValue = useMemo(() => ({ auth }), [auth]);

  return (
    <FirebaseAuthContext.Provider value={contextValue}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export default FirebaseAuthProvider;
