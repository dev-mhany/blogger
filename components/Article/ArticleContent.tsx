import React from 'react';
import { Typography, Box } from '@mui/material';

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="body1"
        component="div"
        dangerouslySetInnerHTML={{ __html: content }}
        sx={{
          lineHeight: 1.6,
          img: {
            maxWidth: '100%',
            width: '100%',
            borderRadius: '8px',
            margin: '10px 0',
          },
          'h1, h2, h3, h4, h5, h6': {
            fontWeight: 600,
            marginTop: '16px',
            marginBottom: '8px',
          },
          'ul, ol': {
            paddingLeft: '20px',
          },
          blockquote: {
            borderLeft: '4px solid #ccc',
            padding: '10px 20px',
            fontStyle: 'italic',
          },
        }}
      />
    </Box>
  );
};

export default ArticleContent;
