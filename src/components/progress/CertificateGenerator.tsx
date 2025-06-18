
import React from 'react';
import { Award, Download, Share } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CertificateGeneratorProps {
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: Date;
  certificateId: string;
  courseHours: number;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  studentName,
  courseName,
  instructorName,
  completionDate,
  certificateId,
  courseHours
}) => {
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF certificate
    console.log('Downloading certificate...');
  };

  const handleShare = () => {
    // In a real app, this would share to social media
    const text = `I just completed "${courseName}" and earned my certificate! 🎓`;
    if (navigator.share) {
      navigator.share({
        title: 'Course Completion Certificate',
        text,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardContent className="p-8">
          {/* Certificate Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Award className="w-16 h-16 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificate of Completion</h1>
            <p className="text-gray-600">This certifies that</p>
          </div>

          {/* Student Name */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-purple-700 border-b-2 border-purple-200 pb-2 inline-block">
              {studentName}
            </h2>
          </div>

          {/* Course Details */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 mb-2">has successfully completed the course</p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">"{courseName}"</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium">Instructor</p>
                <p>{instructorName}</p>
              </div>
              <div>
                <p className="font-medium">Completion Date</p>
                <p>{completionDate.toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium">Course Hours</p>
                <p>{courseHours} hours</p>
              </div>
            </div>
          </div>

          {/* Certificate ID */}
          <div className="text-center mb-8">
            <p className="text-xs text-gray-500">Certificate ID: {certificateId}</p>
            <p className="text-xs text-gray-500">
              Verify at: learningplatform.com/verify/{certificateId}
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-between items-center">
            <div className="w-20 h-20 border-4 border-yellow-400 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-yellow-600" />
            </div>
            <div className="text-center">
              <div className="w-32 border-b-2 border-gray-400 mb-2"></div>
              <p className="text-sm text-gray-600">Digital Signature</p>
            </div>
            <div className="w-20 h-20 border-4 border-purple-400 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <Button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-700">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share className="w-4 h-4 mr-2" />
          Share Achievement
        </Button>
      </div>
    </div>
  );
};

export default CertificateGenerator;
