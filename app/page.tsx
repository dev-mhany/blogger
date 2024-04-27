import RichTextEditor from '@/components/Article/RichTextEditor';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
} from '@mui/material';
import Link from 'next/link';

const BlogLandingPage = () => {
  return (
    <main>
      {/* Hero section */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          color: 'white',
          padding: '50px 20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Your Blog
        </Typography>
        <Typography variant="body1">
          Discover articles on various topics, from technology to lifestyle.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          component={Link}
          href="/article"
        >
          Explore Blogs
        </Button>
      </Box>

      {/* Features section */}
      <Grid container spacing={4} sx={{ padding: '40px 20px' }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Rich Content</Typography>
              <Typography variant="body2">
                Our blog offers a wide range of articles with rich multimedia
                content.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Community</Typography>
              <Typography variant="body2">
                Engage with a community of like-minded individuals and share
                your thoughts.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Personalized Experience</Typography>
              <Typography variant="body2">
                Create a personalized experience with user accounts and
                customization options.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* CTA section */}
      <Box
        sx={{
          background: '#f5f5f5',
          padding: '30px 20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to Start Your Blog?
        </Typography>
        <Typography variant="body1">
          Sign up today to create your own blog and share your stories with the
          world.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          component={Link}
          href="/auth/sign-up"
        >
          Sign Up Now
        </Button>
      </Box>
    </main>
  );
};

export default BlogLandingPage;
