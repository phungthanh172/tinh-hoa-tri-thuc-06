
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Download, Share2, Calendar, User, Clock } from 'lucide-react';

const CertificateViewer = () => {
  const certificates = [
    {
      id: 'CERT-001',
      courseName: "Complete JavaScript Course 2024",
      instructor: "Jonas Schmedtmann",
      completedDate: "2024-12-15",
      issueDate: "2024-12-16",
      grade: "95%",
      hoursCompleted: 69,
      skills: ["JavaScript", "ES6+", "DOM Manipulation", "Async Programming"],
      certificateId: "UC-JS2024-001"
    },
    {
      id: 'CERT-002',
      courseName: "React - The Complete Guide 2024",
      instructor: "Maximilian Schwarzmüller",
      completedDate: "2024-11-28",
      issueDate: "2024-11-29",
      grade: "92%",
      hoursCompleted: 48,
      skills: ["React", "Hooks", "State Management", "Component Design"],
      certificateId: "UC-REACT2024-002"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certificates</h1>
        <p className="text-gray-600">View and manage your course completion certificates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {certificates.map((cert) => (
          <Card key={cert.id} className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardHeader className="text-center border-b border-yellow-200">
              <div className="flex justify-center mb-4">
                <Award className="w-16 h-16 text-yellow-600" />
              </div>
              <CardTitle className="text-xl mb-2">Certificate of Completion</CardTitle>
              <Badge variant="outline" className="border-yellow-600 text-yellow-700">
                Grade: {cert.grade}
              </Badge>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">{cert.courseName}</h3>
                <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
                  <User className="w-4 h-4" />
                  <span>Instructor: {cert.instructor}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Completed</p>
                    <p className="text-gray-600">{new Date(cert.completedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-gray-600">{cert.hoursCompleted} hours</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-medium mb-2">Skills Acquired:</p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-xs text-gray-500">
                  Certificate ID: {cert.certificateId}
                </p>
                <p className="text-xs text-gray-500">
                  Issued on: {new Date(cert.issueDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CertificateViewer;
