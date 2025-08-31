import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import { 
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Favorite as HeartIcon
} from '@mui/icons-material';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, var(--neutral-900) 0%, var(--neutral-800) 100%)',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(135deg, var(--primary-400) 0%, var(--secondary-400) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Resume Builder
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--neutral-300)', lineHeight: 1.6 }}>
                Create professional resumes that stand out and help you land your dream job. 
                Our modern, customizable templates make resume building easy and effective.
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton
                sx={{
                  color: 'var(--neutral-300)',
                  '&:hover': {
                    color: 'var(--primary-400)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: 'var(--neutral-300)',
                  '&:hover': {
                    color: 'var(--primary-400)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: 'var(--neutral-300)',
                  '&:hover': {
                    color: 'var(--primary-400)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: 'var(--neutral-300)',
                  '&:hover': {
                    color: 'var(--primary-400)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <EmailIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'var(--primary-300)' }}>
              Features
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Resume Templates
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                PDF Export
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Real-time Preview
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Custom Styling
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'var(--primary-300)' }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Resume Tips
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Career Advice
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Interview Prep
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Job Search
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'var(--primary-300)' }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                About Us
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Contact
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Privacy Policy
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Terms of Service
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'var(--primary-300)' }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Help Center
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                FAQ
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Feedback
              </Link>
              <Link href="#" sx={{ color: 'var(--neutral-300)', textDecoration: 'none', '&:hover': { color: 'var(--primary-400)' } }}>
                Status
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Box
          sx={{
            borderTop: '1px solid var(--neutral-700)',
            mt: 4,
            pt: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" sx={{ color: 'var(--neutral-400)' }}>
            © {currentYear} Resume Builder. Made with{' '}
            <HeartIcon sx={{ fontSize: 16, color: 'var(--error-400)', verticalAlign: 'middle' }} />
            {' '}for job seekers worldwide.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
