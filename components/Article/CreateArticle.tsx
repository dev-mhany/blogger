import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';
import { storage, db } from '../../firebase/firebaseClient';
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from 'firebase/storage';
import useAuth from '../../hooks/useAuth';
import { Article, UploadedImage } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const CreateArticle = () => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articleId, setArticleId] = useState<string | null>(null);

  const uploadImages = async (files: File[]): Promise<UploadedImage[]> => {
    const uploadedImagesData: UploadedImage[] = [];
    setIsUploading(true);

    for (const file of files) {
      try {
        const fileRef = storageRef(storage, `images/${uuidv4()}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        uploadedImagesData.push({
          variableName: file.name,
          downloadURL,
        });
      } catch (e) {
        if (e instanceof Error) {
          setError(`Failed to upload image: ${e.message}`); // Handle specific error
        } else {
          setError('Failed to upload image due to an unknown error.'); // Generic error message
        }
      }
    }

    setIsUploading(false);
    return uploadedImagesData;
  };

  const uploadArticle = async (
    article: Omit<Article, 'id' | 'createdAt'>,
    files: File[]
  ) => {
    if (!user) {
      setError('User must be authenticated to upload articles.');
      return;
    }

    setError(null);
    setIsUploading(true);

    const uploadedImagesData = await uploadImages(files);
    const articleData = {
      title: article.title,
      content: article.content,
      authorId: user.uid,
      authorName: user.displayName ?? 'Anonymous',
      images: uploadedImagesData.map((img) => img.downloadURL),
    };

    const docRef = await addDoc(collection(db, 'articles'), {
      ...articleData,
      createdAt: Timestamp.now(),
    });

    setArticleId(docRef.id);

    // Add the article ID to the user's document
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      articles: arrayUnion(docRef.id),
    });

    setIsUploading(false);
  };

  return {
    isUploading,
    error,
    articleId,
    uploadArticle,
    uploadImages,
  };
};

export default CreateArticle;
