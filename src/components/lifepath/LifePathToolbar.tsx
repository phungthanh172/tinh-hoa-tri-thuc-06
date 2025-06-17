
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Move, 
  Link, 
  Save, 
  Share2, 
  Undo, 
  Redo,
  Download,
  Upload
} from 'lucide-react';

interface LifePathToolbarProps {
  onAddElement: (type: string) => void;
  connectionMode: boolean;
  onToggleConnectionMode: () => void;
  onSave: () => void;
  onShare: () => void;
}

const LifePathToolbar = ({ 
  onAddElement, 
  connectionMode, 
  onToggleConnectionMode,
  onSave,
  onShare 
}: LifePathToolbarProps) => {
  const lifeBlocks = [
    { type: 'career', label: 'Career', color: '#3b82f6', icon: '💼' },
    { type: 'family', label: 'Family', color: '#ef4444', icon: '👨‍👩‍👧‍👦' },
    { type: 'health', label: 'Health', color: '#10b981', icon: '🏃‍♂️' },
    { type: 'learning', label: 'Learning', color: '#f59e0b', icon: '📚' },
    { type: 'finance', label: 'Finance', color: '#8b5cf6', icon: '💰' },
    { type: 'entertainment', label: 'Entertainment', color: '#ec4899', icon: '🎯' },
    { type: 'travel', label: 'Travel', color: '#06b6d4', icon: '✈️' },
    { type: 'spiritual', label: 'Spiritual', color: '#84cc16', icon: '🧘‍♀️' }
  ];

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Life Domain Blocks */}
          <div className="flex flex-wrap gap-2">
            {lifeBlocks.map((block) => (
              <Button
                key={block.type}
                variant="outline"
                size="sm"
                onClick={() => onAddElement(block.type)}
                className="h-auto py-2 px-3 flex flex-col items-center gap-1"
              >
                <span className="text-lg">{block.icon}</span>
                <span className="text-xs">{block.label}</span>
              </Button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Tools */}
          <div className="flex gap-2">
            <Button
              variant={connectionMode ? "default" : "outline"}
              size="sm"
              onClick={onToggleConnectionMode}
              className="flex items-center gap-1"
            >
              <Link className="w-4 h-4" />
              Connect
            </Button>
            
            <Button variant="outline" size="sm">
              <Move className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Redo className="w-4 h-4" />
            </Button>
            
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>

            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>

            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LifePathToolbar;
