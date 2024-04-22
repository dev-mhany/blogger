import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import { format } from 'date-fns'; // To format dates

interface ArticleHeaderProps {
  title: string; // Article title
  authorName: string; // Author's name
  authorImage?: string; // Author's image (optional)
  createdAt: Date; // Article creation date
}

const ArticleHeader = ({
  title,
  authorName,
  authorImage,
  createdAt,
}: ArticleHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
      {/* Display author image if provided */}
      {authorImage && (
        <Avatar
          src={authorImage} // Display author image
          alt={authorName} // Alt text for the image
          sx={{ marginRight: 2 }} // Margin between avatar and text
        />
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
