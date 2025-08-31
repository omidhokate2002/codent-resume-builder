import { useState, useEffect } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Container,
  Dialog,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  PersonOutline as ProfileIcon,
  WorkOutline as ExperienceIcon,
  School as EducationIcon,
  VisibilityOutlined as PreviewIcon,
  SaveOutlined as SaveIcon,
  DownloadOutlined as DownloadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Layout } from './Layout';

// Import our enhanced forms
import { TemplateSelector } from './templates/TemplateSelector';
import { EnhancedProfileForm } from './forms/EnhancedProfileForm';
import { EnhancedExperienceForm } from './forms/EnhancedExperienceForm';
import { EnhancedSkillsForm } from './forms/EnhancedSkillsForm';
import { renderTemplate } from './templates/ATSTemplates';
import { useResumeSpecificContext } from '../context';
import { getTemplateById } from './templates/TemplateRegistry';

const steps = [
  {
    label: 'Choose Template',
    icon: <PreviewIcon />,
    description: 'Select an ATS-friendly template for your field'
  },
  {
    label: 'Personal Info',
    icon: <ProfileIcon />,
    description: 'Add your contact information and summary'
  },
  {
    label: 'Experience',
    icon: <ExperienceIcon />,
    description: 'Detail your work history and achievements'
  },
  {
    label: 'Education & Skills',
    icon: <EducationIcon />,
    description: 'Add education, skills, and certifications'
  },
  {
    label: 'Preview & Export',
    icon: <PreviewIcon />,
    description: 'Review and download your resume'
  }
];

