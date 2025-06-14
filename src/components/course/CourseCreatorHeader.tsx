
import React from 'react';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CourseCreatorHeaderProps {
  onSaveDraft: () => void;
  onPublish: () => void;
  isEditing?: boolean;
}

const CourseCreatorHeader = ({ onSaveDraft, onPublish, isEditing = false }: CourseCreatorHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <Link to="/instructor/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditing ? 'Edit Course' : 'Create New Course'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing 
              ? 'Update your course content and settings'
              : 'Build your course step by step with our guided wizard'
            }
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button variant="outline" onClick={onSaveDraft}>
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button onClick={onPublish} className="bg-purple-600 hover:bg-purple-700">
          {isEditing ? 'Update Course' : 'Publish Course'}
        </Button>
      </div>
    </div>
  );
};

export default CourseCreatorHeader;
