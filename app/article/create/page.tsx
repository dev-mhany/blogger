'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs
import CreateArticle from '../../../components/Article/CreateArticle'; // Custom hook to upload articles

const ArticleCreatePage = () => {
  const router = useRouter();
  const { uploadArticle, isUploading, error } = CreateArticle();

  const storage = getStorage(); // Firebase Storage instance
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFiles, setImageFiles] = useState<FileList | null>(null); // Track uploaded images

  const handleImageUpload = async () => {
    if (!imageFiles) {
      return [];
    }

    const imageUrls = [];

    for (const file of Array.from(imageFiles || [])) {
      const storageRef = ref(storage, `articles/images/${uuidv4()}`); // Unique storage reference
      await uploadBytes(storageRef, file); // Upload image to Firebase Storage
      const downloadUrl = await getDownloadURL(storageRef); // Get the download URL
      imageUrls.push(downloadUrl); // Add the image URL to the list
    }

    return imageUrls;
  };

  const handleCreateArticle = async () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty.');
      return;
    }

    const articleData = {
      title,
      content,
      images: [] as string[], // Initialize as an empty array, // Placeholder for uploaded image URLs
    };

    if (imageFiles) {
      // If images were uploaded, handle the upload process
      const imageUrls = await handleImageUpload();
      articleData.images = imageUrls; // Add uploaded image URLs to the article data
    }

    await uploadArticle(articleData as any); // Upload the article with image URLs

    if (!error) {
      router.push('/article'); // Redirect upon successful upload
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Create an Article
      </Typography>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Typography variant="h6" gutterBottom>
        Content
      </Typography>

      <ReactQuill
        value={content}
        onChange={(value) => setContent(value)}
        theme="snow"
        style={{ height: '200px' }}
      />

      <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
        Upload Images
      </Typography>
      <Button variant="contained" component="label">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImageFiles(e.target.files)}
        />
      </Button>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleCreateArticle}
        disabled={isUploading}
      >
        Create Article
      </Button>
    </Box>
  );
};

export default ArticleCreatePage;
