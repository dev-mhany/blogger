'use client';
import DOMPurify from 'dompurify'; // For sanitizing HTML content
import { Typography } from '@mui/material';

const ArticlePreview = ({ content }: { content: string }) => {
  const previewText = content.slice(0, 200); // Limit to the first 200 characters

  return (
    <Typography
      variant="body2"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(previewText), // Safely sanitize and render limited content
      }}
    />
  );
};

export default ArticlePreview;
