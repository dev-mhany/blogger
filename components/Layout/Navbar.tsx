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

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  // Use NavbarProps for correct type
  const { user, signOut } = useAuth();
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
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Blog
        </Typography>

        <ThemeToggleButton toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

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
                <Link href="/profile">
                  <Typography textAlign="center">Profile</Typography>
                </Link>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <Link href="/dashboard">
                  <Typography textAlign="center">Dashboard</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Link href="/auth/sign-in">
            <Typography variant="body1">Sign In</Typography>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
