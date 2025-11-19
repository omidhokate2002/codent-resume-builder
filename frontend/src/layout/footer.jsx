import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Resume Builder
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Create professional resumes that stand out and help you land your dream job. 
              Our modern, customizable templates make resume building easy and effective.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-300">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Resume Templates
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  PDF Export
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Real-time Preview
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Custom Styling
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-300">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Job Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-300">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Resume Builder. Made with{' '}
            <Heart className="inline h-4 w-4 text-red-500" />{' '}
            for job seekers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
