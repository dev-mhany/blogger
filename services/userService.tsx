// services/userService.tsx
import { db, auth } from '../firebase/firebaseClient'; // Use the initialized Firebase instance
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '../types/types'; // Import your user profile interface

export const fetchUserById = async (
  userId: string
): Promise<UserProfile | null> => {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data() as UserProfile; // Cast to UserProfile
    return userData;
  }

  return null; // Return null if not found
};

export const updateUserProfile = async (
  userId: string,
  data: Partial<UserProfile>
): Promise<void> => {
  const userDocRef = doc(db, 'users', userId);
  await updateDoc(userDocRef, data); // Update with the given data
};

export const getCurrentUser = (): UserProfile | null => {
  const user = auth.currentUser;

  if (user) {
    const customUser: UserProfile = {
      uid: user.uid,
      displayName: user.displayName || '',
      email: user.email || '',
      photoURL: user.photoURL || '',
      articles: [],
      bio: '',
    };

    return customUser; // Return the user profile
  }

  return null; // Return null if not authenticated
};
