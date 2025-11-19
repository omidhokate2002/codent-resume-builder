import { exportToWord } from '../../utils/exportUtils';
import { Button } from '../ui/button';
import { Download, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const WordExporter = ({ resumeData, templateName = 'Resume' }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      if (!resumeData || Object.keys(resumeData).length === 0) {
        toast.error('No resume data to export');
        return;
      }
      setIsExporting(true);
      await exportToWord(resumeData, templateName);
      toast.success('Word document exported successfully!');
    } catch (error) {
      console.error('Word export error:', error);
      toast.error('Failed to export Word document');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      className="gap-2"
      disabled={isExporting}
    >
      {isExporting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          Exporting...
        </>
      ) : (
        <>
          <FileText className="h-4 w-4" />
          Download Word
        </>
      )}
    </Button>
  );
};


