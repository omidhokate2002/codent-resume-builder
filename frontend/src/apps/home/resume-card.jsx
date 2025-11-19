import { useNavigate } from "react-router-dom";
import { useResumeContext } from "../../context/resume-context";
import { useResumeSpecificContext } from "../../context";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Calendar, 
  Briefcase,
  Loader2
} from "lucide-react";
import { resumeAPI } from "../../services/api";
import { toast } from "react-toastify";

export const ResumeCard = () => {
  const resumeContext = useResumeContext();
  const resumeSpecificContext = useResumeSpecificContext();
  const { isAuthenticated } = useAuth();
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resumeData = Array.isArray(resumeContext?.resumeData) ? resumeContext.resumeData : [];
  const isLoading = resumeContext?.isLoading || false;
  const fetchData = resumeContext?.fetchData || (() => {});
  const fetchDataById = resumeSpecificContext?.fetchDataById || (() => {});

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
        setLoading(true);
        setIsDeleted(true);
        await resumeAPI.deleteResume(resumeId);
        toast.success('Resume deleted successfully');
        if (fetchData) {
          await fetchData();
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete resume');
      } finally {
        setIsDeleted(false);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (fetchData && isAuthenticated) {
      fetchData();
    }
  }, [isDeleted, isAuthenticated, fetchData]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="animate-pulse">
            <CardHeader className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              <div className="h-6 bg-white/20 rounded w-3/4"></div>
              <div className="h-4 bg-white/20 rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center mx-auto mb-6">
          <FileText className="h-16 w-16 text-primary-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Please Login to Continue
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You need to be logged in to view and manage your resumes
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </div>
    );
  }

  if (resumeData.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center mx-auto mb-6">
          <FileText className="h-16 w-16 text-primary-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No Resumes Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Create your first professional resume to get started
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/resume')}
        >
          <Edit className="mr-2 h-5 w-5" />
          Create Your First Resume
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumeData.map((resume) => (
        <Card 
          key={resume.id}
          className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
        >
          <CardHeader className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-6 w-6" />
              <CardTitle className="text-lg">
                {resume.profile?.title || 'Untitled Resume'}
              </CardTitle>
            </div>
            <p className="text-sm text-white/90">
              {resume.profile?.profileName || 'No name specified'}
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {resume.profile?.summary || 'No summary available'}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                <Briefcase className="h-3 w-3" />
                {resume.experience?.length || 0} Experience{resume.experience?.length !== 1 ? 's' : ''}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                <Calendar className="h-3 w-3" />
                Recently Updated
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreview(resume.id)}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdate(resume?.id)}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(resume.id)}
                disabled={loading}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
