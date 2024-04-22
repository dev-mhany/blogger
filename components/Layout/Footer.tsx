// Footer component
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box component="footer" sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Developer Blog. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
