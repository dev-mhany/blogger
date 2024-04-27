'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  getStorage,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography, LinearProgress, Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { Article, UploadedImage } from '../../types/types';
import RichTextEditor from './RichTextEditor';
import { EditorTextChangeEvent } from 'primereact/editor';
import { db } from '@/firebase/firebaseClient';

interface CreateArticleProps {
  title: string;
  imageFiles: File[];
}

const CreateArticle: React.FC<CreateArticleProps> = ({ title, imageFiles }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [content, setContent] = useState(''); // Ensure state is always a string
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setErrorString = (error: string | null) => setError(error ?? ''); // Convert 'null' to an empty string

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
        setErrorString(
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
      setErrorString('You must be logged in to create an article.');
      return;
    }

    if (title.trim() === '' || content.trim() === '') {
      setErrorString('Title and content cannot be empty.');
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

    await addDoc(collection(db, 'articles'), {
      ...newArticle,
      createdAt: Timestamp.now(),
    });

    await updateDoc(doc(db, 'users', user.uid), {
      articles: arrayUnion(doc(db, 'articles', newArticle.title).id),
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
      <RichTextEditor
        value={content}
        onTextChange={(e: EditorTextChangeEvent) =>
          setContent(e.htmlValue ?? '')
        }
        style={{ height: '200px' }}
      />

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
