import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';
import useAuth from '../../../hooks/useAuth';
import CreateArticle from '../../../components/Article/CreateArticle';
import DeleteIcon from '@mui/icons-material/Delete';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
}); // Dynamic import with SSR disabled

const ArticleCreatePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { uploadArticle, isUploading, error, uploadImages } = CreateArticle();

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
      images: [],
      likes: [],
      comments: [],
    };

    if (imageFiles.length > 0) {
      const uploadedImageUrls = await uploadImages(imageFiles);
      articleData.images = uploadedImageUrls.map((img) => img.downloadURL);
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
      <Button variant="contained" component="label" fullWidth>
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
                onClick={() => removeImage(index)}
                sx={{ position: 'absolute', top: 0, right: 0 }}
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
