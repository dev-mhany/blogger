'use client';
import DOMPurify from 'dompurify';
import { Typography } from '@mui/material';

const ArticlePreview = ({ content }: { content: string }) => {
  const previewText = content.slice(0, 100);

  return (
    <Typography
      variant="body2"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(previewText),
      }}
    />
  );
};

export default ArticlePreview;
