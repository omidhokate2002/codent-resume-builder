import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import { 
  Moon, 
  Sun, 
  Menu, 
  X,
  User,
  FileText,
  LogOut,
  Plus,
  Info
} from "lucide-react";

export const Navigation = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleCreateResume = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/resume');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg">
              RB
            </div>
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-400">
              Resume Builder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="default"
              onClick={handleCreateResume}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Resume
            </Button>
            
            <Button
              variant="ghost"
              asChild
            >
              <Link to="/about" className="gap-2">
                <Info className="h-4 w-4" />
                About
              </Link>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="h-9 w-9 rounded-full"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.firstName}
                      className="h-9 w-9 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-background shadow-lg dark:bg-gray-800">
                    <div className="p-2">
                      <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="border-t my-1"></div>
                      <button
                        onClick={() => {
                          navigate('/');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-sm"
                      >
                        <FileText className="h-4 w-4" />
                        My Resumes
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-sm"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            <Button
              variant="default"
              onClick={handleCreateResume}
              className="w-full gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Resume
            </Button>
            <Button variant="ghost" asChild className="w-full">
              <Link to="/about" className="gap-2">
                <Info className="h-4 w-4" />
                About
              </Link>
            </Button>
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild className="w-full">
                  <Link to="/" className="gap-2">
                    <FileText className="h-4 w-4" />
                    My Resumes
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="w-full">
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" asChild className="w-full">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
