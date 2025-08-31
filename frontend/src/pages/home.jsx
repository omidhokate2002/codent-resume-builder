import { ResumeCard } from "../apps/home";
import { Footer, Navigation } from "../layout";
import { useAuth } from "../context/AuthContext";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Chip
} from '@mui/material';
import { 
  Create as CreateIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/resume');
    } else {
      navigate('/register');
    }
  };

  const features = [
    {
      icon: <CreateIcon sx={{ fontSize: 40, color: 'var(--primary-500)' }} />,
      title: "Easy Creation",
      description: "Create professional resumes in minutes with our intuitive drag-and-drop interface."
    },
    {
      icon: <EditIcon sx={{ fontSize: 40, color: 'var(--secondary-500)' }} />,
      title: "Smart Editing",
      description: "Real-time preview and instant updates as you edit your resume content."
    },
    {
      icon: <DownloadIcon sx={{ fontSize: 40, color: 'var(--success-500)' }} />,
      title: "Multiple Formats",
      description: "Export your resume in PDF, Word, or HTML formats for any application."
    },
    {
      icon: <ShareIcon sx={{ fontSize: 40, color: 'var(--warning-500)' }} />,
      title: "Easy Sharing",
      description: "Share your resume with potential employers via direct links or downloads."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'var(--error-500)' }} />,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never share your personal information."
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'var(--primary-600)' }} />,
      title: "Lightning Fast",
      description: "Optimized for speed with instant saves and real-time collaboration."
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)' }}>
      <Navigation />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(217, 70, 239, 0.1) 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Chip
                  label="✨ Professional Resume Builder"
                  color="primary"
                  sx={{ 
                    mb: 3,
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-500) 100%)',
                    color: 'white',
                    fontWeight: 600
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    lineHeight: 1.2,
                    mb: 3,
                    background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--secondary-600) 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Create Stunning Resumes That Get You Hired
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'var(--neutral-600)',
                    mb: 4,
                    lineHeight: 1.6,
                    fontWeight: 400
                  }}
                >
                  Build professional resumes with our modern, customizable templates. 
                  Stand out from the crowd and land your dream job.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    onClick={handleGetStarted}
                    variant="contained"
                    size="large"
                    startIcon={<CreateIcon />}
                    sx={{
                      px: 4,
                      py: 2,
                      borderRadius: '16px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                      boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 35px rgba(14, 165, 233, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isAuthenticated ? 'Create Resume' : 'Get Started Free'}
                  </Button>
                  <Button
                    component={Link}
                    to="/about"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 2,
                      borderRadius: '16px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderColor: 'var(--neutral-300)',
                      color: 'var(--neutral-700)',
                      '&:hover': {
                        borderColor: 'var(--primary-500)',
                        color: 'var(--primary-600)',
                        background: 'rgba(14, 165, 233, 0.05)'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '24px',
                  p: 4,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    background: 'linear-gradient(135deg, var(--primary-500), var(--secondary-500))',
                    borderRadius: '26px',
                    zIndex: -1,
                    opacity: 0.3
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--secondary-100) 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <PaletteIcon sx={{ fontSize: 80, color: 'var(--primary-400)', opacity: 0.6 }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '20%',
                      left: '20%',
                      width: 60,
                      height: 60,
                      background: 'var(--secondary-300)',
                      borderRadius: '50%',
                      opacity: 0.4
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '30%',
                      right: '15%',
                      width: 40,
                      height: 40,
                      background: 'var(--primary-300)',
                      borderRadius: '50%',
                      opacity: 0.4
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
                color: 'var(--neutral-900)'
              }}
            >
              Why Choose Our Resume Builder?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'var(--neutral-600)',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Everything you need to create a professional resume that stands out
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: 'var(--neutral-900)'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'var(--neutral-600)',
                        lineHeight: 1.6
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Resume Cards Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: 'rgba(255, 255, 255, 0.5)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
                color: 'var(--neutral-900)'
              }}
            >
              Your Previous Resumes
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'var(--neutral-600)',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Continue working on your existing resumes or create a new one
            </Typography>
          </Box>
          
          <ResumeCard />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;
