
import React from 'react';
import { Award, Download, Share2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
  const handleDownloadPDF = () => {
    console.log('Downloading certificate as PDF...');
    // Implementation would generate and download PDF
  };

  const handleShareToLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      `https://certificates.learnhub.com/verify/${certificateId}`
    )}`;
    window.open(shareUrl, '_blank');
  };

  const handleCopyVerificationLink = () => {
    const verificationUrl = `https://certificates.learnhub.com/verify/${certificateId}`;
    navigator.clipboard.writeText(verificationUrl);
    // Show toast notification
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-600" />
            Certificate of Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Certificate Preview */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-8 mb-6">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Award className="w-16 h-16 text-blue-600" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Certificate of Completion
                </h1>
                <p className="text-gray-600">This is to certify that</p>
              </div>

              <div className="py-4">
                <h2 className="text-4xl font-bold text-blue-700 border-b-2 border-blue-300 pb-2 inline-block">
                  {studentName}
                </h2>
              </div>

              <div className="space-y-2">
                <p className="text-gray-600">has successfully completed the course</p>
                <h3 className="text-2xl font-semibold text-gray-800">
                  {courseName}
                </h3>
                <p className="text-gray-600">
                  instructed by <span className="font-medium">{instructorName}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-4">
                <div>
                  <p className="text-sm text-gray-600">Date of Completion</p>
                  <p className="font-semibold">{completionDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Course Duration</p>
                  <p className="font-semibold">{courseHours} hours</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-500">
                  Certificate ID: {certificateId}
                </p>
                <p className="text-xs text-gray-500">
                  Verify at: certificates.learnhub.com/verify/{certificateId}
                </p>
              </div>
            </div>
          </div>

          {/* Certificate Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handleDownloadPDF} className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            
            <Button onClick={handleShareToLinkedIn} variant="outline" className="flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share on LinkedIn
            </Button>
            
            <Button onClick={handleCopyVerificationLink} variant="outline" className="flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              Copy Verification Link
            </Button>
          </div>

          {/* Certificate Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Certificate Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Student:</span>
                  <span className="font-medium">{studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Course:</span>
                  <span className="font-medium">{courseName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium">{instructorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Date:</span>
                  <span className="font-medium">{completionDate.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Verification</h4>
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  Certificate ID: {certificateId}
                </Badge>
                <p className="text-xs text-gray-600">
                  This certificate can be verified online using the certificate ID above.
                  Employers and institutions can confirm its authenticity.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateGenerator;
