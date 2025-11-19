import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  LogIn,
  Info,
  Copy,
  Check
} from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTestCredentials, setShowTestCredentials] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const { login, isAuthenticated, error, clearError } = useAuth();
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

  // Close popover when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showTestCredentials && !event.target.closest('.test-credentials-container')) {
        // Only close on mobile (touch devices)
        if (!window.matchMedia('(hover: hover)').matches) {
          setShowTestCredentials(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showTestCredentials]);

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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
      const result = await login(formData);
      if (result.success) {
        toast.success('Login successful!');
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

  const testCredentials = {
    email: 'johnnytest@gmail.com',
    password: '123456789'
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), 2000);
      }
      toast.success(`${type === 'email' ? 'Email' : 'Password'} copied to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md relative">
          <Card className="w-full border-2 shadow-xl">
            <div className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            
            <CardHeader className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center pb-8">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-10 w-10 text-white" />
            </div>
            
            <CardTitle className="text-2xl font-bold text-white">
              Welcome Back
            </CardTitle>
            
            <CardDescription className="text-white/90 text-base">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {/* Read Me Button - Outside Form, Above Login Button */}
            <div className="relative mb-4 flex justify-start test-credentials-container">
              <button
                type="button"
                onClick={() => {
                  // Toggle on click for mobile, show on hover for desktop
                  if (!window.matchMedia('(hover: hover)').matches) {
                    setShowTestCredentials(!showTestCredentials);
                  }
                }}
                onMouseEnter={(e) => {
                  // Only show on hover for desktop (non-touch devices)
                  if (window.matchMedia('(hover: hover)').matches) {
                    setShowTestCredentials(true);
                  }
                }}
                onMouseLeave={(e) => {
                  // Only hide on mouse leave for desktop
                  if (window.matchMedia('(hover: hover)').matches) {
                    setShowTestCredentials(false);
                  }
                }}
                className="relative inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Info className="h-4 w-4" />
                <span>Read Me</span>
                
                {/* Tooltip/Popover */}
                {showTestCredentials && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 md:w-72" onClick={(e) => e.stopPropagation()}>
                    <div className="space-y-2">
                      <h3 className="text-white font-semibold text-sm mb-3">Test Credentials</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-gray-400 text-xs">Email:</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(testCredentials.email, 'email');
                              }}
                              className="p-1 hover:bg-gray-700 rounded transition-colors"
                              title="Copy email"
                            >
                              {copiedEmail ? (
                                <Check className="h-3 w-3 text-green-400" />
                              ) : (
                                <Copy className="h-3 w-3 text-gray-400 hover:text-white" />
                              )}
                            </button>
                          </div>
                          <p className="text-white text-sm font-mono break-all">{testCredentials.email}</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-gray-400 text-xs">Password:</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(testCredentials.password, 'password');
                              }}
                              className="p-1 hover:bg-gray-700 rounded transition-colors"
                              title="Copy password"
                            >
                              {copiedPassword ? (
                                <Check className="h-3 w-3 text-green-400" />
                              ) : (
                                <Copy className="h-3 w-3 text-gray-400 hover:text-white" />
                              )}
                            </button>
                          </div>
                          <p className="text-white text-sm font-mono">{testCredentials.password}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData({
                            email: testCredentials.email,
                            password: testCredentials.password
                          });
                          setShowTestCredentials(false);
                        }}
                        className="mt-3 w-full px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded transition-colors"
                      >
                        Use Test Credentials
                      </button>
                    </div>
                    {/* Arrow - pointing down */}
                    <div className="absolute -bottom-2 left-4 w-4 h-4 bg-gray-800 border-r border-b border-gray-700 transform rotate-45"></div>
                  </div>
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </>
                )}
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    New to Resume Builder?
                  </span>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Don't have an account yet?
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                  size="lg"
                >
                  <Link to="/register">Create Account</Link>
                </Button>
              </div>
            </form>
          </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
