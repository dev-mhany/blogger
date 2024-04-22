import { UserInfo, Auth, User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { ReactNode } from 'react'; // Required for defining children prop

// Firebase-related types
export interface FirebaseUser extends UserInfo {
  uid: string;
  providerId: string;
  user: User;
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber: string;
}
export interface FirebaseAuthContextType {
  user: User | null; // Correct type declaration
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  auth: Auth;
}

export interface UseAuthResult {
  auth: Auth;
  user: User | null; // Authenticated user
  loading: boolean; // Loading state
  signOut: () => Promise<void>; // Sign-out function
}

export interface FirebaseAuthProviderProps {
  children: ReactNode; // The React components contained within the provider
}
// Types for Uploaded Images and Article Variables
export interface UploadedImage {
  id?: string;
  variableName: string; // The variable name for reference in React Quill
  downloadURL: string; // The Firebase Storage download URL
}

// Function signatures for expected parameters
export type ImageUploadHandler = (images: UploadedImage[]) => void;
export type InsertImageVariableHandler = (variableName: string) => void;

// Article data structure for Firestore
export interface Article {
  id: string; // Document ID
  title: string;
  content: string;
  authorId: string; // Firebase user ID
  authorName: string;
  authorImage?: string;
  likes: string[];
  comments: string[];
  firstImage?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  images?: string[];
  fetchedArticles?: Article[];
}

export interface UploadedImages {
  isUploading: boolean;
  uploadedImages: UploadedImage[];
  error: string | null;
  articleId: string | null;
  uploadArticle: (article: Omit<Article, 'id' | 'createdAt'>) => void;
  uploadImage: (file: File) => Promise<UploadedImage>;
  variableName: string; // Variable name used in the article
  downloadURL: string; // URL of the uploaded image
}
// User Profile data structure
export interface UserProfile {
  id: string; // User ID
  displayName: string;
  email: string;
  bio?: string;
  photoURL?: string;
}

// Component prop types
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

export interface ArticleProps {
  article: Article;
  onEdit: (article: Article) => void;
  onDelete: (articleId: string) => void;
}

export interface UserProfileProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export interface ArticleListProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

// Context value types
export interface AuthContextValue {
  auth: Auth;
  user: FirebaseUser;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface FirestoreContextValue {
  fetchArticleById: (id: string) => Promise<Article | null>;
  createArticle: (article: Article) => Promise<void>;
  updateArticle: (article: Article) => Promise<void>;
  deleteArticle: (articleId: string) => Promise<void>;
}

// Custom hook return types
export interface UseAuthResult {
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface UseFirestoreResult {
  articles: Article[];
  fetchArticles: () => Promise<void>;
  createArticle: (article: Article) => Promise<void>;
  updateArticle: (article: Article) => Promise<void>;
  deleteArticle: (articleId: string) => Promise<void>;
}

export interface UseThemeResult {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Utility types
export interface Pagination {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface AppError {
  code: number;
  message: string;
  details?: string;
}

export interface FormError {
  field: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: AppError;
}
