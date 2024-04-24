'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import useAuth from '../../hooks/useAuth';

const SignUpForm = () => {
  const { auth, user } = useAuth();
  const router = useRouter();
  if (!auth) {
    throw new Error('Firebase auth instance is not available.');
  }

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName });

      router.push('/auth/sign-in');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred during sign-up.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      router.push('/');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred during Google sign-in.');
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}
      sx={{ width: '100%', maxWidth: 400, margin: '0 auto', padding: 2 }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Create an Account
      </Typography>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <TextField
        label="Display Name"
        value={displayName}
        fullWidth
        margin="normal"
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <TextField
        label="Email"
        type="email"
        value={email}
        fullWidth
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        fullWidth
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>

      <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
        Or sign in with Google:
      </Typography>

      <Button
        onClick={handleGoogleSignIn}
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign In with Google
      </Button>
    </Box>
  );
};

export default SignUpForm;
