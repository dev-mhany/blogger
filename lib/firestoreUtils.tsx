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

const getArticleById = async (id: string): Promise<Article | null> => {
  const articleDocRef = doc(db, 'articles', id);
  const articleDoc = await getDoc(articleDocRef);

  if (articleDoc.exists()) {
    return {
      ...articleDoc.data(),
      id: articleDoc.id,
    } as Article;
  }

  return null;
};

const updateArticle = async (id: string, updatedData: Partial<Article>) => {
  const articleDocRef = doc(db, 'articles', id);
  await updateDoc(articleDocRef, updatedData);
};

const addNewArticle = async (article: Omit<Article, 'id'>) => {
  const articlesCollection = collection(db, 'articles');
  const newArticleDocRef = await addDoc(articlesCollection, article);
  return newArticleDocRef.id;
};

export { getArticleById, updateArticle, addNewArticle };
