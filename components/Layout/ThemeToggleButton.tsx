import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon for light mode
import NightsStayIcon from '@mui/icons-material/NightsStay'; // Moon icon for dark mode
import { useTheme } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material'; // For consistent styling and theme types

interface ThemeToggleButtonProps {
  toggleTheme: () => void; // Function to toggle the theme
  isDarkMode: boolean; // Indicates current theme mode
}

const ThemeToggleButton = ({
  toggleTheme,
  isDarkMode,
}: ThemeToggleButtonProps) => {
  const theme = useTheme();

  // Style object for transition effects
  const transitionEffect: SxProps<Theme> = {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    }),
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
      {isDarkMode ? (
        <Brightness7Icon
          sx={{
            ...transitionEffect, // Apply the transition effect
            transform: 'rotate(0deg)', // No rotation for light mode
          }}
        />
      ) : (
        <NightsStayIcon
          sx={{
            ...transitionEffect,
            transform: 'rotate(-20deg)', // Slight rotation for dark mode
          }}
        />
      )}
    </IconButton>
  );
};

export default ThemeToggleButton;
