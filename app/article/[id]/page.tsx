'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import useFetchAllBlogs from '../../../hooks/useFetchAllBlogs';
import ArticleHeader from '../../../components/Article/ArticleHeader';
import ArticleContent from '../../../components/Article/ArticleContent';
import ArticleActions from '../../../components/Article/ArticleActions';
import Image from 'next/image';

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  images?: string[];
  firstImage?: string;
  authorName?: string;
  authorImage?: string;
  likes: string[];
  comments: string[];
}

const ArticleDetailPage = () => {
  const { blogs, loading, error } = useFetchAllBlogs();
  const pathname = usePathname();

  const articleId = pathname.split('/').pop();
  const [article, setArticle] = useState<Blog | null>(null); // Ensure the type is Blog

  useEffect(() => {
    if (blogs && articleId) {
      const foundArticle = blogs.find((blog) => blog.id === articleId) || null;
      setArticle(foundArticle as Blog); // Ensure type compatibility
    }
  }, [blogs, articleId]);

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error" variant="body2">
        {error}
      </Typography>
    );
  }

  if (!article) {
    return (
      <Typography color="error" variant="body2">
        Article not found
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
      <ArticleHeader
        title={article.title}
        authorName={article.authorName ?? 'Unknown'} // Fallback for authorName
        authorImage={article.authorImage}
        createdAt={article.createdAt} // Keep as Date
      />

      <ArticleContent content={article.content} />

      {article.images && article.images.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'scroll', my: 2 }}>
          {article.images.map((img) => (
            <Image
              key={img} // Use image URL as a unique key
              src={img}
              unoptimized
              sizes="100vw"
              width={0}
              height={0}
              alt={`Image for ${article.title}`}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          ))}
        </Box>
      )}

      <ArticleActions
        onLike={() => console.log('Liked')}
        onComment={() => console.log('Commented')}
        likesCount={article.likes.length}
        commentsCount={article.comments.length}
      />
    </Box>
  );
};

export default ArticleDetailPage;
