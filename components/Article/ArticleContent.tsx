import React from 'react';
import { Typography, Box } from '@mui/material';

interface ArticleContentProps {
  content: string; // Article content in HTML
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="body1"
        component="div" // Allows rendering HTML content
        dangerouslySetInnerHTML={{ __html: content }} // Render the content
        sx={{
          lineHeight: 1.6, // Increase line height for readability
          img: {
            maxWidth: '100%', // Ensure images do not overflow
            width: '100%',
            borderRadius: '8px', // Add border radius to images
            margin: '10px 0', // Margin around images
          },
          'h1, h2, h3, h4, h5, h6': {
            fontWeight: 600, // Make headers bold
            marginTop: '16px',
            marginBottom: '8px',
          },
          'ul, ol': {
            paddingLeft: '20px', // Padding for unordered and ordered lists
          },
          blockquote: {
            borderLeft: '4px solid #ccc', // Styling for blockquotes
            padding: '10px 20px',
            fontStyle: 'italic', // Italicized text for blockquotes
          },
        }}
      />
    </Box>
  );
};

export default ArticleContent;
