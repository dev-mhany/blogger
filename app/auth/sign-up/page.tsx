// Sign-up page
'use client';
import { Box, Typography, Link } from '@mui/material';
import NextLink from 'next/link'; // For Next.js navigation
import SignUpForm from '../../../components/Auth/SignUpForm';

const SignUpPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        padding: 2,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Join Us Today!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Create an account to start your journey.
        </Typography>
        <SignUpForm />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?
          <Link component={NextLink} href="/auth/sign-in">
            Sign in here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpPage;
