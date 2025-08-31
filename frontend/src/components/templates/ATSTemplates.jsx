import { Box, Typography } from '@mui/material';
import { getDateInRequiredFormat } from '../../utils';

// Base ATS-friendly template styles
const atsStyles = {
  container: {
    maxWidth: '8.5in',
    margin: '0 auto',
    padding: '0.5in',
    fontFamily: 'Arial, sans-serif',
    fontSize: '11pt',
    lineHeight: 1.4,
    color: '#000000',
    backgroundColor: '#ffffff'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #000000',
    paddingBottom: '10px'
  },
  name: {
    fontSize: '18pt',
    fontWeight: 'bold',
    marginBottom: '5px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  title: {
    fontSize: '14pt',
    fontWeight: 'normal',
    marginBottom: '10px'
  },
  contact: {
    fontSize: '10pt',
    lineHeight: 1.2
  },
  section: {
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '12pt',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottom: '1px solid #000000',
    paddingBottom: '2px',
    marginBottom: '10px'
  },
  entry: {
    marginBottom: '15px'
  },
  entryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '5px'
  },
  jobTitle: {
    fontWeight: 'bold',
    fontSize: '11pt'
  },
  company: {
    fontWeight: 'normal',
    fontSize: '11pt'
  },
  dates: {
    fontSize: '10pt',
    fontStyle: 'italic'
  },
  location: {
    fontSize: '10pt',
    color: '#666666'
  },
  description: {
    fontSize: '10pt',
    marginTop: '5px'
  },
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px'
  },
  skill: {
    backgroundColor: '#f0f0f0',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '10pt'
  }
};

