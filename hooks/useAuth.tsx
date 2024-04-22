import { useContext, useEffect, useState } from 'react';
import { FirebaseAuthContext } from '../context/FirebaseAuthProvider'; // Correct context import
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User,
  Auth,
} from 'firebase/auth';

interface UseAuthResult {
  auth: Auth; // Firebase Authentication instance
  user: User | null; // Nullable user state
  uid?: string;
  loading: boolean; // Loading state
  signOut: () => Promise<void>; // Sign-out function
}

const useAuth = (): UseAuthResult => {
  const context = useContext(FirebaseAuthContext); // Retrieve the context
  if (!context?.auth) {
    throw new Error(
      'FirebaseAuthContext is undefined. Ensure FirebaseAuthProvider is used.'
    );
  }

  const { auth } = context; // Get the `auth` instance from context
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false); // Mark loading as complete once the user state changes
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [auth]);

  const signOut = async () => {
    await firebaseSignOut(auth); // Firebase sign-out logic
    setUser(null); // Reset user after sign-out
  };

  return {
    auth,
    user,
    loading,
    signOut,
  };
};

export default useAuth;
