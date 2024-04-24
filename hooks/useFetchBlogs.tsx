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
    console.log('useFetchBlogs: Fetching blogs...');

    // Attempt to load cached blogs from local storage first
    const cachedBlogs = localStorage.getItem('blogs');
    if (cachedBlogs) {
      console.log('useFetchBlogs: Loaded cached blogs from local storage');
      setBlogs(JSON.parse(cachedBlogs));
    }

    // Set up the query for Firebase
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));

    // Fetch all initial blogs and set up a listener for new changes from Firebase
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('useFetchBlogs: Received blog update from Firebase');
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
      console.log('useFetchBlogs: Updated blogs in state');
      saveToLocalStorage('blogs', fetchedBlogs); // Update local storage with the latest data
      console.log('useFetchBlogs: Updated blogs in local storage');
    });

    // Clean up the listener when the component unmounts
    return () => {
      console.log('useFetchBlogs: Cleaning up Firebase listener');
      unsubscribe();
    };
  }, []);

  console.log('useFetchBlogs: Returning blogs from hook', blogs);
  return {
    blogs,
  };
};

export default useFetchBlogs;
