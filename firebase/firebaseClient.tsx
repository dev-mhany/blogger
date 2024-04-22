// │   ├── firebaseClient.ts               # Firebase initialization for client-side
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCslefL1N7K5QUmrZpQ42L0Se-hlPQ7qB4',
  authDomain: 'bloggerv22.firebaseapp.com',
  projectId: 'bloggerv22',
  storageBucket: 'bloggerv22.appspot.com',
  messagingSenderId: '36435236441',
  appId: '1:36435236441:web:cb4867a59a8bb8b25a4348',
  measurementId: 'G-XV3GZLDLP2',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage, db, app };
