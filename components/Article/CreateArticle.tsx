import { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseClient';
import { storage } from '../../firebase/firebaseClient';
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from 'firebase/storage';
import useAuth from '../../hooks/useAuth';
import { Article, UploadedImage } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

const CreateArticle = () => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const uploadImages = async (files: File[]): Promise<UploadedImage[]> => {
    if (!user) {
      setError('User must be authenticated to upload images.');
      return [];
    }

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
          setError(`Failed to upload image: ${e.message}`);
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

    try {
      setError(null);
      setIsUploading(true);

      const uploadedImagesData = await uploadImages(files);
      setUploadedImages(uploadedImagesData);

      const articleData = {
        title: article.title,
        content: article.content,
        authorId: user.uid,
        authorName: user.displayName ?? 'Anonymous',
        likes: [],
        comments: [],
        images: uploadedImagesData.map((img) => img.downloadURL),
      };

      const docRef = await addDoc(collection(db, 'articles'), {
        ...articleData,
        createdAt: Timestamp.now(),
      });

      setArticleId(docRef.id);
    } catch (e) {
      if (e instanceof Error) {
        setError(`Failed to upload article: ${e.message}`);
      } else {
        setError('Failed to upload the article.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    error,
    articleId,
    uploadedImages,
    uploadArticle,
    uploadImages,
  };
};

export default CreateArticle;
