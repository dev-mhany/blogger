'use client';

import React from 'react';
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import useFetchLatestBlogs from '../../hooks/useFetchLatestBlogs'; // Fetch latest blogs
import ArticlePreview from '../../components/Article/ArticlePreview'; // Component for text previews
import Image from 'next/image';

const ArticlePage = () => {
  const { blogs, loading, error } = useFetchLatestBlogs();
  const router = useRouter();

  const handleCreateBlog = () => {
    router.push('/article/create'); // Navigate to "Create Blog"
  };

  const handleReadMore = (articleId: string) => {
    router.push(`/article/${articleId}`); // Navigate to the article detail page
  };

  const handleShowMore = () => {
    router.push('/article/all'); // Navigate to a page that shows all blogs
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateBlog}
        sx={{ mb: 2 }}
      >
        Create Blog
      </Button>

      <Typography variant="h4" textAlign="center" gutterBottom>
        Latest Blogs
      </Typography>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : (
        blogs.map((blog) => (
          <Card key={blog.id} sx={{ mb: 2 }}>
            {blog.images?.[0] ? (
              <Image
                src={blog.images?.[0]} // Validate URL
                alt={`Image for ${blog.title}`}
                layout="responsive" // Ensure responsive rendering
                width={150} // Set consistent width
                height={150} // Set consistent height
                objectFit="cover" // Ensure correct image fit
                // priority // Load this image with higher priority
              />
            ) : (
              <Typography
                color="textSecondary"
                sx={{ textAlign: 'center', padding: 4 }}
              >
                Image not available
              </Typography> // Fallback if no image
            )}

            <CardContent>
              <Typography variant="h6">{blog.title}</Typography>
              {/* Preview only a portion of the content */}
              <ArticlePreview content={blog.content} />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleReadMore(blog.id)}
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      <Button
        variant="outlined"
        color="primary"
        onClick={handleShowMore}
        fullWidth
        sx={{ mt: 2 }}
      >
        Show More
      </Button>
    </Box>
  );
};

export default ArticlePage;
