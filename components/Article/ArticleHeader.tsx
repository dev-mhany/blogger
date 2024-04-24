import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { format } from 'date-fns';

interface ArticleHeaderProps {
  title: string;
  authorName: string;
  authorImage?: string;
  createdAt: Date;
}

const ArticleHeader = ({
  title,
  authorName,
  authorImage,
  createdAt,
}: ArticleHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
      {authorImage && (
        <Avatar src={authorImage} alt={authorName} sx={{ marginRight: 2 }} />
      )}

      <Box>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1">
          By {authorName} | {format(createdAt, 'PPP')}
        </Typography>
      </Box>
    </Box>
  );
};

export default ArticleHeader;
