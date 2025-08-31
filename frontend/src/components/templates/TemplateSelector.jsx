import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Tabs,
  Tab,
  Badge,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Code as CodeIcon,
  Business as BusinessIcon,
  Brush as CreativeIcon,
  LocalHospital as HealthcareIcon,
  School as EducationIcon,
  AccountBalance as FinanceIcon,
  Campaign as MarketingIcon,
  Description as GeneralIcon,
  Visibility as PreviewIcon,
  CheckCircle as ATSIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { TEMPLATE_CATEGORIES, getTemplatesByCategory } from './TemplateRegistry';

const categoryIcons = {
  [TEMPLATE_CATEGORIES.TECH]: <CodeIcon />,
  [TEMPLATE_CATEGORIES.BUSINESS]: <BusinessIcon />,
  [TEMPLATE_CATEGORIES.CREATIVE]: <CreativeIcon />,
  [TEMPLATE_CATEGORIES.HEALTHCARE]: <HealthcareIcon />,
  [TEMPLATE_CATEGORIES.EDUCATION]: <EducationIcon />,
  [TEMPLATE_CATEGORIES.FINANCE]: <FinanceIcon />,
  [TEMPLATE_CATEGORIES.MARKETING]: <MarketingIcon />,
  [TEMPLATE_CATEGORIES.GENERAL]: <GeneralIcon />
};

const categoryNames = {
  [TEMPLATE_CATEGORIES.TECH]: 'Technology',
  [TEMPLATE_CATEGORIES.BUSINESS]: 'Business',
  [TEMPLATE_CATEGORIES.CREATIVE]: 'Creative',
  [TEMPLATE_CATEGORIES.HEALTHCARE]: 'Healthcare',
  [TEMPLATE_CATEGORIES.EDUCATION]: 'Education',
  [TEMPLATE_CATEGORIES.FINANCE]: 'Finance',
  [TEMPLATE_CATEGORIES.MARKETING]: 'Marketing',
  [TEMPLATE_CATEGORIES.GENERAL]: 'General'
};

export const TemplateSelector = ({ selectedTemplate, onTemplateSelect, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(TEMPLATE_CATEGORIES.GENERAL);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleCategoryChange = (event, newCategory) => {
    setActiveCategory(newCategory);
  };

  const handleTemplateSelect = (template) => {
    onTemplateSelect(template);
    if (onClose) onClose();
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const renderTemplateCard = (template) => (
    <Grid item xs={12} sm={6} md={4} key={template.id}>
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: selectedTemplate?.id === template.id ? '2px solid var(--primary-500)' : '2px solid transparent',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)'
          }
        }}
        onClick={() => handleTemplateSelect(template)}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="div"
            sx={{
              height: 200,
              background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--secondary-100) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <Typography variant="h6" sx={{ color: 'var(--primary-600)' }}>
              {template.name}
            </Typography>
            
            {/* ATS Badge */}
            {template.isATSFriendly && (
              <Chip
                icon={<ATSIcon />}
                label={`ATS ${template.atsScore}%`}
                size="small"
                color="success"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  fontWeight: 600
                }}
              />
            )}
            
            {/* Preview Button */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handlePreview(template);
              }}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                background: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 1)'
                }
              }}
            >
              <PreviewIcon />
            </IconButton>
          </CardMedia>
        </Box>
        
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {template.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {template.description}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {template.features.slice(0, 2).map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
            {template.features.length > 2 && (
              <Chip
                label={`+${template.features.length - 2} more`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem', opacity: 0.7 }}
              />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Badge
              badgeContent={template.atsScore}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.75rem',
                  fontWeight: 600
                }
              }}
            >
              <StarIcon sx={{ color: 'var(--warning-500)' }} />
            </Badge>
            
            <Button
              variant={selectedTemplate?.id === template.id ? "contained" : "outlined"}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleTemplateSelect(template);
              }}
            >
              {selectedTemplate?.id === template.id ? 'Selected' : 'Select'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Choose Your Resume Template
        </Typography>
        <Typography variant="h6" color="text.secondary">
          All templates are ATS-friendly and optimized for modern recruitment systems
        </Typography>
      </Box>

      {/* Category Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={activeCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 72,
              textTransform: 'none',
              fontWeight: 600
            }
          }}
        >
          {Object.values(TEMPLATE_CATEGORIES).map((category) => (
            <Tab
              key={category}
              value={category}
              icon={categoryIcons[category]}
              label={categoryNames[category]}
              iconPosition="start"
              sx={{ gap: 1 }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Templates Grid */}
      <Grid container spacing={3}>
        {getTemplatesByCategory(activeCategory).map(renderTemplateCard)}
      </Grid>

      {/* Preview Dialog */}
      <Dialog
        open={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6">{previewTemplate?.name} Template</Typography>
            <Chip
              icon={<ATSIcon />}
              label={`ATS Score: ${previewTemplate?.atsScore}%`}
              color="success"
              size="small"
            />
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box
            sx={{
              height: 400,
              background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--secondary-100) 100%)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}
          >
            <Typography variant="h4" sx={{ color: 'var(--primary-600)' }}>
              {previewTemplate?.name} Preview
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            {previewTemplate?.description}
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 1 }}>Features:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {previewTemplate?.features.map((feature, index) => (
              <Chip key={index} label={feature} variant="outlined" />
            ))}
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setPreviewTemplate(null)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleTemplateSelect(previewTemplate);
              setPreviewTemplate(null);
            }}
          >
            Select This Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
