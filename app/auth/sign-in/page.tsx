import React from 'react';
import SignInForm from '../../../components/Auth/SignInForm';
import { Box, Typography, Link } from '@mui/material';
import NextLink from 'next/link';

const SignInPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sign in to continue to your account.
        </Typography>
        <SignInForm />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don&apos;t have an account?
          <Link component={NextLink} href="/auth/sign-up">
            Sign up here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInPage;
