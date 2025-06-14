
import React from 'react';
import { ArrowLeft, Share, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface CoursePlayerHeaderProps {
  course: {
    title: string;
    completionPercentage: number;
  };
  onToggleSidebar: () => void;
}

const CoursePlayerHeader: React.FC<CoursePlayerHeaderProps> = ({ course, onToggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 max-w-md">
            <h1 className="text-lg font-medium text-white truncate">{course.title}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-300">{course.completionPercentage}% complete</span>
            <div className="w-24">
              <Progress value={course.completionPercentage} className="h-2" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
              <Star className="w-4 h-4 mr-1" />
              Leave a rating
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CoursePlayerHeader;
