import { exportToPDF } from '../../utils/exportUtils';
import { Button } from '../ui/button';
import { Download, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

export const PDFExporter = ({ resumeData, templateName = 'Resume' }) => {
  const handleExport = () => {
    try {
      if (!resumeData || Object.keys(resumeData).length === 0) {
        toast.error('No resume data to export');
        return;
      }
      exportToPDF(resumeData, templateName);
      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF');
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="default"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Download PDF
    </Button>
  );
};


