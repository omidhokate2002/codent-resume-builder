// Template registry for different resume templates
export const TEMPLATE_CATEGORIES = {
  TECH: 'tech',
  BUSINESS: 'business', 
  CREATIVE: 'creative',
  HEALTHCARE: 'healthcare',
  EDUCATION: 'education',
  FINANCE: 'finance',
  MARKETING: 'marketing',
  GENERAL: 'general'
};

export const TEMPLATE_TYPES = {
  // Tech Templates
  SOFTWARE_ENGINEER: {
    id: 'software-engineer',
    name: 'Software Engineer',
    category: TEMPLATE_CATEGORIES.TECH,
    description: 'Clean, technical format optimized for software development roles',
    atsScore: 95,
    features: ['Technical skills section', 'Projects showcase', 'Clean code structure'],
    preview: '/previews/software-engineer.png',
    isATSFriendly: true
  },
  DATA_SCIENTIST: {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: TEMPLATE_CATEGORIES.TECH,
    description: 'Analytics-focused layout highlighting data projects and skills',
    atsScore: 93,
    features: ['Analytics section', 'Research highlights', 'Technical proficiency'],
    preview: '/previews/data-scientist.png',
    isATSFriendly: true
  },
  
  // Business Templates
  EXECUTIVE: {
    id: 'executive',
    name: 'Executive',
    category: TEMPLATE_CATEGORIES.BUSINESS,
    description: 'Professional executive format with leadership emphasis',
    atsScore: 90,
    features: ['Leadership achievements', 'Executive summary', 'Board experience'],
    preview: '/previews/executive.png',
    isATSFriendly: true
  },
  CONSULTANT: {
    id: 'consultant',
    name: 'Consultant',
    category: TEMPLATE_CATEGORIES.BUSINESS,
    description: 'Results-driven layout for consulting professionals',
    atsScore: 92,
    features: ['Case studies', 'Client achievements', 'Analytical skills'],
    preview: '/previews/consultant.png',
    isATSFriendly: true
  },
  
  // Creative Templates
  DESIGNER: {
    id: 'designer',
    name: 'Designer',
    category: TEMPLATE_CATEGORIES.CREATIVE,
    description: 'Visual-focused template showcasing design work',
    atsScore: 85,
    features: ['Portfolio section', 'Visual skills', 'Creative projects'],
    preview: '/previews/designer.png',
    isATSFriendly: true
  },
  WRITER: {
    id: 'writer',
    name: 'Writer',
    category: TEMPLATE_CATEGORIES.CREATIVE,
    description: 'Content-focused format for writing professionals',
    atsScore: 88,
    features: ['Writing samples', 'Publications', 'Editorial experience'],
    preview: '/previews/writer.png',
    isATSFriendly: true
  },
  
  // Healthcare Templates
  NURSE: {
    id: 'nurse',
    name: 'Nurse',
    category: TEMPLATE_CATEGORIES.HEALTHCARE,
    description: 'Healthcare-focused template with certifications',
    atsScore: 94,
    features: ['Certifications', 'Clinical experience', 'Patient care'],
    preview: '/previews/nurse.png',
    isATSFriendly: true
  },
  DOCTOR: {
    id: 'doctor',
    name: 'Doctor',
    category: TEMPLATE_CATEGORIES.HEALTHCARE,
    description: 'Medical professional format with specializations',
    atsScore: 96,
    features: ['Medical specializations', 'Research', 'Clinical rotations'],
    preview: '/previews/doctor.png',
    isATSFriendly: true
  },
  
  // Education Templates
  TEACHER: {
    id: 'teacher',
    name: 'Teacher',
    category: TEMPLATE_CATEGORIES.EDUCATION,
    description: 'Education-focused template for teaching professionals',
    atsScore: 91,
    features: ['Teaching philosophy', 'Classroom management', 'Student outcomes'],
    preview: '/previews/teacher.png',
    isATSFriendly: true
  },
  ACADEMIC: {
    id: 'academic',
    name: 'Academic',
    category: TEMPLATE_CATEGORIES.EDUCATION,
    description: 'Research-focused format for academic positions',
    atsScore: 89,
    features: ['Publications', 'Research grants', 'Academic achievements'],
    preview: '/previews/academic.png',
    isATSFriendly: true
  },
  
  // Finance Templates
  ACCOUNTANT: {
    id: 'accountant',
    name: 'Accountant',
    category: TEMPLATE_CATEGORIES.FINANCE,
    description: 'Financial professional format with certifications',
    atsScore: 93,
    features: ['Financial certifications', 'Audit experience', 'Compliance'],
    preview: '/previews/accountant.png',
    isATSFriendly: true
  },
  FINANCIAL_ANALYST: {
    id: 'financial-analyst',
    name: 'Financial Analyst',
    category: TEMPLATE_CATEGORIES.FINANCE,
    description: 'Analytics-focused layout for finance professionals',
    atsScore: 92,
    features: ['Financial modeling', 'Investment analysis', 'Risk assessment'],
    preview: '/previews/financial-analyst.png',
    isATSFriendly: true
  },
  
  // Marketing Templates
  DIGITAL_MARKETER: {
    id: 'digital-marketer',
    name: 'Digital Marketer',
    category: TEMPLATE_CATEGORIES.MARKETING,
    description: 'Campaign-focused template for digital marketing',
    atsScore: 87,
    features: ['Campaign metrics', 'Digital platforms', 'Growth achievements'],
    preview: '/previews/digital-marketer.png',
    isATSFriendly: true
  },
  
  // General Templates
  MODERN_ATS: {
    id: 'modern-ats',
    name: 'Modern ATS',
    category: TEMPLATE_CATEGORIES.GENERAL,
    description: 'Clean, ATS-optimized template for any profession',
    atsScore: 98,
    features: ['Maximum ATS compatibility', 'Clean structure', 'Universal format'],
    preview: '/previews/modern-ats.png',
    isATSFriendly: true
  },
  CLASSIC: {
    id: 'classic',
    name: 'Classic',
    category: TEMPLATE_CATEGORIES.GENERAL,
    description: 'Traditional professional format',
    atsScore: 94,
    features: ['Traditional layout', 'Professional appearance', 'Wide compatibility'],
    preview: '/previews/classic.png',
    isATSFriendly: true
  }
};

export const getTemplatesByCategory = (category) => {
  return Object.values(TEMPLATE_TYPES).filter(template => template.category === category);
};

export const getTemplateById = (id) => {
  return Object.values(TEMPLATE_TYPES).find(template => template.id === id);
};

export const getAllTemplates = () => {
  return Object.values(TEMPLATE_TYPES);
};

export const getATSFriendlyTemplates = () => {
  return Object.values(TEMPLATE_TYPES).filter(template => template.isATSFriendly);
};
