/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  LinearProgress,
  Grid,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ReactQuill from 'react-quill';
import './quill.snow.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import useAuth from '../../../hooks/useAuth';
import CreateArticle from '../../../components/Article/CreateArticle';
import DeleteIcon from '@mui/icons-material/Delete';

const ArticleCreatePage = () => {
  const router = useRouter();
  const { uploadArticle, isUploading, error, uploadImages } = CreateArticle();
  const { user } = useAuth();

  const storage = getStorage();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [thumbnailURLs, setThumbnailURLs] = useState<string[]>([]);

  useEffect(() => {
    if (imageFiles.length > 0) {
      const newThumbnailURLs = imageFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setThumbnailURLs(newThumbnailURLs);
    }
  }, [imageFiles]);

  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const handleCreateArticle = async () => {
    if (!user) {
      alert('You must be logged in to create an article.');
      return;
    }

    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty.');
      return;
    }

    const articleData = {
      title,
      content,
      authorId: user.uid,
      authorName: user.displayName ?? 'Anonymous',
      likes: [],
      comments: [],
      images: [] as string[],
    };

    if (imageFiles.length > 0) {
      const imageUrls = await uploadImages(imageFiles);
      // articleData.images = imageUrls;
    }

    await uploadArticle(articleData, imageFiles);

    if (!error) {
      router.push('/article');
    }
  };

  const removeImage = (index: number) => {
    if (index < 0 || index >= imageFiles.length) {
      return;
    }

    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
    setThumbnailURLs(thumbnailURLs.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Create an Article
      </Typography>
      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}
      {isUploading && <LinearProgress sx={{ marginTop: 2 }} />}
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
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
        Upload Images
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleImageFilesChange}
        />
      </Button>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {thumbnailURLs.map((url, index) => (
          <Grid item key={index}>
            <Box sx={{ position: 'relative', width: 100, height: 100 }}>
              <img
                src={url}
                alt={`Thumbnail ${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <IconButton
                size="small"
                color="error"
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={() => removeImage(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
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

export default ArticleCreatePage;
