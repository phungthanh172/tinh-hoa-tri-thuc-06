
import React, { useState } from 'react';
import { Palette, Type, Layout, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CertificateCustomizerProps {
  studentName: string;
  courseName: string;
  instructorName: string;
  completionDate: Date;
  certificateId: string;
  courseHours: number;
}

const CertificateCustomizer: React.FC<CertificateCustomizerProps> = ({
  studentName,
  courseName,
  instructorName,
  completionDate,
  certificateId,
  courseHours
}) => {
  const [template, setTemplate] = useState('professional');
  const [colorScheme, setColorScheme] = useState('blue');
  const [fontStyle, setFontStyle] = useState('serif');

  const templates = [
    { id: 'professional', name: 'Professional', description: 'Clean and formal design' },
    { id: 'modern', name: 'Modern', description: 'Contemporary with geometric elements' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated with decorative borders' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and clean layout' }
  ];

  const colorSchemes = [
    { id: 'blue', name: 'Blue', colors: 'from-blue-50 to-blue-100 border-blue-200' },
    { id: 'purple', name: 'Purple', colors: 'from-purple-50 to-purple-100 border-purple-200' },
    { id: 'green', name: 'Green', colors: 'from-green-50 to-green-100 border-green-200' },
    { id: 'gold', name: 'Gold', colors: 'from-yellow-50 to-amber-100 border-yellow-200' }
  ];

  const fontStyles = [
    { id: 'serif', name: 'Serif', className: 'font-serif' },
    { id: 'sans', name: 'Sans Serif', className: 'font-sans' },
    { id: 'mono', name: 'Monospace', className: 'font-mono' }
  ];

  const selectedColorScheme = colorSchemes.find(c => c.id === colorScheme);
  const selectedFont = fontStyles.find(f => f.id === fontStyle);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="w-6 h-6 mr-2" />
            Customize Your Certificate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-6">
              {/* Certificate Preview */}
              <div className={`bg-gradient-to-br ${selectedColorScheme?.colors} border-2 rounded-lg p-8 ${selectedFont?.className}`}>
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <Award className="w-16 h-16 text-current opacity-80" />
                  </div>
                  
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      Certificate of Completion
                    </h1>
                    <p className="text-gray-600">This is to certify that</p>
                  </div>

                  <div className="py-4">
                    <h2 className="text-4xl font-bold text-current border-b-2 border-current pb-2 inline-block opacity-80">
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
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customize" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Template Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Layout className="w-5 h-5 mr-2" />
                      Template
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={template} onValueChange={setTemplate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            <div>
                              <div className="font-medium">{t.name}</div>
                              <div className="text-sm text-gray-500">{t.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Color Scheme */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Palette className="w-5 h-5 mr-2" />
                      Color Scheme
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={colorScheme} onValueChange={setColorScheme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorSchemes.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Font Style */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Type className="w-5 h-5 mr-2" />
                      Font Style
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={fontStyle} onValueChange={setFontStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontStyles.map((f) => (
                          <SelectItem key={f.id} value={f.id}>
                            <span className={f.className}>{f.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button size="lg">
                  Apply Customization
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateCustomizer;
