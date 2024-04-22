'use client';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useMemo, useContext, createContext, ReactNode } from 'react';

interface ThemeConfigProviderProps {
  children: ReactNode;
}

interface ThemeContextValue {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const ThemeConfigProvider = ({ children }: ThemeConfigProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Memoize the context value to avoid re-rendering
  const themeContextValue = useMemo(
    () => ({ isDarkMode, toggleTheme }),
    [isDarkMode] // Recompute only when `isDarkMode` changes
  );

  const theme = useMemo(() => {
    return createTheme({
      spacing: 8,
      palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: {
          main: '#1a73e8',
        },
        secondary: {
          main: '#ff9100',
        },
        background: {
          default: isDarkMode ? '#121212' : '#ffffff',
          paper: isDarkMode ? '#242424' : '#f5f5f5',
        },
        text: {
          primary: isDarkMode ? '#ffffff' : '#2e2e2e',
          secondary: isDarkMode ? '#b0b0b0' : '#5e5e5e',
        },
      },
    });
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeConfigProvider;

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useThemeContext must be used within a ThemeConfigProvider'
    );
  }
  return context;
};
