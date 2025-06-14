
import React from 'react';
import { Flag, CheckCircle } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CourseModerationHeader = () => {
  return (
    <CardTitle className="flex items-center justify-between">
      <span>Course Moderation</span>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          <Flag className="w-4 h-4 mr-2" />
          View Reports
        </Button>
        <Button variant="outline" size="sm">
          <CheckCircle className="w-4 h-4 mr-2" />
          Bulk Approve
        </Button>
      </div>
    </CardTitle>
  );
};

export default CourseModerationHeader;
