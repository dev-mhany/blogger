'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import useFetchAllBlogs from '../../hooks/useFetchAllBlogs';
import { useRouter } from 'next/navigation';

const ArticleAllPage = () => {
  const [initialFetch, setInitialFetch] = useState(true);
  const { blogs, loading, error, fetchMore, hasMore } = useFetchAllBlogs();
  const router = useRouter();

  const handleReadMore = useCallback(
    (articleId: string) => {
      router.push(`/article/${articleId}`);
    },
    [router]
  );

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      fetchMore();
    }
  }, [fetchMore, hasMore]);

  useEffect(() => {
    if (initialFetch) {
      console.log('Initial effect, fetching blogs'); // Log the first fetch
      fetchMore(); // Fetch the first set of blogs on component mount
      setInitialFetch(false); // Prevent re-fetching on subsequent renders
    }
  }, [fetchMore, initialFetch]); // Ensure the effect only runs once on mount

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        All Articles
      </Typography>

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {loading ? (
        <Typography variant="body1">Loading...</Typography> // Loading indicator
      ) : (
        blogs.map((blog) => (
          <Card key={blog.id} sx={{ mb: 2 }}>
            {blog.firstImage ? (
              <CardMedia
                component="img"
                image={blog.firstImage} // Ensure correct image URL
                alt={`Image for ${blog.title}`} // Descriptive alt text
                sx={{
                  height: 150,
                  objectFit: 'cover', // Ensure proper object fit
                }}
              />
            ) : (
              <Typography
                color="textSecondary"
                sx={{ textAlign: 'center', padding: 4 }}
              >
                Image not available
              </Typography>
            )}

            <CardContent>
              <Typography variant="h6">{blog.title}</Typography>
              <Typography variant="body2">
                {blog.content.substring(0, 100)}...
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleReadMore(blog.id)} // Navigate to the article
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))
      )}

      {hasMore && (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleLoadMore} // Load more blogs
          fullWidth
          sx={{ mt: 2 }}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default ArticleAllPage;
