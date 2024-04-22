'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import ThemeConfigProvider from '../../app/theme';
import { useState } from 'react';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const { user, signOut } = useAuth(); // `user` may be `null`

  return (
    <ThemeConfigProvider>
      <Navbar
        user={user}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        toggleSidebar={toggleSidebar}
        onSignOut={signOut}
      />
      <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />
      <main style={{ minHeight: '80vh' }}>{children}</main>
      <Footer />
    </ThemeConfigProvider>
  );
};

export default Layout;
