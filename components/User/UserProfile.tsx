import { Box, Typography, Avatar } from '@mui/material';
import { UserProfile as UserProfileType } from '../../types/types'; // Import the type for user profiles
import { useEffect, useState } from 'react';
import { fetchUserById } from '../../services/userService';

interface UserProfileProps {
  userId: string; // Define the type for `userId`
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const [user, setUser] = useState<UserProfileType | null>(null); // Allow `null` as a valid state

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await fetchUserById(userId); // Fetch user based on ID
      setUser(fetchedUser); // Set fetched user to state
    };

    fetchData(); // Call the fetch function
  }, [userId]); // Re-fetch if `userId` changes

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Avatar
        src={user?.photoURL || ''} // Display avatar image
        sx={{ width: 56, height: 56, mr: 2 }}
      />
      <Box>
        <Typography variant="h5">{user?.displayName || 'User'}</Typography>
        <Typography variant="body1">
          {user?.bio || 'No bio available'}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfile;
