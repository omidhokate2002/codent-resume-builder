import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
  Switch,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Language as LanguageIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Web as WebIcon,
  Save as SaveIcon,
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon
} from '@mui/icons-material';
import { useResumeSpecificContext } from '../../context';

const steps = ['Basic Info', 'Contact Details', 'Professional Links', 'Summary'];

export const EnhancedProfileForm = ({ onNext, onSave }) => {
  const resumeContext = useResumeSpecificContext();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});


  const [profileData, setProfileData] = useState({
    // Basic Information
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Professional Links
    linkedin: '',
    github: '',
    portfolio: '',
    website: '',
    
    // Additional
    summary: '',
    languages: [],
    availability: 'immediately',
    workAuthorization: 'authorized',
    
    // Privacy
    isPublic: false
  });

  // Load existing data
  useEffect(() => {
    const existingProfile = resumeContext?.resumeById?.profile || {};
    setProfileData(prev => ({
      ...prev,
      ...existingProfile
    }));
  }, [resumeContext?.resumeById]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleLanguageAdd = (language) => {
    if (language && !profileData.languages.includes(language)) {
      setProfileData(prev => ({
        ...prev,
        languages: [...prev.languages, language]
      }));
    }
  };

  const handleLanguageRemove = (language) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== language)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0: // Basic Info
        if (!profileData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!profileData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!profileData.title.trim()) newErrors.title = 'Professional title is required';
        break;
      case 1: // Contact Details
        if (!profileData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = 'Email is invalid';
        if (!profileData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!profileData.city.trim()) newErrors.city = 'City is required';
        if (!profileData.state.trim()) newErrors.state = 'State is required';
        break;
      case 2: // Professional Links
        if (profileData.linkedin && !profileData.linkedin.includes('linkedin.com')) {
          newErrors.linkedin = 'Please enter a valid LinkedIn URL';
        }
        if (profileData.github && !profileData.github.includes('github.com')) {
          newErrors.github = 'Please enter a valid GitHub URL';
        }
        break;
      case 3: // Summary
        if (!profileData.summary.trim()) newErrors.summary = 'Professional summary is required';
        else if (profileData.summary.length < 50) newErrors.summary = 'Summary should be at least 50 characters';
        else if (profileData.summary.length > 500) newErrors.summary = 'Summary should not exceed 500 characters';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSave = () => {
    if (validateStep(activeStep)) {
      const updatedResume = {
        ...resumeContext?.dirtyResume,
        profile: profileData
      };
      resumeContext?.setDirtyResume(updatedResume);
      if (onSave) onSave(profileData);
    }
  };

  const renderBasicInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="First Name"
          value={profileData.firstName}
          onChange={handleChange('firstName')}
          error={!!errors.firstName}
          helperText={errors.firstName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="primary" />
              </InputAdornment>
            ),
          }}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Last Name"
          value={profileData.lastName}
          onChange={handleChange('lastName')}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Professional Title"
          value={profileData.title}
          onChange={handleChange('title')}
          error={!!errors.title}
          helperText={errors.title || 'e.g., Senior Software Engineer, Marketing Manager'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WorkIcon color="primary" />
              </InputAdornment>
            ),
          }}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Work Authorization</InputLabel>
          <Select
            value={profileData.workAuthorization}
            onChange={handleChange('workAuthorization')}
            label="Work Authorization"
          >
            <MenuItem value="authorized">Authorized to work</MenuItem>
            <MenuItem value="visa-required">Visa sponsorship required</MenuItem>
            <MenuItem value="student">Student visa (F-1)</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Availability</InputLabel>
          <Select
            value={profileData.availability}
            onChange={handleChange('availability')}
            label="Availability"
          >
            <MenuItem value="immediately">Immediately</MenuItem>
            <MenuItem value="2-weeks">2 weeks notice</MenuItem>
            <MenuItem value="1-month">1 month notice</MenuItem>
            <MenuItem value="flexible">Flexible</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );

  const renderContactDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={profileData.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="primary" />
              </InputAdornment>
            ),
          }}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Phone Number"
          value={profileData.phone}
          onChange={handleChange('phone')}
          error={!!errors.phone}
          helperText={errors.phone}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon color="primary" />
              </InputAdornment>
            ),
          }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Street Address"
          value={profileData.address}
          onChange={handleChange('address')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="City"
          value={profileData.city}
          onChange={handleChange('city')}
          error={!!errors.city}
          helperText={errors.city}
          required
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="State"
          value={profileData.state}
          onChange={handleChange('state')}
          error={!!errors.state}
          helperText={errors.state}
          required
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="ZIP Code"
          value={profileData.zipCode}
          onChange={handleChange('zipCode')}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            value={profileData.country}
            onChange={handleChange('country')}
            label="Country"
          >
            <MenuItem value="United States">United States</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="United Kingdom">United Kingdom</MenuItem>
            <MenuItem value="Australia">Australia</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );

  const renderProfessionalLinks = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Professional links help recruiters learn more about your work and background.
        </Alert>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="LinkedIn Profile"
          value={profileData.linkedin}
          onChange={handleChange('linkedin')}
          error={!!errors.linkedin}
          helperText={errors.linkedin || 'e.g., https://linkedin.com/in/yourname'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkedInIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="GitHub Profile"
          value={profileData.github}
          onChange={handleChange('github')}
          error={!!errors.github}
          helperText={errors.github || 'e.g., https://github.com/yourusername'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GitHubIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Portfolio Website"
          value={profileData.portfolio}
          onChange={handleChange('portfolio')}
          helperText="e.g., https://yourportfolio.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WebIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Personal Website"
          value={profileData.website}
          onChange={handleChange('website')}
          helperText="e.g., https://yourwebsite.com"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WebIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Languages
          </Typography>
          <TextField
            fullWidth
            label="Add Language"
            placeholder="Type a language and press Enter"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLanguageAdd(e.target.value);
                e.target.value = '';
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {profileData.languages.map((language, index) => (
              <Chip
                key={index}
                label={language}
                onDelete={() => handleLanguageRemove(language)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

  const renderSummary = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Write a compelling professional summary that highlights your key qualifications and career goals. 
          This is often the first thing recruiters read.
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Professional Summary"
          multiline
          rows={6}
          value={profileData.summary}
          onChange={handleChange('summary')}
          error={!!errors.summary}
          helperText={errors.summary || `${profileData.summary.length}/500 characters`}
          placeholder="Write 2-3 sentences about your professional background, key skills, and career objectives..."
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={profileData.isPublic}
              onChange={(e) => setProfileData(prev => ({ ...prev, isPublic: e.target.checked }))}
            />
          }
          label="Make this resume public (searchable by recruiters)"
        />
      </Grid>
    </Grid>
  );

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderBasicInfo();
      case 1:
        return renderContactDetails();
      case 2:
        return renderProfessionalLinks();
      case 3:
        return renderSummary();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Personal Information
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<BackIcon />}
          >
            Back
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleSave}
              startIcon={<SaveIcon />}
            >
              Save Progress
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={() => {
                  handleSave();
                  if (onNext) onNext();
                }}
                startIcon={<SaveIcon />}
              >
                Save & Continue
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<NextIcon />}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
