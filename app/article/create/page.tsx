'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import dynamic from 'next/dynamic';
const CreateArticle = dynamic(
  () => import('../../../components/Article/CreateArticle'),
  { ssr: false }
);

const ArticleCreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [thumbnailURLs, setThumbnailURLs] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && imageFiles.length > 0) {
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

  const handleArticleCreated = (articleId: any) => {
    router.push(`/article/${articleId}`);
  };

  const removeImage = (index: number) => {
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
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
      <CreateArticle
        title={title}
        imageFiles={imageFiles}
        // onArticleCreated={handleArticleCreated}
      />
    </Box>
  );
};

export default ArticleCreatePage;
