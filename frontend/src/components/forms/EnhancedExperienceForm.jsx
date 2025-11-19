import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar,
  Plus,
  Trash2,
  Save,
  ChevronRight
} from 'lucide-react';
import { useResumeSpecificContext } from '../../context';

export const EnhancedExperienceForm = ({ onNext, onSave }) => {
  const resumeContext = useResumeSpecificContext();
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrentRole: false,
    description: ''
  });

  useEffect(() => {
    const existingExperiences = resumeContext?.resumeById?.experience || [];
    if (existingExperiences.length > 0) {
      setExperiences(existingExperiences);
    }
  }, [resumeContext?.resumeById]);

  const handleChange = (field) => (e) => {
    const value = field === 'isCurrentRole' ? e.target.checked : e.target.value;
    setCurrentExperience(prev => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (currentExperience.jobTitle && currentExperience.company) {
      const newExperiences = [...experiences, { ...currentExperience }];
      setExperiences(newExperiences);
      updateContext(newExperiences);
      setCurrentExperience({
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentRole: false,
        description: ''
      });
      setShowForm(false);
    }
  };

  const handleEdit = (index) => {
    setCurrentExperience(experiences[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleUpdate = () => {
    if (editingIndex >= 0) {
      const newExperiences = [...experiences];
      newExperiences[editingIndex] = currentExperience;
      setExperiences(newExperiences);
      updateContext(newExperiences);
      setEditingIndex(-1);
      setShowForm(false);
      setCurrentExperience({
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentRole: false,
        description: ''
      });
    }
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      const newExperiences = experiences.filter((_, i) => i !== index);
      setExperiences(newExperiences);
      updateContext(newExperiences);
    }
  };

  const updateContext = (newExperiences) => {
    const updatedResume = {
      ...resumeContext?.dirtyResume,
      experience: newExperiences
    };
    resumeContext?.setDirtyResume(updatedResume);
  };

  const handleSave = () => {
    updateContext(experiences);
    if (onSave) onSave(experiences);
    if (onNext) onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Work Experience</h2>
        <p className="text-gray-600 dark:text-gray-400">Add your professional work history</p>
      </div>

      {/* Experience List */}
      {experiences.length > 0 && (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{exp.jobTitle}</h3>
                    <p className="text-primary-600 dark:text-primary-400 mb-2">{exp.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      {exp.location && <span>{exp.location}</span>}
                      {exp.startDate && (
                        <span>
                          {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate || 'Present'}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 dark:text-gray-300 mt-3 whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(index)}
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(index)}
                      className="border-red-500 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm ? (
        <Card className="bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              {editingIndex >= 0 ? 'Edit Experience' : 'Add Experience'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-gray-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Job Title *
                </Label>
                <Input
                  id="jobTitle"
                  value={currentExperience.jobTitle}
                  onChange={handleChange('jobTitle')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-900 dark:text-white flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company *
                </Label>
                <Input
                  id="company"
                  value={currentExperience.company}
                  onChange={handleChange('company')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="Tech Corp"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={currentExperience.location}
                  onChange={handleChange('location')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="New York, NY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="month"
                  value={currentExperience.startDate}
                  onChange={handleChange('startDate')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-gray-900 dark:text-white">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={currentExperience.endDate}
                  onChange={handleChange('endDate')}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  disabled={currentExperience.isCurrentRole}
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-gray-900 dark:text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentExperience.isCurrentRole}
                    onChange={handleChange('isCurrentRole')}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                  <span>I currently work here</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-900 dark:text-white">Description</Label>
              <textarea
                id="description"
                value={currentExperience.description}
                onChange={handleChange('description')}
                rows={5}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={editingIndex >= 0 ? handleUpdate : handleAdd}
                className="bg-primary-600 hover:bg-primary-700"
              >
                <Save className="mr-2 h-4 w-4" />
                {editingIndex >= 0 ? 'Update' : 'Add'} Experience
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingIndex(-1);
                  setCurrentExperience({
                    jobTitle: '',
                    company: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    isCurrentRole: false,
                    description: ''
                  });
                }}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white border-2 border-dashed border-gray-300 dark:border-gray-600"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Experience
        </Button>
      )}

    </div>
  );
};
