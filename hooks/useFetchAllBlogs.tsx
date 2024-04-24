import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseClient';
import { Article } from '../types/types';

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName?: string;
  authorImage?: string;
  createdAt: Date;
  images?: string[];
  firstImage?: string;
  likes: string[];
  comments: string[];
}

interface UseFetchAllBlogsResult {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  fetchMore: () => void;
  hasMore: boolean;
}

const LOCAL_STORAGE_KEY = 'fetchedBlogs'; // Local storage key

const useFetchAllBlogs = (): UseFetchAllBlogsResult => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<
    QueryDocumentSnapshot<DocumentData> | undefined
  >();

  const saveBlogsToLocal = useCallback((blogs: Blog[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogs));
  }, []);

  const loadBlogsFromLocal = useCallback(() => {
    const storedBlogs = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedBlogs ? JSON.parse(storedBlogs) : null;
  }, []);

  const fetchBlogs = useCallback(
    async (startDoc?: QueryDocumentSnapshot<DocumentData>) => {
      try {
        setLoading(true);

        const blogsQuery = query(
          collection(db, 'articles'),
          orderBy('createdAt', 'desc'),
          limit(5),
          ...(startDoc ? [startAfter(startDoc)] : [])
        );

        const snapshot = await getDocs(blogsQuery);

        const newBlogs = snapshot.docs.map((doc) => {
          const data = doc.data() as Article;
          return {
            id: doc.id,
            title: data.title,
            content: data.content,
            authorId: data.authorId,
            authorName: data.authorName,
            authorImage: data.authorImage,
            firstImage: data.images?.[0], // Fetch first image
            likes: data.likes || [],
            comments: data.comments || [],
            createdAt: data.createdAt.toDate(),
            images: data.images || [],
          };
        });

        const uniqueBlogs = [
          ...blogs,
          ...newBlogs.filter((blog) => !blogs.some((b) => b.id === blog.id)),
        ]; // Avoid duplicates

        setBlogs(uniqueBlogs); // Update the state
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]); // Last document for pagination
        saveBlogsToLocal(uniqueBlogs); // Save to local storage

        if (snapshot.docs.length < 5) {
          setHasMore(false); // No more data to fetch
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch blogs.');
      } finally {
        setLoading(false);
      }
    },
    [blogs, saveBlogsToLocal] // Stable dependencies to avoid repeated re-renders
  );

  const fetchMore = useCallback(() => {
    if (hasMore && lastDoc) {
      fetchBlogs(lastDoc); // Fetch more blogs from the last known document
    }
  }, [fetchBlogs, lastDoc, hasMore]);

  // This effect should only run once to avoid infinite loops
  useEffect(() => {
    const storedBlogs = loadBlogsFromLocal();
    if (storedBlogs && blogs.length === 0) {
      // Ensure `blogs.length` is checked
      setBlogs(storedBlogs);
      setLoading(false); // Already loaded from local storage
    } else if (blogs.length === 0) {
      // Only fetch if `blogs` is empty
      fetchBlogs(); // Fetch if no blogs in local storage
    }
  }, [loadBlogsFromLocal, fetchBlogs, blogs.length]); // Stable dependencies

  return {
    blogs,
    loading,
    error,
    fetchMore,
    hasMore,
  };
};

export default useFetchAllBlogs;
