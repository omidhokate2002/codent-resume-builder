import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Switch,
  FormControlLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,

  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useResumeSpecificContext } from '../../context';

const employmentTypes = [
  'Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Temporary'
];

const commonIndustries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
  'Retail', 'Consulting', 'Marketing', 'Non-profit', 'Government', 'Other'
];

const responsibilityTemplates = {
  'Software Engineer': [
    'Developed and maintained web applications using React and Node.js',
    'Collaborated with cross-functional teams to deliver high-quality software solutions',
    'Implemented RESTful APIs and database integrations',
    'Participated in code reviews and maintained coding standards',
    'Optimized application performance and resolved technical issues'
  ],
  'Marketing Manager': [
    'Developed and executed comprehensive marketing strategies',
    'Managed social media campaigns and increased engagement by X%',
    'Collaborated with sales team to generate qualified leads',
    'Analyzed market trends and competitor activities',
    'Managed marketing budget of $X and delivered ROI of X%'
  ],
  'Project Manager': [
    'Led cross-functional teams of X+ members to deliver projects on time',
    'Managed project budgets ranging from $X to $X',
    'Implemented Agile methodologies to improve team efficiency',
    'Facilitated stakeholder communication and requirement gathering',
    'Delivered X+ projects with 95%+ client satisfaction rate'
  ],
  'Sales Representative': [
    'Exceeded sales targets by X% for consecutive quarters',
    'Built and maintained relationships with X+ clients',
    'Identified new business opportunities and expanded market reach',
    'Conducted product demonstrations and presentations',
    'Collaborated with marketing team to develop lead generation strategies'
  ]
};

