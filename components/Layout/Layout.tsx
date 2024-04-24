'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import ThemeConfigProvider from '../../app/theme';
import { useState } from 'react';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth';
import { NavbarProps, SidebarProps } from '@/types/types'; // Ensure correct types

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const { user, signOut } = useAuth();

  return (
    <ThemeConfigProvider>
      <Navbar
        user={user} // Ensure user is passed correctly
        toggleTheme={toggleTheme} // Correct prop for theme toggle
        isDarkMode={isDarkMode} // Correct boolean prop
        toggleSidebar={toggleSidebar} // Ensure correct function prop
        onSignOut={signOut} // Ensure sign-out function
      />
      <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
    </ThemeConfigProvider>
  );
};

export default Layout;
