import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const uploadImages = async (files: File[]): Promise<string[]> => {
  const storage = getStorage();
  const imageUrls: string[] = []; // Initialize as an array of strings

  for (const file of files) {
    const storageRef = ref(storage, `articles/images/${uuidv4()}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    imageUrls.push(downloadUrl); // Add download URL (a string) to the array
  }

  return imageUrls; // Should be an array of strings
};

export default uploadImages;
