import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Grid
} from '@mui/material';
import { Layout } from '../components/Layout';
import { 
  PersonAdd as PersonAddIcon, 
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  Lock as LockIcon
} from '@mui/icons-material';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await register(formData);
      if (result.success) {
        toast.success('Registration successful! Welcome to Resume Builder!');
        navigate('/');
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: 'calc(100vh - 200px)',
          display: 'flex',
          alignItems: 'center',
          py: 4
        }}
      >
        <Container component="main" maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(135deg, var(--secondary-500) 0%, var(--primary-500) 100%)'
            }
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, var(--secondary-500) 0%, var(--secondary-600) 100%)',
              p: 4,
              textAlign: 'center',
              color: 'white'
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <PersonAddIcon sx={{ fontSize: 40 }} />
            </Box>
            
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                mb: 1
              }}
            >
              Join Resume Builder
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.9,
                fontSize: '1.1rem'
              }}
            >
              Create your account and start building professional resumes
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'var(--neutral-400)' }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&:hover fieldset': {
                          borderColor: 'var(--secondary-300)'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'var(--secondary-500)'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    disabled={isSubmitting}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'var(--neutral-400)' }} />
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&:hover fieldset': {
                          borderColor: 'var(--secondary-300)'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'var(--secondary-500)'
                        }
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={isSubmitting}
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: 'var(--neutral-400)' }} />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: 'var(--secondary-300)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--secondary-500)'
                    }
                  }
                }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                disabled={isSubmitting}
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: 'var(--neutral-400)' }} />,
                  endAdornment: (
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ 
                        minWidth: 'auto', 
                        p: 1,
                        color: 'var(--neutral-400)',
                        '&:hover': {
                          background: 'rgba(217, 70, 239, 0.1)'
                        }
                      }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </Button>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: 'var(--secondary-300)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--secondary-500)'
                    }
                  }
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                disabled={isSubmitting}
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: 'var(--neutral-400)' }} />,
                  endAdornment: (
                    <Button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      sx={{ 
                        minWidth: 'auto', 
                        p: 1,
                        color: 'var(--neutral-400)',
                        '&:hover': {
                          background: 'rgba(217, 70, 239, 0.1)'
                        }
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </Button>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: 'var(--secondary-300)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--secondary-500)'
                    }
                  }
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <PersonAddIcon />}
                sx={{
                  mt: 4,
                  mb: 3,
                  py: 2,
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, var(--secondary-500) 0%, var(--secondary-600) 100%)',
                  boxShadow: '0 8px 25px rgba(217, 70, 239, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-700) 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(217, 70, 239, 0.4)'
                  },
                  '&:disabled': {
                    background: 'var(--neutral-300)',
                    transform: 'none',
                    boxShadow: 'none'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
              
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'var(--neutral-500)' }}>
                  Already have an account?
                </Typography>
              </Divider>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ color: 'var(--neutral-600)', mb: 2 }}>
                  Sign in to your existing account
                </Typography>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: '12px',
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderColor: 'var(--secondary-300)',
                    color: 'var(--secondary-600)',
                    '&:hover': {
                      borderColor: 'var(--secondary-500)',
                      background: 'rgba(217, 70, 239, 0.05)',
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
      </Box>
    </Layout>
  );
};

export default Register;
