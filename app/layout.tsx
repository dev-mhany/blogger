import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeConfigProvider from './theme'; // Adjust path to your ThemeConfigProvider
import Layout from '../components/Layout/Layout'; // Import the Layout component
import FirebaseAuthProvider from '../context/FirebaseAuthProvider';
import './globals.css'; // Import global CSS styles

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Developer Blog',
  description: 'A Next.js app with MUI and Firebase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <FirebaseAuthProvider>
        <ThemeConfigProvider>
          <body className={inter.className}>
            <Layout>{children}</Layout>
          </body>
        </ThemeConfigProvider>
      </FirebaseAuthProvider>
    </html>
  );
}
