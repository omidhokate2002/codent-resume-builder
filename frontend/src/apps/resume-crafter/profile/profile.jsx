import { useState } from "react";
import { TextInput } from "../../../components";
import { useResumeSpecificContext } from "../../../context";
import { 
  Box, 
  Typography, 
  Button, 
  Snackbar, 
  Alert,
  Paper,
  Divider,
  Grid
} from "@mui/material";
import { 
  Save as SaveIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

export const ProfileInputs = () => {
  const resumeContext = useResumeSpecificContext();
  
  // Safety checks for context
  const dirtyResume = resumeContext?.dirtyResume || {};
  const setDirtyResume = resumeContext?.setDirtyResume || (() => {
    console.warn('setDirtyResume not available from context');
  });
  const isSaved = resumeContext?.isSaved || false;
  const alertState = resumeContext?.alertState || { vertical: "top", horizontal: "center" };
  const setIsSaved = resumeContext?.setIsSaved || (() => {
    console.warn('setIsSaved not available from context');
  });

  const [profileInfo, setProfileInfo] = useState({
    profileName: dirtyResume?.profile?.profileName || '',
    title: dirtyResume?.profile?.title || '',
    email: dirtyResume?.profile?.email || '',
    phone: dirtyResume?.profile?.phone || '',
    summary: dirtyResume?.profile?.summary || '',
    address: dirtyResume?.profile?.address || '',
  });
  const { vertical, horizontal } = alertState;

  const { email, profileName, phone, summary, title, address } = profileInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (setDirtyResume) {
      setDirtyResume({ ...dirtyResume, profile: profileInfo });
    }
    if (setIsSaved) {
      setIsSaved(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
            p: 4,
            textAlign: 'center',
            color: 'white'
          }}
        >
          <PersonIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Personal Information
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Fill in your personal details to create a professional resume
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <form onSubmit={handleSave}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextInput
                  label="Full Name"
                  type="text"
                  id="profileName"
                  name="profileName"
                  value={profileName}
                  onChange={handleChange}
                  required={true}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'var(--neutral-400)' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextInput
                  label="Job Title"
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  required={true}
                  InputProps={{
                    startAdornment: <WorkIcon sx={{ mr: 1, color: 'var(--neutral-400)' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextInput
                  label="Email Address"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required={true}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'var(--neutral-400)' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextInput
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                  required={true}
                  pattern="^[6-9]\d{9}$"
                  InputProps={{
                    startAdornment: <PhoneIcon sx={{ mr: 1, color: 'var(--neutral-400)' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextInput
                  label="Address"
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  required={true}
                  InputProps={{
                    startAdornment: <LocationIcon sx={{ mr: 1, color: 'var(--neutral-400)' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextInput
                  label="Professional Summary"
                  type="text"
                  id="summary"
                  name="summary"
                  value={summary}
                  onChange={handleChange}
                  required={true}
                  multiline
                  rows={4}
                  InputProps={{
                    startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'var(--neutral-400)', mt: 1 }} />
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: '16px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, var(--success-500) 0%, var(--success-600) 100%)',
                  boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, var(--success-600) 0%, var(--success-700) 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(34, 197, 94, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Save Profile Information
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>

      {isSaved && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={isSaved}
          autoHideDuration={6000}
          onClose={() => setIsSaved(false)}
          key={vertical + horizontal}
        >
          <Alert
            onClose={() => setIsSaved(!isSaved)}
            severity="success"
            sx={{ 
              width: "100%",
              borderRadius: '12px',
              background: 'var(--success-50)',
              color: 'var(--success-800)',
              border: '1px solid var(--success-200)'
            }}
          >
            Profile information saved successfully! Continue to the next section.
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};
