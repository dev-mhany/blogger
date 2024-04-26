'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { UserProfile } from '../../../types/types'; // Ensure the correct import
import { updateUserProfile } from '../../../services/userService';

const UserSettingsPage = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (user) {
      const userProfile = user as UserProfile; // Cast `user` to `UserProfile`
      setDisplayName(userProfile.displayName || '');
      setBio(userProfile.bio || ''); // Ensure 'bio' is available
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      const userProfile = user as UserProfile; // Cast to ensure correct properties
      updateUserProfile(userProfile.uid, { displayName, bio }); // Update with correct type
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">User Settings</Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          fullWidth
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
      </Box>
      <Box sx={{ textAlign: 'right', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default UserSettingsPage;
