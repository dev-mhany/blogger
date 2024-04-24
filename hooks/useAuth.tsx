import { useContext, useEffect, useState } from 'react';
import { FirebaseAuthContext } from '../context/FirebaseAuthProvider';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User,
  Auth,
} from 'firebase/auth';

interface UseAuthResult {
  auth: Auth;
  user: User | null;
  uid?: string;
  loading: boolean;
  signOut: () => Promise<void>;
}

const useAuth = (): UseAuthResult => {
  const context = useContext(FirebaseAuthContext);
  if (!context?.auth) {
    throw new Error(
      'FirebaseAuthContext is undefined. Ensure FirebaseAuthProvider is used.'
    );
  }

  const { auth } = context;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return {
    auth,
    user,
    loading,
    signOut,
  };
};

export default useAuth;
