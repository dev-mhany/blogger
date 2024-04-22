import { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseClient'; // Firebase Firestore instance
import useAuth from '../../hooks/useAuth'; // Custom hook for Firebase Authentication
import { Article } from '../../types/types'; // Import the `Article` interface

const CreateArticle = () => {
  const { user } = useAuth(); // Get the current authenticated user
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const [error, setError] = useState<string | null>(null); // Track errors
  const [articleId, setArticleId] = useState<string | null>(null); // Store uploaded article ID

  const uploadArticle = async (
    article: Omit<Article, 'id' | 'createdAt'> // ID and createdAt omitted
  ) => {
    if (!user) {
      setError('User must be authenticated to upload articles.');
      return;
    }

    try {
      setError(null);
      setIsUploading(true); // Begin upload

      // Data to upload
      const articleData: Omit<Article, 'id' | 'createdAt'> = {
        title: article.title,
        content: article.content,
        authorId: user.uid, // Assign current user ID as author
        authorName: user.displayName ?? 'Anonymous', // Use display name or fallback
        likes: [],
        comments: [],
        images: article.images || [], // Ensure images is always an array
      };

      // Create the Firestore document
      const docRef = await addDoc(collection(db, 'articles'), {
        ...articleData,
        createdAt: Timestamp.now(), // Current timestamp
      });

      setArticleId(docRef.id); // Store the new document ID
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message); // Capture specific error message
      } else {
        setError('Failed to upload the article.'); // General error handling
      }
    } finally {
      setIsUploading(false); // End upload process
    }
  };

  return {
    isUploading,
    error,
    articleId,
    uploadArticle, // Function to upload article with all properties
  };
};

export default CreateArticle;
