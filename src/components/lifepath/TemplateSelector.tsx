
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Briefcase, Users, Heart, Home, Plane } from 'lucide-react';

interface TemplateSelectorProps {
  onSelect: (template: any) => void;
  onClose: () => void;
}

const TemplateSelector = ({ onSelect, onClose }: TemplateSelectorProps) => {
  const templates = [
    {
      id: 'student',
      name: 'Student Journey',
      description: 'Perfect for students planning their academic and career path',
      icon: GraduationCap,
      color: 'bg-blue-500',
      preview: 'Education → Skills → Internship → Career',
      nodes: [
        { id: '1', type: 'lifeDomain', position: { x: 100, y: 100 }, data: { label: 'Education', icon: '🎓', color: '#3b82f6', priority: 'high' } },
        { id: '2', type: 'lifeDomain', position: { x: 300, y: 100 }, data: { label: 'Skills', icon: '💡', color: '#10b981', priority: 'high' } },
        { id: '3', type: 'milestone', position: { x: 500, y: 100 }, data: { label: 'Internship', icon: '💼', color: '#f59e0b', priority: 'medium' } },
        { id: '4', type: 'lifeDomain', position: { x: 700, y: 100 }, data: { label: 'Career', icon: '🚀', color: '#8b5cf6', priority: 'high' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true },
        { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', animated: true },
        { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', animated: true },
      ]
    },
    {
      id: 'professional',
      name: 'Career Growth',
      description: 'For professionals looking to advance their career',
      icon: Briefcase,
      color: 'bg-green-500',
      preview: 'Current Role → Skills → Leadership → Executive',
      nodes: [
        { id: '1', type: 'lifeDomain', position: { x: 100, y: 100 }, data: { label: 'Current Role', icon: '💼', color: '#3b82f6', priority: 'medium' } },
        { id: '2', type: 'lifeDomain', position: { x: 300, y: 100 }, data: { label: 'Skill Development', icon: '📚', color: '#10b981', priority: 'high' } },
        { id: '3', type: 'milestone', position: { x: 500, y: 100 }, data: { label: 'Leadership Role', icon: '👑', color: '#f59e0b', priority: 'high' } },
        { id: '4', type: 'lifeDomain', position: { x: 100, y: 300 }, data: { label: 'Work-Life Balance', icon: '⚖️', color: '#ec4899', priority: 'medium' } },
        { id: '5', type: 'lifeDomain', position: { x: 300, y: 300 }, data: { label: 'Financial Growth', icon: '💰', color: '#8b5cf6', priority: 'high' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true },
        { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', animated: true },
        { id: 'e1-4', source: '1', target: '4', type: 'smoothstep' },
        { id: 'e2-5', source: '2', target: '5', type: 'smoothstep' },
      ]
    },
    {
      id: 'family',
      name: 'Family Planning',
      description: 'Balancing family life with personal and career goals',
      icon: Heart,
      color: 'bg-red-500',
      preview: 'Relationship → Home → Family → Legacy',
      nodes: [
        { id: '1', type: 'lifeDomain', position: { x: 100, y: 100 }, data: { label: 'Relationship', icon: '💕', color: '#ef4444', priority: 'high' } },
        { id: '2', type: 'milestone', position: { x: 300, y: 100 }, data: { label: 'Home', icon: '🏠', color: '#10b981', priority: 'high' } },
        { id: '3', type: 'lifeDomain', position: { x: 500, y: 100 }, data: { label: 'Family', icon: '👨‍👩‍👧‍👦', color: '#f59e0b', priority: 'high' } },
        { id: '4', type: 'lifeDomain', position: { x: 200, y: 300 }, data: { label: 'Career Balance', icon: '⚖️', color: '#3b82f6', priority: 'medium' } },
        { id: '5', type: 'milestone', position: { x: 400, y: 300 }, data: { label: 'Legacy', icon: '🌟', color: '#8b5cf6', priority: 'medium' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true },
        { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', animated: true },
        { id: 'e1-4', source: '1', target: '4', type: 'smoothstep' },
        { id: 'e3-5', source: '3', target: '5', type: 'smoothstep', animated: true },
      ]
    },
    {
      id: 'retirement',
      name: 'Life Transition',
      description: 'Planning for retirement and new life chapters',
      icon: Users,
      color: 'bg-purple-500',
      preview: 'Career Wind-down → Hobbies → Travel → Community',
      nodes: [
        { id: '1', type: 'lifeDomain', position: { x: 100, y: 100 }, data: { label: 'Career Wind-down', icon: '📝', color: '#3b82f6', priority: 'medium' } },
        { id: '2', type: 'lifeDomain', position: { x: 300, y: 100 }, data: { label: 'Hobbies', icon: '🎨', color: '#10b981', priority: 'high' } },
        { id: '3', type: 'milestone', position: { x: 500, y: 100 }, data: { label: 'Travel', icon: '✈️', color: '#f59e0b', priority: 'high' } },
        { id: '4', type: 'lifeDomain', position: { x: 700, y: 100 }, data: { label: 'Community', icon: '🤝', color: '#8b5cf6', priority: 'medium' } },
        { id: '5', type: 'lifeDomain', position: { x: 300, y: 300 }, data: { label: 'Health Focus', icon: '🏃‍♂️', color: '#ef4444', priority: 'high' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true },
        { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', animated: true },
        { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', animated: true },
        { id: 'e2-5', source: '2', target: '5', type: 'smoothstep' },
      ]
    }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Life Path Template
          </DialogTitle>
          <p className="text-gray-600 mt-2">Start with a pre-designed template that matches your life stage and goals</p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card 
                key={template.id} 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300 group"
                onClick={() => onSelect(template)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-xl ${template.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl">{template.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {template.nodes?.length || 0} blocks
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border">
                        <strong className="text-purple-600">Flow:</strong> {template.preview}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <p className="text-sm text-gray-500">
            💡 Don't worry, you can always customize or switch templates later
          </p>
          <div className="space-x-3">
            <Button variant="outline" onClick={onClose}>
              Start Blank Canvas
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
