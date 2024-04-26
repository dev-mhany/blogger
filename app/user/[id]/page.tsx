'use client';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseClient';
import { Article } from '../../../types/types';
import UserProfile from '../../../components/User/UserProfile';
import { useParams, useRouter } from 'next/navigation';
import useAuth from '../../../hooks/useAuth';
import { Box, Typography, Button, Link } from '@mui/material';

const UserProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure id is a single string
  const [articles, setArticles] = useState<Article[]>([]);

  const isOwner = user && user.uid === id;

  useEffect(() => {
    const fetchUserArticles = async () => {
      if (id) {
        const articleQuery = query(
          collection(db, 'articles'),
          where('authorId', '==', id)
        );
        const querySnapshot = await getDocs(articleQuery);

        const fetchedArticles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          authorId: doc.data().authorId,
          authorName: doc.data().authorName,
          images: doc.data().images ?? [],
          likes: doc.data().likes ?? [],
          comments: doc.data().comments ?? [],
          createdAt: doc.data().createdAt ?? new Date(), // Default to the current date
        }));

        setArticles(fetchedArticles);
      }
    };

    fetchUserArticles();
  }, [id]);

  const handleSettingsClick = () => {
    if (isOwner) {
      router.push('/user/settings'); // Redirect to the settings page
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <UserProfile userId={id} />
      {articles.map((article) => (
        <Box key={article.id} sx={{ mb: 2 }}>
          <Typography variant="h5">{article.title}</Typography>
          <Typography variant="body1">
            {article.content.slice(0, 100)}...
          </Typography>
          {isOwner ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSettingsClick}
              >
                Settings
              </Button>
              <Button variant="contained" color="primary">
                Edit
              </Button>
              <Button variant="contained" color="secondary">
                Delete
              </Button>
            </>
          ) : null}
          <Button
            component={Link}
            href={`/article/${article.id}`}
            variant="contained"
            color="primary"
          >
            View Article
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default UserProfilePage;
