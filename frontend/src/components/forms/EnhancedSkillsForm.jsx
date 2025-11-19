import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Code, 
  GraduationCap, 
  Award,
  Plus,
  Trash2,
  ChevronRight,
  X
} from 'lucide-react';
import { useResumeSpecificContext } from '../../context';

export const EnhancedSkillsForm = ({ onNext, onSave }) => {
  const resumeContext = useResumeSpecificContext();
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({
    degree: '',
    institution: '',
    location: '',
    graduationDate: '',
    gpa: ''
  });
  const [currentCert, setCurrentCert] = useState({
    name: '',
    issuer: '',
    date: '',
    credentialId: ''
  });

  useEffect(() => {
    const existingData = resumeContext?.resumeById || {};
    if (existingData.skills) setSkills(existingData.skills);
    if (existingData.education) setEducation(existingData.education);
  }, [resumeContext?.resumeById]);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const skillObj = typeof newSkill === 'string' ? { name: newSkill } : newSkill;
      setSkills([...skills, skillObj]);
      setNewSkill('');
      updateContext();
    }
  };

  const handleRemoveSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    updateContext();
  };

  const handleAddEducation = () => {
    if (currentEducation.degree && currentEducation.institution) {
      setEducation([...education, currentEducation]);
      setCurrentEducation({
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        gpa: ''
      });
      setShowEducationForm(false);
      updateContext();
    }
  };

  const handleAddCert = () => {
    if (currentCert.name && currentCert.issuer) {
      setCertifications([...certifications, currentCert]);
      setCurrentCert({
        name: '',
        issuer: '',
        date: '',
        credentialId: ''
      });
      setShowCertForm(false);
      updateContext();
    }
  };

  const updateContext = () => {
    const updatedResume = {
      ...resumeContext?.dirtyResume,
      skills: skills,
      education: education,
      certifications: certifications
    };
    resumeContext?.setDirtyResume(updatedResume);
  };

  const handleSave = () => {
    updateContext();
    if (onSave) onSave({ skills, education, certifications });
    if (onNext) onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Education & Skills</h2>
        <p className="text-gray-600 dark:text-gray-400">Add your education, skills, and certifications</p>
      </div>

      {/* Skills Section */}
      <Card className="bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Code className="h-5 w-5" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white flex-1"
              placeholder="Add a skill (e.g., JavaScript, Python, React)"
            />
            <Button onClick={handleAddSkill} className="bg-primary-600 hover:bg-primary-700">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700 rounded-full text-primary-700 dark:text-primary-300"
                >
                  <span>{typeof skill === 'string' ? skill : skill.name}</span>
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="hover:text-red-500 dark:hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card className="bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.length > 0 && (
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg border border-gray-300 dark:border-gray-600">
                  <h3 className="text-gray-900 dark:text-white font-semibold">{edu.degree}</h3>
                  <p className="text-primary-600 dark:text-primary-400">{edu.institution}</p>
                  {edu.location && <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.location}</p>}
                  {edu.graduationDate && <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.graduationDate}</p>}
                  {edu.gpa && <p className="text-gray-600 dark:text-gray-400 text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
          {showEducationForm ? (
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-300 dark:border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-white">Degree *</Label>
                  <Input
                    value={currentEducation.degree}
                    onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-white">Institution *</Label>
                  <Input
                    value={currentEducation.institution}
                    onChange={(e) => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    placeholder="University Name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-white">Location</Label>
                  <Input
                    value={currentEducation.location}
                    onChange={(e) => setCurrentEducation({ ...currentEducation, location: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    placeholder="City, State"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-white">Graduation Date</Label>
                  <Input
                    type="month"
                    value={currentEducation.graduationDate}
                    onChange={(e) => setCurrentEducation({ ...currentEducation, graduationDate: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-900 dark:text-white">GPA (Optional)</Label>
                <Input
                  value={currentEducation.gpa}
                  onChange={(e) => setCurrentEducation({ ...currentEducation, gpa: e.target.value })}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  placeholder="3.8"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddEducation} className="bg-primary-600 hover:bg-primary-700">
                  Add Education
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEducationForm(false)}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setShowEducationForm(true)}
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-dashed"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <Card className="bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <Award className="h-5 w-5" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {certifications.length > 0 && (
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg border border-gray-300 dark:border-gray-600">
                  <h3 className="text-gray-900 dark:text-white font-semibold">{cert.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400">{cert.issuer}</p>
                  {cert.date && <p className="text-gray-600 dark:text-gray-400 text-sm">{cert.date}</p>}
                  {cert.credentialId && <p className="text-gray-600 dark:text-gray-400 text-sm">ID: {cert.credentialId}</p>}
                </div>
              ))}
            </div>
          )}
          {showCertForm ? (
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-300 dark:border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-white">Certification Name *</Label>
                  <Input
                    value={currentCert.name}
                    onChange={(e) => setCurrentCert({ ...currentCert, name: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-white">Issuing Organization *</Label>
                  <Input
                    value={currentCert.issuer}
                    onChange={(e) => setCurrentCert({ ...currentCert, issuer: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-white">Issue Date</Label>
                  <Input
                    type="month"
                    value={currentCert.date}
                    onChange={(e) => setCurrentCert({ ...currentCert, date: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900 dark:text-white">Credential ID</Label>
                  <Input
                    value={currentCert.credentialId}
                    onChange={(e) => setCurrentCert({ ...currentCert, credentialId: e.target.value })}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddCert} className="bg-primary-600 hover:bg-primary-700">
                  Add Certification
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCertForm(false)}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setShowCertForm(true)}
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-dashed"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </Button>
          )}
        </CardContent>
      </Card>

    </div>
  );
};
