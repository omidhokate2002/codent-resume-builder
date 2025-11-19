import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { 
  Code, 
  Briefcase, 
  Palette, 
  Heart, 
  GraduationCap, 
  DollarSign, 
  Megaphone,
  FileText,
  Eye,
  CheckCircle2,
  Star
} from 'lucide-react';
import { TEMPLATE_CATEGORIES, getTemplatesByCategory } from './TemplateRegistry';

const categoryIcons = {
  [TEMPLATE_CATEGORIES.TECH]: <Code className="h-5 w-5" />,
  [TEMPLATE_CATEGORIES.BUSINESS]: <Briefcase className="h-5 w-5" />,
  [TEMPLATE_CATEGORIES.CREATIVE]: <Palette className="h-5 w-5" />,
  [TEMPLATE_CATEGORIES.HEALTHCARE]: <Heart className="h-5 w-5" />,
  [TEMPLATE_CATEGORIES.EDUCATION]: <GraduationCap className="h-5 w-5" />,
  [TEMPLATE_CATEGORIES.FINANCE]: <DollarSign className="h-5 w-5" />,
  [TEMPLATE_CATEGORIES.MARKETING]: <Megaphone className="h-5 w-5" />,
  [TEMPLATE_CATEGORIES.GENERAL]: <FileText className="h-5 w-5" />
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

  const handleTemplateSelect = (template) => {
    onTemplateSelect(template);
    if (onClose) onClose();
  };

  const renderTemplateCard = (template) => (
    <Card
      key={template.id}
      onClick={() => handleTemplateSelect(template)}
      className={`cursor-pointer transition-all hover:scale-105 ${
        selectedTemplate?.id === template.id
          ? 'border-2 border-primary-500 bg-primary-900/20'
          : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
      }`}
    >
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center relative">
          <FileText className="h-16 w-16 text-primary-400 opacity-50" />
          {template.isATSFriendly && (
            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-green-600 rounded-full text-white text-xs font-semibold">
              <CheckCircle2 className="h-3 w-3" />
              ATS {template.atsScore}%
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreviewTemplate(template);
            }}
            className="absolute top-2 left-2 p-2 bg-gray-800/80 rounded-lg hover:bg-gray-700 text-white"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-white text-lg">{template.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {template.features?.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300"
            >
              {feature}
            </span>
          ))}
          {template.features?.length > 2 && (
            <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-500">
              +{template.features.length - 2} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">{template.atsScore}</span>
          </div>
          
          <Button
            variant={selectedTemplate?.id === template.id ? "default" : "outline"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleTemplateSelect(template);
            }}
            className={
              selectedTemplate?.id === template.id
                ? 'bg-primary-600 hover:bg-primary-700'
                : 'border-gray-600 text-gray-300 hover:bg-gray-700'
            }
          >
            {selectedTemplate?.id === template.id ? 'Selected' : 'Select'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Choose Your Resume Template</h2>
        <p className="text-gray-400">
          All templates are ATS-friendly and optimized for modern recruitment systems
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.values(TEMPLATE_CATEGORIES).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {categoryIcons[category]}
            <span>{categoryNames[category]}</span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getTemplatesByCategory(activeCategory).map(renderTemplateCard)}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              {previewTemplate?.name} Template
              {previewTemplate?.isATSFriendly && (
                <span className="flex items-center gap-1 px-2 py-1 bg-green-600 rounded-full text-white text-xs">
                  <CheckCircle2 className="h-3 w-3" />
                  ATS Score: {previewTemplate?.atsScore}%
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="h-64 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg flex items-center justify-center">
              <FileText className="h-24 w-24 text-primary-400 opacity-50" />
            </div>
            
            <p className="text-gray-300">{previewTemplate?.description}</p>
            
            <div>
              <h3 className="text-white font-semibold mb-2">Features:</h3>
              <div className="flex flex-wrap gap-2">
                {previewTemplate?.features?.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 rounded text-sm text-gray-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setPreviewTemplate(null)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                handleTemplateSelect(previewTemplate);
                setPreviewTemplate(null);
              }}
              className="bg-primary-600 hover:bg-primary-700"
            >
              Select This Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
