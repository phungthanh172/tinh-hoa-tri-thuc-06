
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Briefcase, Users, Heart } from 'lucide-react';

const TemplateSelector = ({ onSelect, onClose }) => {
  const templates = [
    {
      id: 'student',
      name: 'Student Journey',
      description: 'Perfect for students planning their academic and career path',
      icon: GraduationCap,
      color: 'bg-blue-500',
      preview: 'Education → Skills → Internship → Career'
    },
    {
      id: 'professional',
      name: 'Career Growth',
      description: 'For professionals looking to advance their career',
      icon: Briefcase,
      color: 'bg-green-500',
      preview: 'Current Role → Skills → Leadership → Executive'
    },
    {
      id: 'family',
      name: 'Family Planning',
      description: 'Balancing family life with personal and career goals',
      icon: Heart,
      color: 'bg-red-500',
      preview: 'Relationship → Home → Family → Legacy'
    },
    {
      id: 'retirement',
      name: 'Life Transition',
      description: 'Planning for retirement and new life chapters',
      icon: Users,
      color: 'bg-purple-500',
      preview: 'Career Wind-down → Hobbies → Travel → Community'
    }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Life Path Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card 
                key={template.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-300"
                onClick={() => onSelect(template)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        <strong>Preview:</strong> {template.preview}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <p className="text-sm text-gray-500">
            Don't worry, you can always customize or change templates later
          </p>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Start Blank
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
