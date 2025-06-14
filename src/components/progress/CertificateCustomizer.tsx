
import React, { useState } from 'react';
import { Palette, Download, Eye, Share } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CertificateCustomizerProps {
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: Date;
  certificateId: string;
  courseHours: number;
}

const CertificateCustomizer: React.FC<CertificateCustomizerProps> = (props) => {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedColor, setSelectedColor] = useState('purple');

  const templates = [
    { id: 'classic', name: 'Classic', description: 'Traditional formal design' },
    { id: 'modern', name: 'Modern', description: 'Clean contemporary style' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined' },
    { id: 'creative', name: 'Creative', description: 'Artistic and unique' }
  ];

  const colorSchemes = [
    { id: 'purple', name: 'Purple', primary: 'bg-purple-600', secondary: 'bg-purple-100' },
    { id: 'blue', name: 'Blue', primary: 'bg-blue-600', secondary: 'bg-blue-100' },
    { id: 'green', name: 'Green', primary: 'bg-green-600', secondary: 'bg-green-100' },
    { id: 'gold', name: 'Gold', primary: 'bg-yellow-600', secondary: 'bg-yellow-100' }
  ];

  const getTemplateStyle = () => {
    const color = colorSchemes.find(c => c.id === selectedColor);
    const baseClasses = 'border-2 transition-all duration-300';
    
    switch (selectedTemplate) {
      case 'modern':
        return `${baseClasses} border-gray-300 bg-gradient-to-br from-white to-gray-50`;
      case 'elegant':
        return `${baseClasses} border-gray-400 bg-gradient-to-br from-gray-50 to-white shadow-lg`;
      case 'creative':
        return `${baseClasses} border-${color?.id}-300 bg-gradient-to-br from-${color?.id}-50 to-white`;
      default:
        return `${baseClasses} border-${color?.id}-200 bg-gradient-to-br from-${color?.id}-50 to-orange-50`;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Certificate Customization</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Certificate Template</label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-xs text-gray-600">{template.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium mb-3">Color Scheme</label>
            <div className="flex space-x-3">
              {colorSchemes.map((color) => (
                <div
                  key={color.id}
                  className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer transition-all ${
                    selectedColor === color.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedColor(color.id)}
                >
                  <div className={`w-6 h-6 rounded-full ${color.primary}`} />
                  <span className="text-sm font-medium">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Preview */}
      <Card className={getTemplateStyle()}>
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-800">Certificate of Completion</h1>
              <p className="text-gray-600">This certifies that</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-purple-700 border-b-2 border-purple-200 pb-2 inline-block">
                {props.studentName}
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700">has successfully completed the course</p>
              <h3 className="text-2xl font-semibold text-gray-800">"{props.courseName}"</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 pt-4">
                <div>
                  <p className="font-medium">Instructor</p>
                  <p>{props.instructorName}</p>
                </div>
                <div>
                  <p className="font-medium">Completion Date</p>
                  <p>{props.completionDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium">Course Hours</p>
                  <p>{props.courseHours} hours</p>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-2">
              <p className="text-xs text-gray-500">Certificate ID: {props.certificateId}</p>
              <p className="text-xs text-gray-500">
                Verify at: learningplatform.com/verify/{props.certificateId}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Preview Full Size
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline">
          <Share className="w-4 h-4 mr-2" />
          Share Achievement
        </Button>
      </div>
    </div>
  );
};

export default CertificateCustomizer;
