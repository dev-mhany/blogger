import { User, Auth, UserInfo } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { ReactNode } from 'react';

// Firebase-related types
export interface FirebaseUser extends UserInfo {
  uid: string;
  providerId: string;
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber: string | null; // Type aligns with UserInfo
}

// Authentication context
export interface FirebaseAuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  auth: Auth;
}

// Article data structure for Firestore
export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  likes: string[];
  comments: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  images?: string[];
}

// User profile data structure
export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  bio?: string;
  photoURL?: string;
  articles?: Article[];
}

// Utility types for image uploads
export interface UploadedImage {
  id?: string;
  variableName: string;
  downloadURL: string;
}

export interface UploadedImages {
  isUploading: boolean;
  uploadedImages: UploadedImage[];
  error?: string | null;
  uploadImage: (file: File) => Promise<UploadedImage>;
}

// Component props
export interface NavbarProps {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  user: User | null;
  onSignOut: () => void;
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// Context value types
export interface AuthContextValue {
  auth: Auth;
  user: FirebaseUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface FirestoreContextValue {
  fetchArticleById: (id: string) => Promise<Article | null>;
  createArticle: (article: Article) => Promise<void>;
  updateArticle: (article: Article) => Promise<void>;
  deleteArticle: (articleId: string) => Promise<void>;
}

// Error handling and API response types
export interface AppError {
  code: number;
  message: string;
  details?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: AppError;
}

// Pagination type
export interface Pagination {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}
