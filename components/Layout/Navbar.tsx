// components/Layout/Navbar.tsx
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ThemeToggleButton from '../Layout/ThemeToggleButton';
import { useState } from 'react';
import { useThemeContext } from '../../app/theme';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
import { NavbarProps } from '@/types/types';
import { CircularProgress } from '@mui/material';

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { user, signOut, loading } = useAuth();
  const { toggleTheme, isDarkMode } = useThemeContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar} // Correctly type `toggleSidebar`
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Blog
        </Typography>

        <ThemeToggleButton toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

        {loading ? (
          <CircularProgress sx={{ color: 'white', ml: 'auto', mr: 'auto' }} />
        ) : (
          <>
            {user ? (
              <>
                <IconButton color="inherit" onClick={handleOpenUserMenu}>
                  {user.photoURL ? (
                    <Avatar
                      alt={user.displayName ?? 'User Avatar'}
                      src={user.photoURL}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>

                <Menu
                  anchorEl={anchorElUser}
                  keepMounted
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  sx={{ mt: '45px' }}
                >
                  <MenuItem onClick={signOut}>
                    <Typography textAlign="center">Sign Out</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link href={`/user/${user.uid}`}>
                      <Typography textAlign="center">Profile</Typography>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link href="/article">
                      <Typography textAlign="center">Article</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/auth/sign-in">
                <Typography variant="body1">Sign In</Typography>
              </Link>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
