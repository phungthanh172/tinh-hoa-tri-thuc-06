
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Share2, 
  Undo, 
  Redo,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Zap
} from 'lucide-react';

interface LifePathToolbarProps {
  onSave: () => void;
  onShare: () => void;
  onClear: () => void;
  onToggleLibrary: () => void;
  showLibrary: boolean;
}

const LifePathToolbar = ({ 
  onSave,
  onShare,
  onClear,
  onToggleLibrary,
  showLibrary
}: LifePathToolbarProps) => {
  return (
    <Card className="mb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* View Controls */}
            <div className="flex gap-2">
              <Button
                variant={showLibrary ? "default" : "outline"}
                size="sm"
                onClick={onToggleLibrary}
                className="flex items-center gap-1"
              >
                {showLibrary ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                Library
              </Button>
            </div>

            <Separator orientation="vertical" className="h-8" />

            {/* Action Controls */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Redo className="w-4 h-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-8" />

            {/* File Operations */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onSave}
                className="bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onShare}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300"
              >
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

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-300"
            >
              <Zap className="w-4 h-4 mr-1" />
              AI Assist
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClear}
              className="bg-red-50 hover:bg-red-100 text-red-700 border-red-300"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LifePathToolbar;
