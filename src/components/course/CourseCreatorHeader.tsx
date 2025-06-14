
import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CourseCreatorHeaderProps {
  onSaveDraft: () => void;
  onPublish: () => void;
}

const CourseCreatorHeader = ({ onSaveDraft, onPublish }: CourseCreatorHeaderProps) => {
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
          <h1 className="text-3xl font-bold">Create New Course</h1>
          <p className="text-gray-600 mt-1">Build your course step by step</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onSaveDraft}>
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button onClick={onPublish} className="bg-purple-600 hover:bg-purple-700">
          Publish Course
        </Button>
      </div>
    </div>
  );
};

export default CourseCreatorHeader;
