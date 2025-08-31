import { useNavigate } from "react-router-dom";
import { useResumeContext } from "../../context/resume-context";
import { useResumeSpecificContext } from "../../context";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Grid,
  Skeleton,

  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Visibility as PreviewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Description as ResumeIcon,
  CalendarToday as DateIcon,
  Work as WorkIcon
} from '@mui/icons-material';

export const ResumeCard = () => {
  const resumeContext = useResumeContext();
  const resumeSpecificContext = useResumeSpecificContext();
  const { isAuthenticated } = useAuth();
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  // Safety checks for context
  const resumeData = Array.isArray(resumeContext?.resumeData) ? resumeContext.resumeData : [];
  const isLoading = resumeContext?.isLoading || false;
  const fetchData = resumeContext?.fetchData || (() => {
    console.warn('fetchData not available from context');
  });
  const fetchDataById = resumeSpecificContext?.fetchDataById || (() => {
    console.warn('fetchDataById not available from context');
  });

  const handleUpdate = async (resumeId) => {
    if (fetchDataById) {
      await fetchDataById(resumeId);
    }
    navigate("/resume", {
      state: resumeId,
    });
  };

  const handlePreview = async (resumeId) => {
    if (fetchDataById) {
      await fetchDataById(resumeId);
    }
    navigate("/preview", {
      state: resumeId,
    });
  };

  const handleDelete = async (resumeId) => {
    if (window.confirm("Are you sure you want to delete this resume? This action cannot be undone.")) {
      try {
        setIsDeleted(true);
        await fetch(`/resume/${resumeId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsDeleted(false);
      }
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted]);

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item}>
            <Card sx={{ borderRadius: '20px', overflow: 'hidden' }}>
              <CardContent sx={{ p: 4 }}>
                <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="80%" height={20} sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: '16px' }} />
                  <Skeleton variant="rectangular" width={60} height={32} sx={{ borderRadius: '16px' }} />
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: '12px' }} />
                  <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: '12px' }} />
                  <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: '12px' }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--secondary-100) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3
          }}
        >
          <ResumeIcon sx={{ fontSize: 60, color: 'var(--primary-500)' }} />
        </Box>
        <Typography variant="h5" sx={{ mb: 2, color: 'var(--neutral-700)' }}>
          Please Login to Continue
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--neutral-600)', mb: 4 }}>
          You need to be logged in to view and manage your resumes
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/login')}
          sx={{
            borderRadius: '16px',
            px: 4,
            py: 2,
            background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
            boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 35px rgba(14, 165, 233, 0.4)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Login
        </Button>
      </Box>
    );
  }

  if (resumeData.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--secondary-100) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3
          }}
        >
          <ResumeIcon sx={{ fontSize: 60, color: 'var(--primary-500)' }} />
        </Box>
        <Typography variant="h5" sx={{ mb: 2, color: 'var(--neutral-700)' }}>
          No Resumes Yet
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--neutral-600)', mb: 4 }}>
          Create your first professional resume to get started
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<EditIcon />}
          onClick={() => navigate('/resume')}
          sx={{
            borderRadius: '16px',
            px: 4,
            py: 2,
            background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
            boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 35px rgba(14, 165, 233, 0.4)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Create Your First Resume
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {resumeData.map((resume) => (
        <Grid item xs={12} md={6} lg={4} key={resume.id}>
          <Card
            sx={{
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)',
                p: 3,
                color: 'white'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <ResumeIcon sx={{ fontSize: 24 }} />
                {resume.profile?.title || 'Untitled Resume'}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {resume.profile?.profileName || 'No name specified'}
              </Typography>
            </Box>
            
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--neutral-600)',
                  mb: 3,
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {resume.profile?.summary || 'No summary available'}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Chip
                  icon={<WorkIcon />}
                  label={`${resume.experience?.length || 0} Experience${resume.experience?.length !== 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    mr: 1,
                    mb: 1,
                    background: 'rgba(14, 165, 233, 0.1)',
                    color: 'var(--primary-600)',
                    borderRadius: '12px'
                  }}
                />
                <Chip
                  icon={<DateIcon />}
                  label="Recently Updated"
                  size="small"
                  sx={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    color: 'var(--success-600)',
                    borderRadius: '12px'
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Tooltip title="Preview Resume">
                  <IconButton
                    onClick={() => handlePreview(resume.id)}
                    sx={{
                      background: 'rgba(14, 165, 233, 0.1)',
                      color: 'var(--primary-600)',
                      '&:hover': {
                        background: 'rgba(14, 165, 233, 0.2)',
                        transform: 'scale(1.05)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <PreviewIcon />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Edit Resume">
                  <IconButton
                    onClick={() => handleUpdate(resume?.id)}
                    sx={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      color: 'var(--success-600)',
                      '&:hover': {
                        background: 'rgba(34, 197, 94, 0.2)',
                        transform: 'scale(1.05)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Delete Resume">
                  <IconButton
                    onClick={() => handleDelete(resume.id)}
                    sx={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: 'var(--error-600)',
                      '&:hover': {
                        background: 'rgba(239, 68, 68, 0.2)',
                        transform: 'scale(1.05)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
