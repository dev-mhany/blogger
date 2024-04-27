import {
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  Timestamp,
  doc,
} from 'firebase/firestore';
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { getStorage } from 'firebase/storage';
import useAuth from '../../hooks/useAuth';
import { Article, UploadedImage } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import 'react-quill/dist/quill.snow.css';
import {
  Box,
  Typography,
  LinearProgress,
  Button,
  TextField,
} from '@mui/material';
import ReactQuill from 'react-quill';
import { db } from '@/firebase/firebaseClient';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

interface CreateArticleProps {
  title: string;
  imageFiles: File[];
}

const CreateArticle: React.FC<CreateArticleProps> = ({ title, imageFiles }) => {
  const router = useRouter(); // Initialize the router
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImages = async (files: File[]): Promise<UploadedImage[]> => {
    const storage = getStorage();
    const uploadedImagesData: UploadedImage[] = [];

    setIsUploading(true);

    for (const file of files) {
      try {
        const fileRef = storageRef(storage, `images/${uuidv4()}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        uploadedImagesData.push({
          variableName: file.name,
          downloadURL,
        });
      } catch (e) {
        setError(
          e instanceof Error
            ? `Failed to upload image: ${e.message}`
            : 'Failed to upload image'
        );
      }
    }

    setIsUploading(false);
    return uploadedImagesData;
  };

  const handleCreateArticle = async () => {
    if (!user) {
      setError('You must be logged in to create an article.');
      return;
    }

    if (title.trim() === '' || content.trim() === '') {
      setError('Title and content cannot be empty.');
      return;
    }

    setIsUploading(true);

    const uploadedImages = await uploadImages(imageFiles);

    const newArticle = {
      title,
      content,
      authorId: user.uid,
      authorName: user.displayName ?? 'Anonymous',
      images: uploadedImages.map((img) => img.downloadURL),
      likes: [],
      comments: [],
    };

    const docRef = await addDoc(collection(db, 'articles'), {
      ...newArticle,
      createdAt: Timestamp.now(),
    });

    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      articles: arrayUnion(docRef.id),
    });

    setIsUploading(false);

    // Redirect to /article after creation
    router.push('/article');
  };

  return (
    <Box>
      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}
      {isUploading && <LinearProgress sx={{ marginTop: 2 }} />}
      {typeof window !== 'undefined' && (
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          style={{ height: '200px' }}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreateArticle}
        disabled={isUploading}
      >
        Create Article
      </Button>
    </Box>
  );
};

export default CreateArticle;
