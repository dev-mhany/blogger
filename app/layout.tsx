import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeConfigProvider from './theme'; // Adjust path to your ThemeConfigProvider
import Layout from '../components/Layout/Layout'; // Import the Layout component
import FirebaseAuthProvider from '../context/FirebaseAuthProvider';
import './globals.css'; // Import global CSS styles

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Developer Blog',
  description:
    'Publish your passions, your way. Create a unique and beautiful blog easily. Next.js app with MUI and Firebase.',
  openGraph: {
    url: 'https://dev-blog-self.vercel.app/',
    type: 'website',
    title: 'Developer Blog',
    description:
      'Publish your passions, your way. Create a unique and beautiful blog easily. Next.js app with MUI and Firebase.',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/documents/23e662a7-4396-46ad-bd47-fe1f0befdcd0.png?token=cx-r6RGTVFxQNrdIYkaxpQmF-vpi98OldQDjfuVr1So&height=1024&width=1024&expires=33250179657',
        alt: 'Developer Blog',
        width: 1024,
        height: 1024,
      },
    ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   domain: 'dev-blog-self.vercel.app',
  //   url: 'https://dev-blog-self.vercel.app/',
  //   title: 'Developer Blog',
  //   description: 'Publish your passions, your way. Create a unique and beautiful blog easily. Next.js app with MUI and Firebase.',
  //   images: [
  //     'https://opengraph.b-cdn.net/production/documents/23e662a7-4396-46ad-bd47-fe1f0befdcd0.png?token=cx-r6RGTVFxQNrdIYkaxpQmF-vpi98OldQDjfuVr1So&height=1024&width=1024&expires=33250179657',
  //   ],
  // },
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
