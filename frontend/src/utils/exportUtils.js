import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

// PDF Export using jsPDF
export const exportToPDF = (resumeData, templateName = 'Resume') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Helper function to add text with word wrap
  const addText = (text, fontSize = 12, isBold = false, color = [0, 0, 0]) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, contentWidth);
    if (yPosition + (lines.length * fontSize * 0.4) > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * fontSize * 0.4 + 5;
  };

  // Header
  if (resumeData.profile) {
    const profile = resumeData.profile;
    if (profile.firstName || profile.lastName) {
      addText(`${profile.firstName || ''} ${profile.lastName || ''}`.trim(), 24, true, [37, 99, 235]);
      yPosition += 5;
    }
    if (profile.title) {
      addText(profile.title, 14, false, [100, 100, 100]);
      yPosition += 5;
    }
    if (profile.email || profile.phone || profile.address) {
      const contactInfo = [
        profile.email,
        profile.phone,
        profile.address
      ].filter(Boolean).join(' | ');
      addText(contactInfo, 10, false, [100, 100, 100]);
      yPosition += 10;
    }
  }

  // Summary
  if (resumeData.profile?.summary) {
    addText('PROFESSIONAL SUMMARY', 14, true);
    addText(resumeData.profile.summary, 11, false);
    yPosition += 5;
  }

  // Experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    addText('PROFESSIONAL EXPERIENCE', 14, true);
    resumeData.experience.forEach((exp) => {
      if (exp.jobTitle) {
        addText(exp.jobTitle, 12, true);
      }
      if (exp.company) {
        addText(exp.company, 11, false, [100, 100, 100]);
      }
      if (exp.startDate || exp.endDate) {
        const dateRange = `${exp.startDate || ''} - ${exp.endDate || 'Present'}`;
        addText(dateRange, 10, false, [100, 100, 100]);
      }
      if (exp.description) {
        addText(exp.description, 10, false);
      }
      yPosition += 5;
    });
  }

  // Education
  if (resumeData.education && resumeData.education.length > 0) {
    addText('EDUCATION', 14, true);
    resumeData.education.forEach((edu) => {
      if (edu.degree) {
        addText(edu.degree, 12, true);
      }
      if (edu.institution) {
        addText(edu.institution, 11, false, [100, 100, 100]);
      }
      if (edu.graduationDate) {
        addText(edu.graduationDate, 10, false, [100, 100, 100]);
      }
      yPosition += 5;
    });
  }

  // Skills
  if (resumeData.skills && resumeData.skills.length > 0) {
    addText('SKILLS', 14, true);
    const skillsText = resumeData.skills.map(s => s.name || s).join(', ');
    addText(skillsText, 11, false);
  }

  // Save PDF
  const fileName = `${templateName}_${new Date().getTime()}.pdf`;
  doc.save(fileName);
};

// Word Export using docx
export const exportToWord = async (resumeData, templateName = 'Resume') => {
  const children = [];

  // Header
  if (resumeData.profile) {
    const profile = resumeData.profile;
    if (profile.firstName || profile.lastName) {
      children.push(
        new Paragraph({
          text: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        })
      );
    }
    if (profile.title) {
      children.push(
        new Paragraph({
          text: profile.title,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        })
      );
    }
    if (profile.email || profile.phone || profile.address) {
      const contactInfo = [
        profile.email,
        profile.phone,
        profile.address
      ].filter(Boolean).join(' | ');
      children.push(
        new Paragraph({
          text: contactInfo,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        })
      );
    }
  }

  // Summary
  if (resumeData.profile?.summary) {
    children.push(
      new Paragraph({
        text: 'PROFESSIONAL SUMMARY',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    );
    children.push(
      new Paragraph({
        text: resumeData.profile.summary,
        spacing: { after: 400 },
      })
    );
  }

  // Experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    children.push(
      new Paragraph({
        text: 'PROFESSIONAL EXPERIENCE',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    );
    resumeData.experience.forEach((exp) => {
      if (exp.jobTitle) {
        children.push(
          new Paragraph({
            text: exp.jobTitle,
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 100 },
          })
        );
      }
      const companyInfo = [
        exp.company,
        exp.startDate ? `${exp.startDate} - ${exp.endDate || 'Present'}` : null
      ].filter(Boolean).join(' | ');
      if (companyInfo) {
        children.push(
          new Paragraph({
            text: companyInfo,
            spacing: { after: 200 },
          })
        );
      }
      if (exp.description) {
        children.push(
          new Paragraph({
            text: exp.description,
            spacing: { after: 400 },
          })
        );
      }
    });
  }

  // Education
  if (resumeData.education && resumeData.education.length > 0) {
    children.push(
      new Paragraph({
        text: 'EDUCATION',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    );
    resumeData.education.forEach((edu) => {
      if (edu.degree) {
        children.push(
          new Paragraph({
            text: edu.degree,
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 100 },
          })
        );
      }
      const eduInfo = [
        edu.institution,
        edu.graduationDate
      ].filter(Boolean).join(' | ');
      if (eduInfo) {
        children.push(
          new Paragraph({
            text: eduInfo,
            spacing: { after: 400 },
          })
        );
      }
    });
  }

  // Skills
  if (resumeData.skills && resumeData.skills.length > 0) {
    children.push(
      new Paragraph({
        text: 'SKILLS',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    );
    const skillsText = resumeData.skills.map(s => s.name || s).join(', ');
    children.push(
      new Paragraph({
        text: skillsText,
        spacing: { after: 400 },
      })
    );
  }

  // Create document
  const doc = new Document({
    sections: [{
      properties: {},
      children: children,
    }],
  });

  // Generate and save
  const blob = await Packer.toBlob(doc);
  const fileName = `${templateName}_${new Date().getTime()}.docx`;
  saveAs(blob, fileName);
};


