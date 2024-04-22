import { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseClient'; // Firebase Firestore instance
import useAuth from './useAuth'; // Custom hook for Firebase Authentication
import { Article } from '../types/types'; // Import the `Article` interface

const useUploadArticleData = () => {
  const { user } = useAuth(); // Get the current authenticated user
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const [error, setError] = useState<string | null>(null); // Track errors
  const [articleId, setArticleId] = useState<string | null>(null); // Store uploaded article ID

  const uploadArticle = async (
    article: Omit<Article, 'id' | 'createdAt'> // ID and creation time omitted
  ) => {
    if (!user) {
      setError('User must be authenticated to upload articles.'); // Check authentication
      return;
    }

    try {
      setError(null);
      setIsUploading(true); // Begin the upload process

      const articleData = {
        ...article,
        authorId: user.uid, // Assign the current user ID as the author ID
        createdAt: Timestamp.now(), // Current timestamp
      };

      // Add the article document to the Firestore collection
      const docRef = await addDoc(collection(db, 'articles'), articleData);

      setArticleId(docRef.id); // Store the document ID of the newly created article
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message); // Capture specific error message
      } else {
        setError('Failed to upload the article.'); // General error handling
      }
    } finally {
      setIsUploading(false); // End the upload process
    }
  };

  return {
    isUploading,
    error,
    articleId, // Return the ID of the uploaded article
    uploadArticle, // Function to upload article
  };
};

export default useUploadArticleData;
