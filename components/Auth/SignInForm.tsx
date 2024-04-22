'use client';
import { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'; // For programmatic navigation
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import useAuth from '../../hooks/useAuth';
const SignInForm = () => {
  const { auth, user } = useAuth(); // Check current user status
  const router = useRouter(); // Initialize router for navigation
  if (!auth) {
    throw new Error('Firebase auth instance is not available.');
  }

  useEffect(() => {
    if (user) {
      // If user is signed in, redirect to the home page
      router.push('/');
    }
  }, [user, router]); // Effect depends on `user` and `router`

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to home page upon successful sign-in
      router.push('/');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred during sign-in.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // Redirect to home page upon successful Google sign-in
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
        e.preventDefault(); // Prevent default form submission
        handleSignIn(); // Trigger email/password sign-in logic
      }}
      sx={{ width: '100%', maxWidth: 400, margin: '0 auto', padding: 2 }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Sign In
      </Typography>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign In
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

export default SignInForm;
