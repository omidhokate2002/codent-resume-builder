import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  TextField,

  Autocomplete,
  Slider,
  Card,
  CardContent,
  Divider,
  Alert,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import {
  Code as CodeIcon,
  Language as LanguageIcon,
  Build as ToolIcon,
  Business as BusinessIcon,
  Add as AddIcon,
  Delete as DeleteIcon,

  Lightbulb as CertificationIcon
} from '@mui/icons-material';
import { useResumeSpecificContext } from '../../context';

const skillCategories = {
  technical: {
    label: 'Technical Skills',
    icon: <CodeIcon />,
    color: '#2196F3',
    suggestions: [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'MongoDB',
      'AWS', 'Docker', 'Kubernetes', 'Git', 'TypeScript', 'Vue.js', 'Angular',
      'Django', 'Flask', 'Spring Boot', 'PostgreSQL', 'Redis', 'GraphQL'
    ]
  },
  languages: {
    label: 'Languages',
    icon: <LanguageIcon />,
    color: '#4CAF50',
    suggestions: [
      'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
      'Portuguese', 'Italian', 'Russian', 'Arabic', 'Hindi', 'Korean'
    ]
  },
  tools: {
    label: 'Tools & Software',
    icon: <ToolIcon />,
    color: '#FF9800',
    suggestions: [
      'Microsoft Office', 'Google Workspace', 'Slack', 'Jira', 'Confluence',
      'Figma', 'Adobe Creative Suite', 'Salesforce', 'HubSpot', 'Tableau',
      'Power BI', 'Excel', 'PowerPoint', 'Sketch', 'InVision', 'Notion'
    ]
  },
  business: {
    label: 'Business Skills',
    icon: <BusinessIcon />,
    color: '#9C27B0',
    suggestions: [
      'Project Management', 'Leadership', 'Communication', 'Problem Solving',
      'Strategic Planning', 'Team Management', 'Customer Service', 'Sales',
      'Marketing', 'Data Analysis', 'Budget Management', 'Negotiation'
    ]
  }
};

const proficiencyLevels = {
  1: { label: 'Beginner', color: '#f44336' },
  2: { label: 'Basic', color: '#ff9800' },
  3: { label: 'Intermediate', color: '#2196f3' },
  4: { label: 'Advanced', color: '#4caf50' },
  5: { label: 'Expert', color: '#9c27b0' }
};

