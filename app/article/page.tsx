'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
} from '@mui/material';
import useFetchBlogs from '../../hooks/useFetchBlogs';
import Link from 'next/link';
import ArticlePreview from '../../components/Article/ArticlePreview';

const AllArticlesPage = () => {
  const { blogs } = useFetchBlogs(); // Fetch initial blogs and listen for updates
  const [visibleBlogsCount, setVisibleBlogsCount] = useState(8); // How many blogs to show initially
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const loadMoreBlogs = () => {
    setIsLoading(true); // Start loading state
    setVisibleBlogsCount((prev) => prev + 4); // Increase the visible count by 4
    setIsLoading(false); // Reset loading state
  };

  const uniqueBlogs = Array.from(new Set(blogs.map((blog) => blog.id))).map(
    (id) => blogs.find((blog) => blog.id === id)
  ); // Ensure unique blogs

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4">All Blogs</Typography>
        <Link href="/article/create">
          <Button variant="contained" color="primary">
            Create Blog
          </Button>
        </Link>
      </Box>
      <Grid container spacing={2}>
        {uniqueBlogs.slice(0, visibleBlogsCount).map((blog) => (
          <Grid item xs={12} sm={6} md={3} key={blog?.id}>
            {' '}
            {/* Each item takes 1/4 of the row */}
            <Card sx={{ height: '100%' }}>
              {blog?.images?.[0] && (
                <CardMedia
                  component="img"
                  height="auto"
                  image={blog.images[0]}
                  alt="Blog Preview"
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h5">{blog?.title}</Typography>
                <Typography variant="body2">By {blog?.authorName}</Typography>
                <ArticlePreview content={blog?.content || ''} />
                <Link href={`/article/${blog?.id}`}>
                  <Button variant="text">Read More</Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isLoading && <LinearProgress sx={{ mt: 2 }} />} {/* Loading indicator */}
      <Button
        variant="contained"
        color="primary"
        onClick={loadMoreBlogs}
        sx={{ mt: 2 }}
        disabled={isLoading} // Disable while loading
      >
        Load More
      </Button>
    </Box>
  );
};

export default AllArticlesPage;
