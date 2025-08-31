import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Container,
  Chip,
  Divider
} from '@mui/material';
import { 
  AccountCircle, 
  Add as AddIcon,
  InfoOutlined as InfoIcon,
  Login as LoginIcon,
  PersonAdd as SignUpIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Description as ResumeIcon
} from '@mui/icons-material';

export const Navigation = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleCreateResume = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Navigate directly to resume builder wizard
    navigate('/resume');
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        color: 'var(--neutral-900)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ minHeight: '70px' }}>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              fontWeight: 700,
              fontSize: '1.5rem',
              background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--secondary-600) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-500) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
              }}
            >
              RB
            </Box>
            Resume Builder
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateResume}
              sx={{ 
                textTransform: 'none',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(14, 165, 233, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Create Resume
            </Button>
            
            <Button 
              variant="outlined"
              startIcon={<InfoIcon />}
              component={Link} 
              to="/about"
              sx={{ 
                textTransform: 'none',
                borderRadius: '12px',
                px: 3,
                py: 1.5,
                borderColor: 'var(--neutral-300)',
                color: 'var(--neutral-700)',
                '&:hover': {
                  borderColor: 'var(--primary-500)',
                  color: 'var(--primary-600)',
                  background: 'rgba(14, 165, 233, 0.05)'
                }
              }}
            >
              About
            </Button>

            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  label={`Welcome, ${user?.firstName || 'User'}`}
                  color="primary"
                  variant="outlined"
                  sx={{ 
                    borderRadius: '20px',
                    borderColor: 'var(--primary-200)',
                    color: 'var(--primary-600)',
                    background: 'rgba(14, 165, 233, 0.05)'
                  }}
                />
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  sx={{
                    background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--secondary-100) 100%)',
                    border: '2px solid var(--primary-200)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, var(--primary-200) 0%, var(--secondary-200) 100%)',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {user?.avatar ? (
                    <Avatar 
                      src={user.avatar} 
                      sx={{ 
                        width: 32, 
                        height: 32,
                        border: '2px solid white'
                      }} 
                    />
                  ) : (
                    <AccountCircle sx={{ color: 'var(--primary-600)' }} />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      borderRadius: '16px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      border: '1px solid var(--neutral-200)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)'
                    }
                  }}
                >
                  <MenuItem 
                    disabled 
                    sx={{ 
                      opacity: 0.7,
                      fontWeight: 600,
                      color: 'var(--neutral-600)',
                      fontSize: '0.875rem'
                    }}
                  >
                    {user?.firstName} {user?.lastName}
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem 
                    onClick={handleClose}
                    sx={{ 
                      borderRadius: '8px',
                      mx: 1,
                      '&:hover': {
                        background: 'rgba(14, 165, 233, 0.1)'
                      }
                    }}
                  >
                    <PersonIcon sx={{ mr: 2, fontSize: 20 }} />
                    Profile
                  </MenuItem>
                  <MenuItem 
                    onClick={handleClose}
                    sx={{ 
                      borderRadius: '8px',
                      mx: 1,
                      '&:hover': {
                        background: 'rgba(14, 165, 233, 0.1)'
                      }
                    }}
                  >
                    <ResumeIcon sx={{ mr: 2, fontSize: 20 }} />
                    My Resumes
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ 
                      borderRadius: '8px',
                      mx: 1,
                      color: 'var(--error-600)',
                      '&:hover': {
                        background: 'rgba(239, 68, 68, 0.1)'
                      }
                    }}
                  >
                    <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  component={Link} 
                  to="/login"
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: '12px',
                    px: 3,
                    py: 1.5,
                    borderColor: 'var(--neutral-300)',
                    color: 'var(--neutral-700)',
                    '&:hover': {
                      borderColor: 'var(--primary-500)',
                      color: 'var(--primary-600)',
                      background: 'rgba(14, 165, 233, 0.05)'
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained"
                  startIcon={<SignUpIcon />}
                  component={Link} 
                  to="/register"
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: '12px',
                    px: 3,
                    py: 1.5,
                    background: 'linear-gradient(135deg, var(--secondary-500) 0%, var(--secondary-600) 100%)',
                    boxShadow: '0 4px 12px rgba(217, 70, 239, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-700) 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(217, 70, 239, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
