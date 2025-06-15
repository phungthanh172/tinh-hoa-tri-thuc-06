
import React from 'react';
import { Calendar, DollarSign, Users, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onShowDailySummary: () => void;
  onShowCoursePerformance: () => void;
  onExport: (type: string) => void;
  isLoadingCourses: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onShowDailySummary,
  onShowCoursePerformance,
  onExport,
  isLoadingCourses,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Report Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" onClick={onShowDailySummary}>
            <Calendar className="w-4 h-4 mr-2" />
            Daily Summary
          </Button>
          <Button variant="outline" onClick={() => onExport('financial')}>
            <DollarSign className="w-4 h-4 mr-2" />
            Financial Report
          </Button>
          <Button variant="outline" onClick={() => onExport('user-activity')}>
            <Users className="w-4 h-4 mr-2" />
            User Activity
          </Button>
          <Button variant="outline" onClick={onShowCoursePerformance} disabled={isLoadingCourses}>
            <BookOpen className="w-4 h-4 mr-2" />
            {isLoadingCourses ? 'Loading...' : 'Course Performance'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
