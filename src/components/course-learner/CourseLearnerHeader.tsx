
import React from 'react';
import { ArrowLeft, Share, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface CourseLearnerHeaderProps {
  course: {
    title: string;
    completionPercentage: number;
  };
  onToggleSidebar: () => void;
}

const CourseLearnerHeader: React.FC<CourseLearnerHeaderProps> = ({ course, onToggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 max-w-md">
            <h1 className="text-lg font-medium text-gray-900 truncate">{course.title}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">{course.completionPercentage}% complete</span>
            <div className="w-24">
              <Progress value={course.completionPercentage} className="h-2" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
              <Star className="w-4 h-4 mr-1" />
              Leave a rating
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CourseLearnerHeader;
