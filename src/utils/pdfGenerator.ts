import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string[];
  }>;
  skills: string[];
  education: Array<{
    institution: string;
    degree: string;
    period: string;
  }>;
  certifications: string[];
}

export const generateCVPDF = async (cvData: CVData): Promise<void> => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(cvData.personalInfo.name, margin, yPosition);
  yPosition += 10;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(cvData.personalInfo.title, margin, yPosition);
  yPosition += 15;

  // Contact Info
  pdf.setFontSize(10);
  const contactInfo = [
    cvData.personalInfo.email,
    cvData.personalInfo.phone,
    cvData.personalInfo.location,
    cvData.personalInfo.linkedin,
    cvData.personalInfo.github
  ];
  
  contactInfo.forEach(info => {
    pdf.text(info, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 10;

  // Summary
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Professional Summary', margin, yPosition);
  yPosition += 8;
  
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(cvData.summary, margin, yPosition, pageWidth - (margin * 2), 10);
  yPosition += 10;

  // Experience
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Professional Experience', margin, yPosition);
  yPosition += 8;

  cvData.experience.forEach(exp => {
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${exp.position} - ${exp.company}`, margin, yPosition);
    yPosition += 6;
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'italic');
    pdf.text(exp.period, margin, yPosition);
    yPosition += 8;
    
    pdf.setFont('helvetica', 'normal');
    exp.description.forEach(desc => {
      yPosition = addText(`• ${desc}`, margin + 5, yPosition, pageWidth - (margin * 2) - 5, 9);
      yPosition += 2;
    });
    yPosition += 5;

    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = margin;
    }
  });

  // Skills
  if (yPosition > pageHeight - 60) {
    pdf.addPage();
    yPosition = margin;
  }

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Technical Skills', margin, yPosition);
  yPosition += 8;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const skillsText = cvData.skills.join(' • ');
  yPosition = addText(skillsText, margin, yPosition, pageWidth - (margin * 2));
  yPosition += 10;

  // Education
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Education', margin, yPosition);
  yPosition += 8;

  cvData.education.forEach(edu => {
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(edu.degree, margin, yPosition);
    yPosition += 6;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${edu.institution} - ${edu.period}`, margin, yPosition);
    yPosition += 8;
  });

  // Certifications
  if (cvData.certifications.length > 0) {
    yPosition += 5;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Certifications', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    cvData.certifications.forEach(cert => {
      pdf.text(`• ${cert}`, margin, yPosition);
      yPosition += 6;
    });
  }

  // Save the PDF
  pdf.save(`${cvData.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`);
};

export const generateCVFromElement = async (elementId: string, filename: string): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('CV element not found');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
};