export const EnhancedExperienceForm = ({ onNext, onSave }) => {
  const resumeContext = useResumeSpecificContext();
  const [experiences, setExperiences] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  const [currentExperience, setCurrentExperience] = useState({
    title: '',
    company: '',
    location: '',
    employmentType: 'Full-time',
    industry: '',
    startDate: '',
    endDate: '',
    isCurrentRole: false,
    responsibilities: '',
    achievements: '',
    technologies: [],
    teamSize: '',
    reportingTo: '',
    directReports: 0,
    keyProjects: '',
    promotions: []
  });

  // Load existing data
  useEffect(() => {
    const existingExperiences = resumeContext?.resumeById?.experience || [];
    setExperiences(existingExperiences);
  }, [resumeContext?.resumeById]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setCurrentExperience(prev => ({
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

  const handleTechnologyAdd = (technology) => {
    if (technology && !currentExperience.technologies.includes(technology)) {
      setCurrentExperience(prev => ({
        ...prev,
        technologies: [...prev.technologies, technology]
      }));
    }
  };

  const handleTechnologyRemove = (technology) => {
    setCurrentExperience(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== technology)
    }));
  };

  const loadResponsibilityTemplate = (jobTitle) => {
    const template = responsibilityTemplates[jobTitle];
    if (template) {
      setCurrentExperience(prev => ({
        ...prev,
        responsibilities: template.join('\n• ')
      }));
    }
  };

  const validateExperience = () => {
    const newErrors = {};
    
    if (!currentExperience.title.trim()) newErrors.title = 'Job title is required';
    if (!currentExperience.company.trim()) newErrors.company = 'Company name is required';
    if (!currentExperience.location.trim()) newErrors.location = 'Location is required';
    if (!currentExperience.startDate) newErrors.startDate = 'Start date is required';
    if (!currentExperience.isCurrentRole && !currentExperience.endDate) {
      newErrors.endDate = 'End date is required for past roles';
    }
    if (!currentExperience.responsibilities.trim()) {
      newErrors.responsibilities = 'Job responsibilities are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveExperience = () => {
    if (!validateExperience()) return;

    const newExperiences = [...experiences];
    if (editingIndex >= 0) {
      newExperiences[editingIndex] = currentExperience;
    } else {
      newExperiences.push(currentExperience);
    }
    
    setExperiences(newExperiences);
    setShowForm(false);
    setEditingIndex(-1);
    resetForm();
    
    // Save to context
    const updatedResume = {
      ...resumeContext?.dirtyResume,
      experience: newExperiences
    };
    resumeContext?.setDirtyResume(updatedResume);
  };

  const handleEditExperience = (index) => {
    setCurrentExperience(experiences[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
    
    // Save to context
    const updatedResume = {
      ...resumeContext?.dirtyResume,
      experience: newExperiences
    };
    resumeContext?.setDirtyResume(updatedResume);
  };

  const resetForm = () => {
    setCurrentExperience({
      title: '',
      company: '',
      location: '',
      employmentType: 'Full-time',
      industry: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      responsibilities: '',
      achievements: '',
      technologies: [],
      teamSize: '',
      reportingTo: '',
      directReports: 0,
      keyProjects: '',
      promotions: []
    });
    setErrors({});
  };

  const renderExperienceCard = (exp, index) => (
    <Paper key={index} sx={{ p: 3, mb: 2, border: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {exp.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
            {exp.company} • {exp.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate} • {exp.employmentType}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={() => handleEditExperience(index)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteExperience(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Typography variant="body2" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
        {exp.responsibilities}
      </Typography>
      
      {exp.technologies.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {exp.technologies.map((tech, i) => (
            <Chip key={i} label={tech} size="small" variant="outlined" />
          ))}
        </Box>
      )}
      
      {exp.achievements && (
        <Alert severity="success" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Key Achievements:</strong> {exp.achievements}
          </Typography>
        </Alert>
      )}
    </Paper>
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Professional Experience
      </Typography>

      {/* Experience List */}
      <Box sx={{ mb: 4 }}>
        {experiences.map((exp, index) => renderExperienceCard(exp, index))}
        
        {experiences.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
            <WorkIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No work experience added yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add your professional experience to showcase your career journey
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Add Experience Button */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          size="large"
        >
          Add Work Experience
        </Button>
      </Box>

      {/* Experience Form Dialog */}
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingIndex >= 0 ? 'Edit Experience' : 'Add Work Experience'}
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Job Title and Template */}
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Job Title"
                value={currentExperience.title}
                onChange={handleChange('title')}
                error={!!errors.title}
                helperText={errors.title}
                InputProps={{
                  startAdornment: <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Use Template</InputLabel>
                <Select
                  value=""
                  onChange={(e) => loadResponsibilityTemplate(e.target.value)}
                  label="Use Template"
                >
                  {Object.keys(responsibilityTemplates).map((title) => (
                    <MenuItem key={title} value={title}>{title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Company and Industry */}
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Company Name"
                value={currentExperience.company}
                onChange={handleChange('company')}
                error={!!errors.company}
                helperText={errors.company}
                InputProps={{
                  startAdornment: <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                freeSolo
                options={commonIndustries}
                value={currentExperience.industry}
                onChange={(event, newValue) => {
                  setCurrentExperience(prev => ({ ...prev, industry: newValue || '' }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Industry"
                    placeholder="Select or type..."
                  />
                )}
              />
            </Grid>

            {/* Location and Employment Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={currentExperience.location}
                onChange={handleChange('location')}
                error={!!errors.location}
                helperText={errors.location}
                InputProps={{
                  startAdornment: <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Employment Type</InputLabel>
                <Select
                  value={currentExperience.employmentType}
                  onChange={handleChange('employmentType')}
                  label="Employment Type"
                >
                  {employmentTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Dates */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="month"
                value={currentExperience.startDate}
                onChange={handleChange('startDate')}
                error={!!errors.startDate}
                helperText={errors.startDate}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentExperience.isCurrentRole}
                      onChange={(e) => setCurrentExperience(prev => ({
                        ...prev,
                        isCurrentRole: e.target.checked,
                        endDate: e.target.checked ? '' : prev.endDate
                      }))}
                    />
                  }
                  label="I currently work here"
                  sx={{ mb: 1 }}
                />
                {!currentExperience.isCurrentRole && (
                  <TextField
                    fullWidth
                    label="End Date"
                    type="month"
                    value={currentExperience.endDate}
                    onChange={handleChange('endDate')}
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                )}
              </Box>
            </Grid>

            {/* Team Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Team Size"
                value={currentExperience.teamSize}
                onChange={handleChange('teamSize')}
                placeholder="e.g., 5-person development team"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Direct Reports"
                type="number"
                value={currentExperience.directReports}
                onChange={handleChange('directReports')}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>

            {/* Job Responsibilities */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Responsibilities"
                multiline
                rows={6}
                value={currentExperience.responsibilities}
                onChange={handleChange('responsibilities')}
                error={!!errors.responsibilities}
                helperText={errors.responsibilities || 'Use bullet points (•) for better ATS scanning. Start each point with an action verb.'}
                placeholder="• Developed and maintained web applications&#10;• Led a team of 5 developers&#10;• Improved system performance by 40%"
                required
              />
            </Grid>

            {/* Key Achievements */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Key Achievements (Optional)"
                multiline
                rows={3}
                value={currentExperience.achievements}
                onChange={handleChange('achievements')}
                placeholder="Quantify your impact: increased sales by 25%, reduced costs by $50K, led successful product launch..."
              />
            </Grid>

            {/* Technologies */}
            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Technologies & Tools
                </Typography>
                <TextField
                  fullWidth
                  label="Add Technology"
                  placeholder="Type a technology and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleTechnologyAdd(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {currentExperience.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      onDelete={() => handleTechnologyRemove(tech)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => {
              setShowForm(false);
              resetForm();
            }}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveExperience}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            {editingIndex >= 0 ? 'Update Experience' : 'Add Experience'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Navigation */}
      <Divider sx={{ my: 4 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={() => window.history.back()}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (onSave) onSave(experiences);
            if (onNext) onNext();
          }}
          disabled={experiences.length === 0}
        >
          Continue to Education
        </Button>
      </Box>
    </Box>
  );
};
