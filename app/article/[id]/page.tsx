'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, CircularProgress } from '@mui/material';
import ArticleHeader from '../../../components/Article/ArticleHeader';
import ArticleContent from '../../../components/Article/ArticleContent';
import ArticleActions from '../../../components/Article/ArticleActions';
import { getArticleById } from '../../../lib/firestoreUtils';
import { Article } from '../../../types/types';

const ArticlePage = () => {
  const params = useParams();
  const articleId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (articleId) {
        const fetchedArticle = await getArticleById(articleId);
        setArticle(fetchedArticle);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!article) {
    return (
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Typography variant="h5">Article not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <ArticleHeader
        title={article.title}
        authorName={article.authorName}
        authorImage={article.authorImage}
        createdAt={article.createdAt.toDate()}
      />
      <ArticleContent content={article.content} /> {/* Display content */}
      {article.images && (
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          {article.images.map((imageUrl, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={imageUrl}
              alt={`Article image ${index}`}
              style={{
                maxWidth: '50%',
                height: 'auto',
                objectFit: 'cover',
                marginBottom: '10px',
                border: '1px solid #ccc',
                padding: '5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                margin: '10px 0',
                display: 'inline-block',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>
      )}
      <ArticleActions
        onLike={() => console.log('Liked the article')}
        onComment={() => console.log('Comment on the article')}
        likesCount={article.likes.length}
        commentsCount={article.comments.length}
      />
    </Box>
  );
};

export default ArticlePage;
