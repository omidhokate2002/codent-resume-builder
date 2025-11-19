import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  gpa: { type: String },
  description: { type: String }
});

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String, required: true },
  achievements: [{ type: String }]
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  link: { type: String },
  github: { type: String },
  startDate: { type: Date },
  endDate: { type: Date }
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' },
  category: { type: String, enum: ['Technical', 'Soft Skills', 'Languages', 'Tools'], default: 'Technical' }
});

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, default: 'My Resume' },
  
  // Personal Information
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String },
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
    summary: { type: String, maxlength: 500 }
  },
  
  // Resume Sections
  education: [educationSchema],
  experience: [experienceSchema],
  projects: [projectSchema],
  skills: [skillSchema],
  
  // Resume Settings
  template: { type: String, default: 'modern' },
  theme: { type: String, default: 'blue' },
  fontSize: { type: String, default: 'medium' },
  
  // Metadata
  isPublic: { type: Boolean, default: false },
  lastModified: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Index for better query performance
resumeSchema.index({ userId: 1, createdAt: -1 });
resumeSchema.index({ isPublic: 1, createdAt: -1 });

// Virtual for full name
resumeSchema.virtual('profile.fullName').get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

// Ensure virtuals are serialized
resumeSchema.set('toJSON', { virtuals: true });
resumeSchema.set('toObject', { virtuals: true });

export default mongoose.model('Resume', resumeSchema);

