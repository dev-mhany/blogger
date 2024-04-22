import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseClient';
import { Article } from '../types/types';

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date; // Converted from Timestamp
  images?: string[]; // Optional array of image URLs
  firstImage?: string;
  authorName?: string;
  authorImage?: string;
  likes?: string[];
  comments?: string[];
}

const useFetchLatestBlogs = (): {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
} => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      setLoading(true);

      try {
        // Fetch the latest 10 blogs from Firestore
        const q = query(
          collection(db, 'articles'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        const fetchedBlogs: Blog[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Article;
          return {
            id: doc.id,
            title: data.title,
            content: data.content,
            authorId: data.authorId,
            authorName: data.authorName,
            authorImage: data.authorImage,
            firstImage: data.firstImage,
            likes: data.likes || [], // Ensure likes is always an array
            comments: data.comments || [], // Ensure comments is always an array
            createdAt: data.createdAt.toDate(), // Convert to Date
            images: data.images || [], // Ensure images is always an array
          };
        });

        setBlogs(fetchedBlogs); // Update state with fetched blogs
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Failed to fetch blogs.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs(); // Fetch blogs when the component is mounted
  }, []);

  return {
    blogs,
    loading,
    error,
  };
};

export default useFetchLatestBlogs;
