import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Linkedin, 
  Github, 
  Globe,
  ChevronRight,
  ChevronLeft,
  Save
} from 'lucide-react';
import { useResumeSpecificContext } from '../../context';

const formSteps = ['Basic Info', 'Contact Details', 'Professional Links', 'Summary'];

export const EnhancedProfileForm = ({ onNext, onSave }) => {
  const resumeContext = useResumeSpecificContext();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    linkedin: '',
    github: '',
    portfolio: '',
    website: '',
    summary: '',
    languages: [],
    availability: 'immediately',
    workAuthorization: 'authorized',
    isPublic: false
  });

  useEffect(() => {
    const existingProfile = resumeContext?.resumeById?.profile || {};
    setProfileData(prev => ({ ...prev, ...existingProfile }));
  }, [resumeContext?.resumeById]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setProfileData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 0:
        if (!profileData.firstName.trim()) newErrors.firstName = 'Required';
        if (!profileData.lastName.trim()) newErrors.lastName = 'Required';
        if (!profileData.title.trim()) newErrors.title = 'Required';
        break;
      case 1:
        if (!profileData.email.trim()) newErrors.email = 'Required';
        else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = 'Invalid email';
        if (!profileData.phone.trim()) newErrors.phone = 'Required';
        if (!profileData.city.trim()) newErrors.city = 'Required';
        if (!profileData.state.trim()) newErrors.state = 'Required';
        break;
      case 2:
        if (profileData.linkedin && !profileData.linkedin.includes('linkedin.com')) {
          newErrors.linkedin = 'Invalid LinkedIn URL';
        }
        if (profileData.github && !profileData.github.includes('github.com')) {
          newErrors.github = 'Invalid GitHub URL';
        }
        break;
      case 3:
        if (!profileData.summary.trim()) newErrors.summary = 'Required';
        else if (profileData.summary.length < 50) newErrors.summary = 'At least 50 characters';
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      if (activeStep === formSteps.length - 1) {
        handleSave();
        if (onNext) onNext();
      } else {
        setActiveStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(0, prev - 1));
  };

  const handleSave = () => {
    const updatedResume = {
      ...resumeContext?.dirtyResume,
      profile: profileData
    };
    resumeContext?.setDirtyResume(updatedResume);
    if (onSave) onSave(profileData);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-900 dark:text-white flex items-center gap-2">
                  <User className="h-4 w-4" />
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={handleChange('firstName')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="John"
                />
                {errors.firstName && <p className="text-red-500 dark:text-red-400 text-sm">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-900 dark:text-white">Last Name *</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={handleChange('lastName')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-red-500 dark:text-red-400 text-sm">{errors.lastName}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-900 dark:text-white flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Professional Title *
              </Label>
              <Input
                id="title"
                value={profileData.title}
                onChange={handleChange('title')}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="e.g., Senior Software Engineer"
              />
              {errors.title && <p className="text-red-500 dark:text-red-400 text-sm">{errors.title}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="workAuthorization" className="text-gray-900 dark:text-white">Work Authorization</Label>
                <select
                  id="workAuthorization"
                  value={profileData.workAuthorization}
                  onChange={handleChange('workAuthorization')}
                  className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3"
                >
                  <option value="authorized">Authorized to work</option>
                  <option value="visa-required">Visa sponsorship required</option>
                  <option value="student">Student visa (F-1)</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability" className="text-gray-900 dark:text-white">Availability</Label>
                <select
                  id="availability"
                  value={profileData.availability}
                  onChange={handleChange('availability')}
                  className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3"
                >
                  <option value="immediately">Immediately</option>
                  <option value="2-weeks">2 weeks notice</option>
                  <option value="1-month">1 month notice</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 dark:text-white flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleChange('email')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="text-red-500 dark:text-red-400 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-900 dark:text-white flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={handleChange('phone')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 dark:text-red-400 text-sm">{errors.phone}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Street Address
              </Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={handleChange('address')}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-gray-900 dark:text-white">City *</Label>
                <Input
                  id="city"
                  value={profileData.city}
                  onChange={handleChange('city')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="New York"
                />
                {errors.city && <p className="text-red-500 dark:text-red-400 text-sm">{errors.city}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-gray-900 dark:text-white">State *</Label>
                <Input
                  id="state"
                  value={profileData.state}
                  onChange={handleChange('state')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="NY"
                />
                {errors.state && <p className="text-red-500 dark:text-red-400 text-sm">{errors.state}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode" className="text-gray-900 dark:text-white">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={profileData.zipCode}
                  onChange={handleChange('zipCode')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="10001"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country" className="text-gray-900 dark:text-white">Country</Label>
              <select
                id="country"
                value={profileData.country}
                onChange={handleChange('country')}
                className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-gray-900 dark:text-white flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                value={profileData.linkedin}
                onChange={handleChange('linkedin')}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="https://linkedin.com/in/johndoe"
              />
              {errors.linkedin && <p className="text-red-500 dark:text-red-400 text-sm">{errors.linkedin}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="github" className="text-gray-900 dark:text-white flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub URL
              </Label>
              <Input
                id="github"
                value={profileData.github}
                onChange={handleChange('github')}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="https://github.com/johndoe"
              />
              {errors.github && <p className="text-red-500 dark:text-red-400 text-sm">{errors.github}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio" className="text-gray-900 dark:text-white flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Portfolio URL
              </Label>
              <Input
                id="portfolio"
                value={profileData.portfolio}
                onChange={handleChange('portfolio')}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="https://johndoe.dev"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-gray-900 dark:text-white flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Personal Website
              </Label>
              <Input
                id="website"
                value={profileData.website}
                onChange={handleChange('website')}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                placeholder="https://johndoe.com"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="summary" className="text-gray-900 dark:text-white">Professional Summary *</Label>
              <textarea
                id="summary"
                value={profileData.summary}
                onChange={handleChange('summary')}
                rows={8}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
              />
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {profileData.summary.length}/500 characters
              </p>
              {errors.summary && <p className="text-red-500 dark:text-red-400 text-sm">{errors.summary}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {formSteps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index === activeStep
                  ? 'bg-primary-600 text-white'
                  : index < activeStep
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            {index < formSteps.length - 1 && (
              <div className={`w-12 h-0.5 ${index < activeStep ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card className="bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">{formSteps[activeStep]}</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Step {activeStep + 1} of {formSteps.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Internal Step Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          variant="outline"
          size="sm"
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="mr-2 h-3 w-3" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          size="sm"
          className="bg-primary-600 hover:bg-primary-700"
        >
          {activeStep === formSteps.length - 1 ? (
            <>
              <Save className="mr-2 h-3 w-3" />
              Complete
            </>
          ) : (
            <>
              Next Step
              <ChevronRight className="ml-2 h-3 w-3" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
