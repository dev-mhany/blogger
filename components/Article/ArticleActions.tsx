import React from 'react';
import { Button, Box } from '@mui/material';

interface ArticleActionsProps {
  onLike: () => void; // Function to handle the "Like" action
  onComment: () => void; // Function to handle the "Comment" action
  likesCount: number; // Number of likes
  commentsCount: number; // Number of comments
}

const ArticleActions = ({
  onLike,
  onComment,
  likesCount,
  commentsCount,
}: ArticleActionsProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button variant="contained" color="primary" onClick={onLike}>
        Like {likesCount}
      </Button>

      <Button variant="outlined" color="primary" onClick={onComment}>
        Comment {commentsCount}
      </Button>
    </Box>
  );
};

export default ArticleActions;
