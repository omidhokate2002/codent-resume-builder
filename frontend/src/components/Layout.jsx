import { Box } from '@mui/material';
import { Navigation, Footer } from '../layout';

// Unified layout component for consistent design
export const Layout = ({ children, fullWidth = false, removeNavigation = false, removeFooter = false }) => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%)'
      }}
    >
      {!removeNavigation && <Navigation />}
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: fullWidth ? '100%' : 'auto'
        }}
      >
        {children}
      </Box>
      
      {!removeFooter && <Footer />}
    </Box>
  );
};
