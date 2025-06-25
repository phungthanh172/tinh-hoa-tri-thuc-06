
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
        { id: 'career', icon: '💼', label: 'Career', color: '#3b82f6' },
        { id: 'family', icon: '❤️', label: 'Family', color: '#ef4444' },
        { id: 'education', icon: '🎓', label: 'Learning', color: '#10b981' },
        { id: 'finance', icon: '💰', label: 'Finance', color: '#f59e0b' },
        { id: 'health', icon: '⚡', label: 'Health', color: '#8b5cf6' },
        { id: 'entertainment', icon: '🎮', label: 'Fun', color: '#ec4899' },
      ]
    },
    {
      name: "Milestones",
      blocks: [
        { id: 'goal', icon: '🎯', label: 'Goal', color: '#059669' },
        { id: 'event', icon: '📅', label: 'Event', color: '#dc2626' },
        { id: 'community', icon: '👥', label: 'Community', color: '#7c3aed' },
        { id: 'home', icon: '🏠', label: 'Living', color: '#0891b2' },
      ]
    }
  ];

  const handleDragStart = (e: React.DragEvent, block: any) => {
    e.dataTransfer.setData('application/reactflow', block.id);
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
              {category.blocks.map((block) => (
                <div
                  key={block.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, block)}
                  className="flex items-center p-2 rounded-lg border cursor-move hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-lg"
                    style={{ backgroundColor: `${block.color}20` }}
                  >
                    {block.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {block.label}
                  </span>
                </div>
              ))}
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
