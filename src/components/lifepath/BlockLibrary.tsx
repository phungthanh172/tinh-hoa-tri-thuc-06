
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Heart, 
  GraduationCap, 
  DollarSign, 
  Gamepad2, 
  Home,
  Users,
  Zap,
  Target,
  Calendar
} from 'lucide-react';

const BlockLibrary = () => {
  const blockCategories = [
    {
      name: "Life Domains",
      blocks: [
        { id: 'career', icon: Briefcase, label: 'Career', color: '#3b82f6' },
        { id: 'family', icon: Heart, label: 'Family', color: '#ef4444' },
        { id: 'education', icon: GraduationCap, label: 'Learning', color: '#10b981' },
        { id: 'finance', icon: DollarSign, label: 'Finance', color: '#f59e0b' },
        { id: 'health', icon: Zap, label: 'Health', color: '#8b5cf6' },
        { id: 'entertainment', icon: Gamepad2, label: 'Fun', color: '#ec4899' },
      ]
    },
    {
      name: "Milestones",
      blocks: [
        { id: 'goal', icon: Target, label: 'Goal', color: '#059669' },
        { id: 'event', icon: Calendar, label: 'Event', color: '#dc2626' },
        { id: 'community', icon: Users, label: 'Community', color: '#7c3aed' },
        { id: 'home', icon: Home, label: 'Living', color: '#0891b2' },
      ]
    }
  ];

  const handleDragStart = (e, block) => {
    e.dataTransfer.setData('application/json', JSON.stringify(block));
  };

  return (
    <div className="h-full bg-white rounded-lg shadow-lg overflow-y-auto">
      <div className="p-4">
        <h3 className="font-semibold mb-4 text-gray-800">Block Library</h3>
        
        {blockCategories.map((category) => (
          <div key={category.name} className="mb-6">
            <h4 className="text-sm font-medium text-gray-600 mb-3">{category.name}</h4>
            <div className="space-y-2">
              {category.blocks.map((block) => {
                const IconComponent = block.icon;
                return (
                  <div
                    key={block.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, block)}
                    className="flex items-center p-2 rounded-lg border cursor-move hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${block.color}20` }}
                    >
                      <IconComponent 
                        className="w-4 h-4" 
                        style={{ color: block.color }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {block.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <p className="text-xs text-purple-700">
            💡 <strong>Tip:</strong> Drag blocks onto the canvas to start building your life path!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlockLibrary;
