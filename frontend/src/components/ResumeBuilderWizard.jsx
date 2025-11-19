import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Layout } from './Layout';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Eye, 
  Save, 
  Download,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  Sparkles
} from 'lucide-react';
import { TemplateSelector } from './templates/TemplateSelector';
import { EnhancedProfileForm } from './forms/EnhancedProfileForm';
import { EnhancedExperienceForm } from './forms/EnhancedExperienceForm';
import { EnhancedSkillsForm } from './forms/EnhancedSkillsForm';
import { renderTemplate } from './templates/ATSTemplates';
import { useResumeSpecificContext } from '../context';
import { getTemplateById } from './templates/TemplateRegistry';
import { resumeAPI } from '../services/api';

const steps = [
  {
    label: 'Choose Template',
    icon: <FileText className="h-5 w-5" />,
    description: 'Select an ATS-friendly template'
  },
  {
    label: 'Personal Info',
    icon: <User className="h-5 w-5" />,
    description: 'Add your contact information'
  },
  {
    label: 'Experience',
    icon: <Briefcase className="h-5 w-5" />,
    description: 'Detail your work history'
  },
  {
    label: 'Education & Skills',
    icon: <GraduationCap className="h-5 w-5" />,
    description: 'Add education and skills'
  },
  {
    label: 'Preview & Export',
    icon: <Eye className="h-5 w-5" />,
    description: 'Review and download'
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
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
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
      const resumeData = resumeContext?.dirtyResume || resumeContext?.resumeById;
      
      setSaveProgress(25);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const response = await resumeAPI.createResume({
        ...resumeData,
        template: selectedTemplate?.id
      });

      setSaveProgress(75);
      await new Promise(resolve => setTimeout(resolve, 300));

      if (response.data) {
        setSaveProgress(100);
        toast.success('Resume saved successfully!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.response?.data?.error || 'Failed to save resume');
    } finally {
      setIsSaving(false);
      setSaveProgress(0);
    }
  };

  const handleExportPDF = async () => {
    try {
      const resumeData = resumeContext?.resumeById;
      if (!resumeData) {
        toast.error('No resume data to export');
        return;
      }
      const { exportToPDF } = await import('../utils/exportUtils');
      exportToPDF(resumeData, selectedTemplate?.name || 'Resume');
      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF');
    }
  };

  const handleExportWord = async () => {
    try {
      const resumeData = resumeContext?.resumeById;
      if (!resumeData) {
        toast.error('No resume data to export');
        return;
      }
      const { exportToWord } = await import('../utils/exportUtils');
      await exportToWord(resumeData, selectedTemplate?.name || 'Resume');
      toast.success('Word document exported successfully!');
    } catch (error) {
      console.error('Word export error:', error);
      toast.error('Failed to export Word document');
    }
  };

  const isStepCompleted = (step) => {
    switch (step) {
      case 0: return !!selectedTemplate;
      case 1: return !!(resumeContext?.dirtyResume?.profile?.firstName);
      case 2: return !!(resumeContext?.dirtyResume?.experience?.length > 0);
      case 3: return !!(resumeContext?.dirtyResume?.skills?.length > 0);
      default: return false;
    }
  };

  const canProceed = (step) => {
    switch (step) {
      case 0: return !!selectedTemplate;
      case 1: return !!(resumeContext?.dirtyResume?.profile?.firstName && 
                       resumeContext?.dirtyResume?.profile?.email);
      case 2: return true;
      case 3: return true;
      default: return true;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Resume Template</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Select a professional template optimized for your industry</p>
            
            {selectedTemplate ? (
              <Card className="max-w-md mx-auto mb-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Selected Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">{selectedTemplate.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedTemplate.description}</p>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>ATS Score: {selectedTemplate.atsScore}%</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsTemplateDialogOpen(true)}
                    className="mt-4 w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Change Template
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Button
                onClick={() => setIsTemplateDialogOpen(true)}
                size="lg"
                className="mb-8"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Select Template
              </Button>
            )}

            <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-white">Select Template</DialogTitle>
                </DialogHeader>
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onTemplateSelect={(template) => {
                    handleTemplateSelect(template);
                    setIsTemplateDialogOpen(false);
                  }}
                  onClose={() => setIsTemplateDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        );

      case 1:
        return (
          <EnhancedProfileForm
            onNext={handleNext}
            onSave={() => toast.success('Profile information saved!')}
          />
        );

      case 2:
        return (
          <EnhancedExperienceForm
            onNext={handleNext}
            onSave={() => toast.success('Work experience saved!')}
          />
        );

      case 3:
        return (
          <EnhancedSkillsForm
            onNext={handleNext}
            onSave={() => toast.success('Skills and certifications saved!')}
          />
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Resume Preview</h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 mb-6">
                <CheckCircle2 className="h-5 w-5" />
                <span>Your resume is ready! Review it below and make any final adjustments.</span>
              </div>
            </div>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                {selectedTemplate && resumeContext?.resumeById ? (
                  <div className="bg-white text-black p-8 rounded-lg">
                    {renderTemplate(selectedTemplate.id, resumeContext.resumeById)}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Resume preview will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleSaveResume}
                disabled={isSaving}
                size="lg"
                className="border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <Save className="mr-2 h-5 w-5" />
                Save Resume
              </Button>
              <Button
                onClick={handleExportPDF}
                size="lg"
                className="bg-primary-600 hover:bg-primary-700"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleExportWord}
                size="lg"
                className="border-secondary-600 dark:border-secondary-500 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-900/20"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Word
              </Button>
            </div>

            {isSaving && (
              <div className="mt-6">
                <p className="text-gray-600 dark:text-gray-400 text-center mb-2">Saving resume...</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${saveProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return <div className="text-gray-900 dark:text-white">Unknown step</div>;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Resume Builder</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Create a professional, ATS-friendly resume in minutes</p>
          </div>

          {/* Stepper */}
          <Card className="mb-8 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isCompleted = isStepCompleted(index);
                  
                  return (
                    <div key={index} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                          isActive
                            ? 'bg-primary-600 border-primary-500 text-white'
                            : isCompleted
                            ? 'bg-green-600 border-green-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {isCompleted && !isActive ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          step.icon
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className={`text-sm font-medium ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-700'}`} />
                    )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card className="mb-8 bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <CardContent className="p-8">
              {getStepContent(activeStep)}
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card className="bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                {activeStep < steps.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed(activeStep)}
                    size="lg"
                    className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                  >
                    {activeStep === steps.length - 2 ? 'Review Resume' : 'Next'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={handleSaveResume}
                      disabled={isSaving}
                      className="border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Resume
                    </Button>
                    <Button
                      onClick={handleExportPDF}
                      className="bg-primary-600 hover:bg-primary-700"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleExportWord}
                      className="border-secondary-600 dark:border-secondary-500 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-900/20"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Word
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
