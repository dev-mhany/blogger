import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';
import { Article } from '../../types/types';

interface UserBlogsProps {
  userId: string; // Explicitly define type for userId
  isOwner: boolean; // Explicitly define type for isOwner
  blogs: Article[]; // The array of blogs
}

const UserBlogs = ({ userId, isOwner, blogs }: UserBlogsProps) => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h5">User Blogs</Typography>
    <Grid container spacing={2}>
      {blogs.map((blog) => (
        <Grid item key={blog.id} xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 4 }}>
            <Typography variant="h6">{blog.title}</Typography>
            <Typography variant="body2">
              {blog.content.slice(0, 100)}...
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <Link href={`/article/${blog.id}`}>
                <Button variant="contained">View</Button>
              </Link>
              {isOwner && (
                <>
                  <Link href={`/article/edit/${blog.id}`}>
                    <Button variant="outlined">Edit</Button>
                  </Link>
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default UserBlogs;
