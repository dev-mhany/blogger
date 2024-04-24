// │   └── firestoreUtils.ts                   # Utility functions for Firestore operations
import { db } from './firebaseConfig';
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
} from 'firebase/firestore';
import { Article } from '../types/types';

// Function to get an article by ID from Firestore
const getArticleById = async (id: string): Promise<Article | null> => {
  const articleDocRef = doc(db, 'articles', id);
  const articleDoc = await getDoc(articleDocRef);

  if (articleDoc.exists()) {
    return {
      ...articleDoc.data(),
      id: articleDoc.id,
    } as Article; // Return the article with its ID
  }

  return null; // Return null if no article found
};

// Function to update an existing article in Firestore
const updateArticle = async (id: string, updatedData: Partial<Article>) => {
  const articleDocRef = doc(db, 'articles', id);
  await updateDoc(articleDocRef, updatedData); // Update the article with new data
};

// Function to add a new article to Firestore
const addNewArticle = async (article: Omit<Article, 'id'>) => {
  const articlesCollection = collection(db, 'articles');
  const newArticleDocRef = await addDoc(articlesCollection, article);
  return newArticleDocRef.id; // Return the ID of the newly added article
};

export { getArticleById, updateArticle, addNewArticle }; // Correctly export all functions
