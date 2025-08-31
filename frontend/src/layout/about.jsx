import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { 
  Work as WorkIcon,

  Code as CodeIcon,
  BrushOutlined as DesignIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Person as PersonIcon,
  Email as EmailIcon,

} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Full Stack Developer",
      description: "Passionate about creating seamless user experiences and robust backend systems.",
      avatar: "JD"
    },
    {
      name: "Jane Smith",
      role: "UI/UX Designer",
      description: "Dedicated to crafting beautiful and intuitive interfaces that users love.",
      avatar: "JS"
    },
    {
      name: "Mike Johnson",
      role: "Product Manager",
      description: "Focused on delivering value to users through strategic product development.",
      avatar: "MJ"
    }
  ];

  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: 'var(--primary-500)' }} />,
      title: "Professional Templates",
      description: "Choose from a variety of professionally designed templates that suit your industry and experience level."
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40, color: 'var(--secondary-500)' }} />,
      title: "Easy Customization",
      description: "Customize every aspect of your resume with our intuitive drag-and-drop editor."
    },
    {
      icon: <DesignIcon sx={{ fontSize: 40, color: 'var(--success-500)' }} />,
      title: "Modern Design",
      description: "Create resumes with contemporary design principles that stand out to employers."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'var(--warning-500)' }} />,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never share your personal information."
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'var(--error-500)' }} />,
      title: "Lightning Fast",
      description: "Optimized for speed with instant saves and real-time collaboration features."
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(217, 70, 239, 0.1) 100%)',
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--secondary-600) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            About Resume Builder
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'var(--neutral-600)',
              maxWidth: 800,
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6
            }}
          >
            We're on a mission to help job seekers create professional resumes that get them hired. 
            Our platform combines modern design with powerful features to make resume building effortless.
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="large"
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
            Get Started Today
          </Button>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 3,
                  color: 'var(--neutral-900)'
                }}
              >
                Our Mission
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--neutral-600)',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                We believe everyone deserves to have a professional resume that showcases their skills and experience effectively. 
                Our platform is designed to make the resume creation process simple, fast, and enjoyable.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'var(--neutral-600)',
                  fontSize: '1.1rem',
                  lineHeight: 1.8
                }}
              >
                Whether you're a recent graduate or an experienced professional, our tools help you create 
                resumes that stand out in today's competitive job market.
              </Typography>
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
                  <PersonIcon sx={{ fontSize: 80, color: 'var(--primary-400)', opacity: 0.6 }} />
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
              Why Choose Resume Builder?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'var(--neutral-600)',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Everything you need to create a professional resume that gets you noticed
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

      {/* Team Section */}
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
              Meet Our Team
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'var(--neutral-600)',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              The passionate people behind Resume Builder
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
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
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-500) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {member.avatar}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: 'var(--neutral-900)'
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'var(--primary-600)',
                        fontWeight: 500,
                        mb: 2
                      }}
                    >
                      {member.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'var(--neutral-600)',
                        lineHeight: 1.6
                      }}
                    >
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: 'rgba(255, 255, 255, 0.5)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 3,
                color: 'var(--neutral-900)'
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'var(--neutral-600)',
                maxWidth: 600,
                mx: 'auto',
                mb: 4
              }}
            >
              Have questions or feedback? We'd love to hear from you!
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Button
                startIcon={<EmailIcon />}
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: '12px',
                  px: 4,
                  py: 2,
                  borderColor: 'var(--primary-300)',
                  color: 'var(--primary-600)',
                  '&:hover': {
                    borderColor: 'var(--primary-500)',
                    background: 'rgba(14, 165, 233, 0.05)'
                  }
                }}
              >
                Contact Us
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '12px',
                  px: 4,
                  py: 2,
                  background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                  boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(14, 165, 233, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Start Building
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