export const ResumeBuilderWizard = () => {
  const navigate = useNavigate();
  const resumeContext = useResumeSpecificContext();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);

  // Load template from context if exists
  useEffect(() => {
    const resumeData = resumeContext?.resumeById;
    if (resumeData?.template) {
      const template = getTemplateById(resumeData.template);
      setSelectedTemplate(template);
    }
  }, [resumeContext?.resumeById]);

  const handleNext = () => {
    console.log('handleNext called, current step:', activeStep);
    setActiveStep((prevActiveStep) => {
      console.log('Moving from step', prevActiveStep, 'to step', prevActiveStep + 1);
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Save template selection to context
    const updatedResume = {
      ...resumeContext?.dirtyResume,
      template: template.id
    };
    resumeContext?.setDirtyResume(updatedResume);
  };

  const handleSaveResume = async () => {
    setIsSaving(true);
    setSaveProgress(0);

    try {
      const _resumeData = resumeContext?.dirtyResume;
      
      // Simulate progress updates
      setSaveProgress(25);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Save to backend
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...resumeData,
          template: selectedTemplate?.id
        })
      });

      setSaveProgress(75);
      await new Promise(resolve => setTimeout(resolve, 500));

      if (response.ok) {
        setSaveProgress(100);
        toast.success('Resume saved successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        throw new Error('Failed to save resume');
      }
    } catch (_error) {
      console.error('Save error:', _error);
      toast.error('Failed to save resume. Please try again.');
    } finally {
      setIsSaving(false);
      setSaveProgress(0);
    }
  };

  const handleExportPDF = async () => {
    try {
      // const resumeData = resumeContext?.resumeById;
      
      // This would integrate with a PDF generation service
      toast.info('PDF export feature coming soon!');
      
      // For now, open print dialog
      window.print();
    } catch {
      toast.error('Failed to export PDF');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Choose Your Resume Template
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Select a professional template optimized for your industry
            </Typography>
            
            {selectedTemplate ? (
              <Paper sx={{ p: 3, mb: 3, maxWidth: 400, mx: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  Selected Template
                </Typography>
                <Typography variant="h5" color="primary.main" gutterBottom>
                  {selectedTemplate.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {selectedTemplate.description}
                </Typography>
                <Typography variant="body2" color="success.main">
                  ATS Score: {selectedTemplate.atsScore}%
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setIsTemplateDialogOpen(true)}
                  sx={{ mt: 2 }}
                >
                  Change Template
                </Button>
              </Paper>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={() => setIsTemplateDialogOpen(true)}
                sx={{ mb: 4 }}
              >
                Select Template
              </Button>
            )}

            <Dialog
              open={isTemplateDialogOpen}
              onClose={() => setIsTemplateDialogOpen(false)}
              maxWidth="lg"
              fullWidth
            >
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onTemplateSelect={(template) => {
                  handleTemplateSelect(template);
                  setIsTemplateDialogOpen(false);
                }}
                onClose={() => setIsTemplateDialogOpen(false)}
              />
            </Dialog>
          </Box>
        );

      case 1:
        return (
          <EnhancedProfileForm
            onNext={handleNext}
            onSave={(_data) => {
              toast.success('Profile information saved!');
            }}
          />
        );

      case 2:
        return (
          <EnhancedExperienceForm
            onNext={handleNext}
            onSave={(_data) => {
              toast.success('Work experience saved!');
            }}
          />
        );

      case 3:
        return (
          <EnhancedSkillsForm
            onNext={handleNext}
            onSave={(_data) => {
              toast.success('Skills and certifications saved!');
            }}
          />
        );

      case 4:
        return (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
              Resume Preview
            </Typography>
            
            <Alert severity="success" sx={{ mb: 3 }}>
              Your resume is ready! Review it below and make any final adjustments.
              All templates are ATS-optimized for maximum compatibility.
            </Alert>

            <Paper sx={{ p: 2, mb: 4, backgroundColor: '#f5f5f5' }}>
              {selectedTemplate && resumeContext?.resumeById ? (
                renderTemplate(selectedTemplate.id, resumeContext.resumeById)
              ) : (
                <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', py: 8 }}>
                  Resume preview will appear here
                </Typography>
              )}
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={handleSaveResume}
                disabled={isSaving}
                size="large"
              >
                Save Resume
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleExportPDF}
                size="large"
              >
                Download PDF
              </Button>
            </Box>

            {isSaving && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Saving resume...
                </Typography>
                <LinearProgress variant="determinate" value={saveProgress} />
              </Box>
            )}
          </Box>
        );

      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  const isStepOptional = (_step) => {
    return false; // No optional steps for now
  };

  const isStepCompleted = (step) => {
    switch (step) {
      case 0:
        return !!selectedTemplate;
      case 1:
        return !!(resumeContext?.dirtyResume?.profile?.firstName);
      case 2:
        return !!(resumeContext?.dirtyResume?.experience?.length > 0);
      case 3:
        return !!(resumeContext?.dirtyResume?.skills?.length > 0);
      default:
        return false;
    }
  };

  const canProceed = (step) => {
    let result;
    switch (step) {
      case 0:
        result = !!selectedTemplate;
        console.log('canProceed step 0 (template):', result, 'selectedTemplate:', selectedTemplate);
        return result;
      case 1:
        result = !!(resumeContext?.dirtyResume?.profile?.firstName && 
                 resumeContext?.dirtyResume?.profile?.email);
        console.log('canProceed step 1 (profile):', result);
        return result;
      case 2:
        result = true; // Experience is optional but recommended
        console.log('canProceed step 2 (experience):', result);
        return result;
      case 3:
        result = true; // Skills are optional but recommended
        console.log('canProceed step 3 (skills):', result);
        return result;
      default:
        console.log('canProceed default case for step:', step);
        return true;
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
            Resume Builder
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>
            Create a professional, ATS-friendly resume in minutes
          </Typography>

          <Paper sx={{ p: 3, mb: 4, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => {
                const stepProps = {};
                const labelProps = {};

                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }

                return (
                  <Step key={step.label} {...stepProps} completed={isStepCompleted(index)}>
                    <StepLabel {...labelProps} icon={step.icon}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle2">{step.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Box>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Paper>

          <Box sx={{ mb: 4 }}>
            {getStepContent(activeStep)}
          </Box>

          {/* Navigation controls for all steps */}
          <Paper sx={{ p: 3, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="outlined"
                sx={{
                  borderColor: 'var(--neutral-300)',
                  color: 'var(--neutral-700)',
                  '&:hover': {
                    borderColor: 'var(--primary-500)',
                    background: 'rgba(14, 165, 233, 0.05)'
                  }
                }}
              >
                Back
              </Button>
              
              {activeStep < steps.length - 1 ? (
                <Button
                  onClick={() => {
                    console.log('Next/Review Resume button clicked on step:', activeStep);
                    console.log('Can proceed?', canProceed(activeStep));
                    handleNext();
                  }}
                  variant="contained"
                  disabled={!canProceed(activeStep)}
                  sx={{
                    background: 'var(--gradient-primary)',
                    boxShadow: 'var(--shadow-primary)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(14, 165, 233, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {activeStep === steps.length - 2 ? 'Review Resume' : 'Next'}
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveResume}
                    disabled={isSaving}
                    sx={{
                      borderColor: 'var(--success-500)',
                      color: 'var(--success-600)',
                      '&:hover': {
                        borderColor: 'var(--success-600)',
                        background: 'rgba(34, 197, 94, 0.05)'
                      }
                    }}
                  >
                    Save Resume
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleExportPDF}
                    sx={{
                      background: 'var(--gradient-primary)',
                      boxShadow: 'var(--shadow-primary)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(14, 165, 233, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Download PDF
                  </Button>
                </Box>
              )}
            </Box>
            
            {isSaving && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Saving resume...
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={saveProgress}
                  sx={{
                    backgroundColor: 'var(--primary-100)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'var(--primary-500)'
                    }
                  }}
                />
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};
