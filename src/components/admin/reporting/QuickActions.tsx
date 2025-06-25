
import React from 'react';
import { Calendar, DollarSign, Users, BookOpen, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
  
  const handleExport = async (type: string) => {
    console.log(`Exporting ${type} report`);
    toast.loading(`Generating ${type} report...`, { id: type });
    
    // Simulate report generation
    setTimeout(() => {
      // Simulate file download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${type}_report_${new Date().toISOString().split('T')[0]}.csv`;
      
      toast.success(`${type} report generated and downloaded`, { id: type });
      onExport(type);
    }, 2000);
  };

  const handleDailySummary = () => {
    console.log('Showing daily summary');
    toast.success('Daily summary displayed');
    onShowDailySummary();
  };

  const handleCoursePerformance = () => {
    if (isLoadingCourses) {
      toast.error('Please wait for courses to load');
      return;
    }
    console.log('Showing course performance');
    toast.success('Course performance analysis displayed');
    onShowCoursePerformance();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Quick Report Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            onClick={handleDailySummary}
            className="flex flex-col h-16 space-y-1"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-xs">Daily Summary</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExport('financial')}
            className="flex flex-col h-16 space-y-1"
          >
            <DollarSign className="w-4 h-4" />
            <span className="text-xs">Financial Report</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExport('user-activity')}
            className="flex flex-col h-16 space-y-1"
          >
            <Users className="w-4 h-4" />
            <span className="text-xs">User Activity</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCoursePerformance} 
            disabled={isLoadingCourses}
            className="flex flex-col h-16 space-y-1"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-xs">
              {isLoadingCourses ? 'Loading...' : 'Course Performance'}
            </span>
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Click any action to generate reports or view analytics dashboards
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
