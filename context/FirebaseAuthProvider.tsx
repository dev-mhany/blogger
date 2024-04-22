'use client';
import { createContext, ReactNode, useMemo } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebaseClient'; // Ensure `app` is correctly imported

interface FirebaseAuthProviderProps {
  children: ReactNode;
}

interface FirebaseAuthContextType {
  auth: ReturnType<typeof getAuth>; // Define expected `auth` property
}

export const FirebaseAuthContext = createContext<
  FirebaseAuthContextType | undefined
>(undefined);

const FirebaseAuthProvider = ({ children }: FirebaseAuthProviderProps) => {
  // Memoize the auth instance
  const auth = useMemo(() => getAuth(app), []);

  const contextValue = useMemo(() => ({ auth }), [auth]); // Memoize the context value

  return (
    <FirebaseAuthContext.Provider value={contextValue}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export default FirebaseAuthProvider;
