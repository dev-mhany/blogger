import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from 'next/link'; // For navigation between pages
import { SidebarProps } from '../../types/types';

const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItem onClick={onClose}>
          <Link href="/" passHref>
            <ListItemText primary="Home" />
          </Link>
        </ListItem>

        <Divider />

        <ListItem onClick={onClose}>
          <Link href="/settings" passHref>
            <ListItemText primary="Settings" />
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
