import { Navigation, Footer } from '../layout';

// Unified layout component for consistent design
export const Layout = ({ children, fullWidth = false, removeNavigation = false, removeFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {!removeNavigation && <Navigation />}
      
      <main className={`flex-grow ${fullWidth ? 'w-full' : ''}`}>
        {children}
      </main>
      
      {!removeFooter && <Footer />}
    </div>
  );
};
