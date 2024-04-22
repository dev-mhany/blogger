'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useUploadArticleData from '../../../hooks/useUploadArticleData'; // Custom hook to upload articles

const ArticleCreatePage = () => {
  const router = useRouter(); // To navigate after article creation
  const { uploadArticle, isUploading, error } = useUploadArticleData(); // Custom hook for article upload

  const [title, setTitle] = useState(''); // Track the article title
  const [content, setContent] = useState(''); // Track the article content

  const handleCreateArticle = async () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty.'); // Ensure valid inputs
      return;
    }

    // Article data to upload, omitting the 'id' and 'createdAt'
    const articleData = {
      title,
      content,
      authorId: '', // This will be set by the custom hook
    };

    await uploadArticle(articleData); // Upload the article

    if (!error) {
      // Redirect to a desired page upon successful upload
      router.push('/articles'); // Change to the desired redirect
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
        theme="snow" // Use the "snow" theme
        style={{ height: '200px' }} // Set a default height
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleCreateArticle}
        disabled={isUploading} // Disable button while uploading
      >
        Create Article
      </Button>
    </Box>
  );
};

export default ArticleCreatePage;