export const EnhancedSkillsForm = ({ onNext, onSave }) => {
  const resumeContext = useResumeSpecificContext();
  const [activeTab, setActiveTab] = useState(0);
  const [skills, setSkills] = useState({
    technical: [],
    languages: [],
    tools: [],
    business: []
  });
  const [certifications, setCertifications] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: '',
    expiryDate: '',
    credentialId: '',
    url: ''
  });

  const categories = Object.keys(skillCategories);
  const currentCategory = categories[activeTab];

  // Load existing data
  useEffect(() => {
    const existingSkills = resumeContext?.resumeById?.skills || [];
    const existingCertifications = resumeContext?.resumeById?.certifications || [];
    
    // Organize skills by category
    const organizedSkills = {
      technical: [],
      languages: [],
      tools: [],
      business: []
    };

    existingSkills.forEach(skill => {
      const category = skill.category || 'technical';
      if (organizedSkills[category]) {
        organizedSkills[category].push(skill);
      }
    });

    setSkills(organizedSkills);
    setCertifications(existingCertifications);
  }, [resumeContext?.resumeById]);

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    const skill = {
      name: newSkill.trim(),
      category: currentCategory,
      proficiency: 3,
      yearsOfExperience: 1,
      isEndorsed: false
    };

    setSkills(prev => ({
      ...prev,
      [currentCategory]: [...prev[currentCategory], skill]
    }));

    setNewSkill('');
    saveToContext();
  };

  const handleRemoveSkill = (category, index) => {
    setSkills(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
    saveToContext();
  };

  const handleUpdateSkillProficiency = (category, index, proficiency) => {
    setSkills(prev => ({
      ...prev,
      [category]: prev[category].map((skill, i) => 
        i === index ? { ...skill, proficiency } : skill
      )
    }));
    saveToContext();
  };

  const handleUpdateSkillExperience = (category, index, years) => {
    setSkills(prev => ({
      ...prev,
      [category]: prev[category].map((skill, i) => 
        i === index ? { ...skill, yearsOfExperience: years } : skill
      )
    }));
    saveToContext();
  };

  const handleAddCertification = () => {
    if (!newCertification.name.trim() || !newCertification.issuer.trim()) return;

    setCertifications(prev => [...prev, { ...newCertification }]);
    setNewCertification({
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    });
    saveToContext();
  };

  const handleRemoveCertification = (index) => {
    setCertifications(prev => prev.filter((_, i) => i !== index));
    saveToContext();
  };

  const saveToContext = () => {
    const allSkills = Object.values(skills).flat();
    const updatedResume = {
      ...resumeContext?.dirtyResume,
      skills: allSkills,
      certifications: certifications
    };
    resumeContext?.setDirtyResume(updatedResume);
  };

  const getSkillRecommendations = () => {
    const existingSkills = skills[currentCategory].map(s => s.name.toLowerCase());
    return skillCategories[currentCategory].suggestions.filter(
      suggestion => !existingSkills.includes(suggestion.toLowerCase())
    );
  };

  const renderSkillCard = (skill, index, category) => (
    <Card key={index} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {skill.name}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleRemoveSkill(category, index)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Proficiency Level
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Slider
              value={skill.proficiency}
              onChange={(_, value) => handleUpdateSkillProficiency(category, index, value)}
              min={1}
              max={5}
              step={1}
              marks={Object.entries(proficiencyLevels).map(([value, config]) => ({
                value: parseInt(value),
                label: config.label
              }))}
              sx={{ flexGrow: 1 }}
            />
            <Chip
              label={proficiencyLevels[skill.proficiency].label}
              size="small"
              sx={{
                backgroundColor: proficiencyLevels[skill.proficiency].color,
                color: 'white',
                minWidth: 80
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Years of Experience:
          </Typography>
          <TextField
            size="small"
            type="number"
            value={skill.yearsOfExperience}
            onChange={(e) => handleUpdateSkillExperience(category, index, parseInt(e.target.value) || 1)}
            inputProps={{ min: 1, max: 50, style: { width: 60 } }}
          />
          <Typography variant="body2" color="text.secondary">
            years
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const renderCertificationCard = (cert, _index) => (
    <Card key={_index} sx={{ mb: 2, border: '1px solid #e0e0e0' }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {cert.name}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleRemoveCertification(_index)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="primary.main" gutterBottom>
          {cert.issuer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Issued: {cert.date}
          {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
        </Typography>
        {cert.credentialId && (
          <Typography variant="body2" color="text.secondary">
            Credential ID: {cert.credentialId}
          </Typography>
        )}
        {cert.url && (
          <Button
            size="small"
            href={cert.url}
            target="_blank"
            sx={{ mt: 1, p: 0, textTransform: 'none' }}
          >
            View Credential
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Skills & Certifications
      </Typography>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: 60,
              textTransform: 'none',
              fontWeight: 600
            }
          }}
        >
          {categories.map((category, index) => (
            <Tab
              key={category}
              icon={skillCategories[category].icon}
              label={skillCategories[category].label}
              iconPosition="start"
              sx={{ 
                gap: 1,
                color: skillCategories[category].color,
                '&.Mui-selected': {
                  color: skillCategories[category].color
                }
              }}
            />
          ))}
          <Tab
            icon={<CertificationIcon />}
            label="Certifications"
            iconPosition="start"
            sx={{ gap: 1 }}
          />
        </Tabs>
      </Paper>

      {activeTab < categories.length ? (
        // Skills Tab
        <Box>
          <Alert severity="info" sx={{ mb: 3 }}>
            Add skills relevant to your target job. Use industry-standard terms that ATS systems can recognize.
            Rate your proficiency honestly - it helps match you with appropriate opportunities.
          </Alert>

          {/* Add Skill Section */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add {skillCategories[currentCategory].label}
            </Typography>
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Autocomplete
                  freeSolo
                  options={getSkillRecommendations()}
                  value={newSkill}
                  onChange={(_, value) => setNewSkill(value || '')}
                  onInputChange={(_, value) => setNewSkill(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Add ${skillCategories[currentCategory].label.toLowerCase()}`}
                      placeholder="Type or select from suggestions"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddSkill();
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAddSkill}
                  disabled={!newSkill.trim()}
                  startIcon={<AddIcon />}
                >
                  Add Skill
                </Button>
              </Grid>
            </Grid>

            {/* Quick Add Suggestions */}
            {getSkillRecommendations().length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Popular {skillCategories[currentCategory].label.toLowerCase()}:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {getSkillRecommendations().slice(0, 8).map((suggestion) => (
                    <Chip
                      key={suggestion}
                      label={suggestion}
                      onClick={() => setNewSkill(suggestion)}
                      variant="outlined"
                      size="small"
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>

          {/* Skills List */}
          <Box>
            {skills[currentCategory].length > 0 ? (
              skills[currentCategory].map((skill, index) => 
                renderSkillCard(skill, index, currentCategory)
              )
            ) : (
              <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No {skillCategories[currentCategory].label.toLowerCase()} added yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add your {skillCategories[currentCategory].label.toLowerCase()} to showcase your expertise
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      ) : (
        // Certifications Tab
        <Box>
          <Alert severity="info" sx={{ mb: 3 }}>
            Add professional certifications, licenses, and credentials. These demonstrate your 
            commitment to professional development and can be key differentiators.
          </Alert>

          {/* Add Certification Section */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add Certification
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Certification Name"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Issuing Organization"
                  value={newCertification.issuer}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Issue Date"
                  type="month"
                  value={newCertification.date}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date (Optional)"
                  type="month"
                  value={newCertification.expiryDate}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, expiryDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Credential ID (Optional)"
                  value={newCertification.credentialId}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, credentialId: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Credential URL (Optional)"
                  value={newCertification.url}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleAddCertification}
                  disabled={!newCertification.name.trim() || !newCertification.issuer.trim()}
                  startIcon={<AddIcon />}
                >
                  Add Certification
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Certifications List */}
          <Box>
            {certifications.length > 0 ? (
              certifications.map((cert, index) => renderCertificationCard(cert, index))
            ) : (
              <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
                <CertificationIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No certifications added yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add your professional certifications and credentials
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      )}

      {/* Navigation */}
      <Divider sx={{ my: 4 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={() => window.history.back()}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            saveToContext();
            if (onSave) onSave({ skills, certifications });
            if (onNext) onNext();
          }}
        >
          Continue to Preview
        </Button>
      </Box>
    </Box>
  );
};