// Modern ATS Template
export const ModernATSTemplate = ({ resumeData }) => {
  const { profile, experience, education, projects, skills } = resumeData;

  return (
    <Box sx={atsStyles.container}>
      {/* Header */}
      <Box sx={atsStyles.header}>
        <Typography sx={atsStyles.name}>
          {profile?.firstName} {profile?.lastName}
        </Typography>
        <Typography sx={atsStyles.title}>
          {profile?.title}
        </Typography>
        <Box sx={atsStyles.contact}>
          <Typography component="span">
            {profile?.email} | {profile?.phone}
          </Typography>
          <br />
          <Typography component="span">
            {profile?.address}, {profile?.city}, {profile?.state} {profile?.zipCode}
          </Typography>
          {profile?.linkedin && (
            <>
              <br />
              <Typography component="span">LinkedIn: {profile.linkedin}</Typography>
            </>
          )}
          {profile?.github && (
            <Typography component="span"> | GitHub: {profile.github}</Typography>
          )}
        </Box>
      </Box>

      {/* Professional Summary */}
      {profile?.summary && (
        <Box sx={atsStyles.section}>
          <Typography sx={atsStyles.sectionTitle}>Professional Summary</Typography>
          <Typography sx={{ fontSize: '11pt' }}>
            {profile.summary}
          </Typography>
        </Box>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <Box sx={atsStyles.section}>
          <Typography sx={atsStyles.sectionTitle}>Professional Experience</Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={atsStyles.entry}>
              <Box sx={atsStyles.entryHeader}>
                <Box>
                  <Typography sx={atsStyles.jobTitle}>{exp.title}</Typography>
                  <Typography sx={atsStyles.company}>{exp.company}</Typography>
                  <Typography sx={atsStyles.location}>{exp.location}</Typography>
                </Box>
                <Typography sx={atsStyles.dates}>
                  {getDateInRequiredFormat(exp.startDate)} - {getDateInRequiredFormat(exp.endDate)}
                </Typography>
              </Box>
              {exp.responsibilities && (
                <Box sx={atsStyles.description}>
                  {exp.responsibilities.split(',').map((resp, i) => (
                    <Typography key={i} sx={{ fontSize: '10pt', marginBottom: '2px' }}>
                      • {resp.trim()}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <Box sx={atsStyles.section}>
          <Typography sx={atsStyles.sectionTitle}>Projects</Typography>
          {projects.map((project, index) => (
            <Box key={index} sx={atsStyles.entry}>
              <Box sx={atsStyles.entryHeader}>
                <Typography sx={atsStyles.jobTitle}>{project.title}</Typography>
                <Typography sx={atsStyles.dates}>
                  {getDateInRequiredFormat(project.startDate)} - {getDateInRequiredFormat(project.endDate)}
                </Typography>
              </Box>
              {project.description && (
                <Box sx={atsStyles.description}>
                  {project.description.split(',').map((desc, i) => (
                    <Typography key={i} sx={{ fontSize: '10pt', marginBottom: '2px' }}>
                      • {desc.trim()}
                    </Typography>
                  ))}
                </Box>
              )}
              {project.technologies && (
                <Box sx={{ marginTop: '5px' }}>
                  <Typography sx={{ fontSize: '10pt', fontWeight: 'bold' }}>
                    Technologies: {project.technologies}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <Box sx={atsStyles.section}>
          <Typography sx={atsStyles.sectionTitle}>Education</Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={atsStyles.entry}>
              <Box sx={atsStyles.entryHeader}>
                <Box>
                  <Typography sx={atsStyles.jobTitle}>{edu.degree}</Typography>
                  <Typography sx={atsStyles.company}>{edu.institution}</Typography>
                  <Typography sx={atsStyles.location}>{edu.location}</Typography>
                </Box>
                <Typography sx={atsStyles.dates}>
                  {getDateInRequiredFormat(edu.graduationDate)}
                </Typography>
              </Box>
              {edu.gpa && (
                <Typography sx={{ fontSize: '10pt' }}>GPA: {edu.gpa}</Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <Box sx={atsStyles.section}>
          <Typography sx={atsStyles.sectionTitle}>Technical Skills</Typography>
          <Typography sx={{ fontSize: '11pt' }}>
            {skills.join(' • ')}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// Software Engineer Template
export const SoftwareEngineerTemplate = ({ resumeData }) => {
  const { profile, experience, education, projects, skills } = resumeData;

  return (
    <Box sx={atsStyles.container}>
      {/* Header */}
      <Box sx={{ ...atsStyles.header, borderBottom: '3px solid #2196F3' }}>
        <Typography sx={{ ...atsStyles.name, color: '#2196F3' }}>
          {profile?.firstName} {profile?.lastName}
        </Typography>
        <Typography sx={atsStyles.title}>
          {profile?.title || 'Software Engineer'}
        </Typography>
        <Box sx={atsStyles.contact}>
          <Typography component="span">
            {profile?.email} | {profile?.phone} | {profile?.github}
          </Typography>
          <br />
          <Typography component="span">
            {profile?.address}, {profile?.city}, {profile?.state}
          </Typography>
        </Box>
      </Box>

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <Box sx={atsStyles.section}>
          <Typography sx={{ ...atsStyles.sectionTitle, color: '#2196F3' }}>
            Technical Skills
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <Typography sx={{ fontSize: '11pt' }}>
              <strong>Languages:</strong> {skills.filter(s => s.category === 'languages' || !s.category).join(', ')}
            </Typography>
            <Typography sx={{ fontSize: '11pt' }}>
              <strong>Frameworks:</strong> {skills.filter(s => s.category === 'frameworks').join(', ')}
            </Typography>
            <Typography sx={{ fontSize: '11pt' }}>
              <strong>Tools:</strong> {skills.filter(s => s.category === 'tools').join(', ')}
            </Typography>
            <Typography sx={{ fontSize: '11pt' }}>
              <strong>Databases:</strong> {skills.filter(s => s.category === 'databases').join(', ')}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Professional Summary */}
      {profile?.summary && (
        <Box sx={atsStyles.section}>
          <Typography sx={{ ...atsStyles.sectionTitle, color: '#2196F3' }}>
            Professional Summary
          </Typography>
          <Typography sx={{ fontSize: '11pt' }}>
            {profile.summary}
          </Typography>
        </Box>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <Box sx={atsStyles.section}>
          <Typography sx={{ ...atsStyles.sectionTitle, color: '#2196F3' }}>
            Professional Experience
          </Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={atsStyles.entry}>
              <Box sx={atsStyles.entryHeader}>
                <Box>
                  <Typography sx={atsStyles.jobTitle}>{exp.title}</Typography>
                  <Typography sx={atsStyles.company}>{exp.company} | {exp.location}</Typography>
                </Box>
                <Typography sx={atsStyles.dates}>
                  {getDateInRequiredFormat(exp.startDate)} - {getDateInRequiredFormat(exp.endDate)}
                </Typography>
              </Box>
              {exp.responsibilities && (
                <Box sx={atsStyles.description}>
                  {exp.responsibilities.split(',').map((resp, i) => (
                    <Typography key={i} sx={{ fontSize: '10pt', marginBottom: '3px' }}>
                      • {resp.trim()}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <Box sx={atsStyles.section}>
          <Typography sx={{ ...atsStyles.sectionTitle, color: '#2196F3' }}>
            Technical Projects
          </Typography>
          {projects.map((project, index) => (
            <Box key={index} sx={atsStyles.entry}>
              <Box sx={atsStyles.entryHeader}>
                <Typography sx={atsStyles.jobTitle}>{project.title}</Typography>
                <Typography sx={atsStyles.dates}>
                  {getDateInRequiredFormat(project.startDate)} - {getDateInRequiredFormat(project.endDate)}
                </Typography>
              </Box>
              {project.description && (
                <Box sx={atsStyles.description}>
                  {project.description.split(',').map((desc, i) => (
                    <Typography key={i} sx={{ fontSize: '10pt', marginBottom: '2px' }}>
                      • {desc.trim()}
                    </Typography>
                  ))}
                </Box>
              )}
              {project.technologies && (
                <Typography sx={{ fontSize: '10pt', fontWeight: 'bold', marginTop: '3px' }}>
                  Technologies: {project.technologies}
                </Typography>
              )}
              {project.github && (
                <Typography sx={{ fontSize: '10pt', marginTop: '2px' }}>
                  GitHub: {project.github}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <Box sx={atsStyles.section}>
          <Typography sx={{ ...atsStyles.sectionTitle, color: '#2196F3' }}>
            Education
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={atsStyles.entry}>
              <Box sx={atsStyles.entryHeader}>
                <Box>
                  <Typography sx={atsStyles.jobTitle}>{edu.degree}</Typography>
                  <Typography sx={atsStyles.company}>{edu.institution} | {edu.location}</Typography>
                </Box>
                <Typography sx={atsStyles.dates}>
                  {getDateInRequiredFormat(edu.graduationDate)}
                </Typography>
              </Box>
              {edu.gpa && (
                <Typography sx={{ fontSize: '10pt' }}>GPA: {edu.gpa}</Typography>
              )}
              {edu.coursework && (
                <Typography sx={{ fontSize: '10pt' }}>
                  Relevant Coursework: {edu.coursework}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

// Export template renderer
export const renderTemplate = (templateId, resumeData) => {
  switch (templateId) {
    case 'software-engineer':
      return <SoftwareEngineerTemplate resumeData={resumeData} />;
    case 'modern-ats':
    default:
      return <ModernATSTemplate resumeData={resumeData} />;
  }
};
