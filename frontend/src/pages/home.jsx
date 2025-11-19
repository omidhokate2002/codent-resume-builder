import { ResumeCard } from "../apps/home";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { 
  Sparkles, 
  FileText, 
  Download, 
  Shield, 
  Zap, 
  CheckCircle2,
  Info,
  ArrowRight,
  Target,
  Search,
  FileCheck
} from "lucide-react";
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
      icon: <Sparkles className="h-10 w-10 text-primary-500" />,
      title: "Easy Creation",
      description: "Create professional resumes in minutes with our intuitive interface."
    },
    {
      icon: <FileText className="h-10 w-10 text-secondary-500" />,
      title: "Smart Editing",
      description: "Real-time preview and instant updates as you edit your resume content."
    },
    {
      icon: <Download className="h-10 w-10 text-green-500" />,
      title: "Multiple Formats",
      description: "Export your resume in PDF and Word formats for any application."
    },
    {
      icon: <Shield className="h-10 w-10 text-red-500" />,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never share your personal information."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary-600" />,
      title: "Lightning Fast",
      description: "Optimized for speed with instant saves and real-time updates."
    },
    {
      icon: <Target className="h-10 w-10 text-purple-500" />,
      title: "ATS Optimized",
      description: "All templates are designed to pass Applicant Tracking Systems with ease."
    }
  ];

  const atsFeatures = [
    "Clean, simple formatting that ATS systems can easily parse",
    "Standard section headers (Experience, Education, Skills)",
    "Keyword optimization suggestions",
    "No complex graphics or tables that confuse scanners",
    "Proper date formatting and consistent structure",
    "Compatible with major ATS platforms (Workday, Taleo, Greenhouse, etc.)"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4" />
                Professional Resume Builder
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-400">
                  Create Stunning Resumes
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  That Get You Hired
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Build professional resumes with our modern, ATS-friendly templates. 
                Stand out from the crowd and land your dream job.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="text-lg px-8 py-6 h-auto"
                >
                  {isAuthenticated ? 'Create Resume' : 'Get Started Free'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="text-lg px-8 py-6 h-auto"
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/30 dark:border-gray-700 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl flex items-center justify-center">
                  <FileText className="h-32 w-32 text-primary-400 opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATS-Friendly Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">ATS-Friendly Templates</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What is ATS and Why Does It Matter?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Applicant Tracking Systems (ATS) are software used by employers to filter resumes before they reach human recruiters. 
              Our templates are specifically designed to pass these systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-primary-200 dark:border-primary-800">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <Search className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <CardTitle className="text-xl">How ATS Works</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  When you submit your resume online, it first goes through an ATS that scans for keywords, 
                  skills, and qualifications. If your resume isn't formatted correctly, it might be rejected 
                  before a human ever sees it.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Scans for relevant keywords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Extracts contact information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Parses work history and education</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary-200 dark:border-secondary-800">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-lg bg-secondary-100 dark:bg-secondary-900/30">
                    <Target className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <CardTitle className="text-xl">Why It Matters</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Studies show that up to 75% of resumes are rejected by ATS before reaching a recruiter. 
                  Using an ATS-friendly format dramatically increases your chances of getting noticed.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Higher chance of passing initial screening</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Better keyword matching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">More interview opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary-500 dark:bg-primary-600">
                  <FileCheck className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl">Our ATS-Friendly Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {atsFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to create a professional resume that stands out
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Cards Section */}
      {isAuthenticated && (
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Your Previous Resumes
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Continue working on your existing resumes or create a new one
              </p>
            </div>
            
            <ResumeCard />
          </div>
        </section>
      )}
    </Layout>
  );
};

export default HomePage;
