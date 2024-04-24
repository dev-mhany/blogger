import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseClient';
import { Article } from '../types/types';

// Utility function for local storage
const saveToLocalStorage = (key: string, data: Article[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState<Article[]>([]);

  useEffect(() => {
    console.log('Fetching blogs...');

    // Attempt to load cached blogs first
    const cachedBlogs = localStorage.getItem('blogs');
    if (cachedBlogs) {
      console.log('Loaded cached blogs');
      setBlogs(JSON.parse(cachedBlogs));
    }

    // Set up the query
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));

    // Fetch all initial blogs and set up a listener for new changes
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('Received blog update');
      const fetchedBlogs: Article[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
          authorId: data.authorId,
          authorName: data.authorName,
          images: data.images || [],
          likes: data.likes || [],
          comments: data.comments || [],
          createdAt: data.createdAt?.toDate() || new Date(),
        };
      });

      setBlogs(fetchedBlogs);
      console.log('Updated blogs in state');
      saveToLocalStorage('blogs', fetchedBlogs); // Update local storage with the latest data
      console.log('Updated local storage');
    });

    // Clean up the listener when the component unmounts
    return () => {
      console.log('Cleaning up listener');
      unsubscribe();
    };
  }, []);

  console.log('Returning blogs from hook', blogs);
  return {
    blogs,
  };
};

export default useFetchBlogs;
