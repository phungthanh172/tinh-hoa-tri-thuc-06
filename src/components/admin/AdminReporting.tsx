
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { coursesApi, Course } from '@/services/coursesApi';
import DailySummaryDialog from './reporting/DailySummaryDialog';
import CoursePerformanceDialog from './reporting/CoursePerformanceDialog';
import ReportControls from './reporting/ReportControls';
import RevenueAnalyticsCard from './reporting/cards/RevenueAnalyticsCard';
import CourseCategoriesCard from './reporting/cards/CourseCategoriesCard';
import UserGrowthCard from './reporting/cards/UserGrowthCard';
import TopInstructorsCard from './reporting/cards/TopInstructorsCard';
import QuickActions from './reporting/QuickActions';

const AdminReporting = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [isSummaryOpen, setSummaryOpen] = useState(false);
  const [isPerfOpen, setPerfOpen] = useState(false);
  
  // Mock data for the daily summary. In a real app, this would be fetched from an API.
  const [dailySummaryData] = useState({
    date: format(new Date(), 'MMMM d, yyyy'),
    newUsers: 42,
    dailyRevenue: 1250.75,
    newCourses: 3,
    newSupportTickets: 5,
  });

  const { data: courses = [], isLoading: isLoadingCourses } = useQuery<Course[]>({
    queryKey: ['allCoursesReport'],
    queryFn: () => coursesApi.fetchCourses({}),
  });

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 }
  ];

  const categoryData = [
    { name: 'Development', value: 35, color: '#8884d8' },
    { name: 'Business', value: 25, color: '#82ca9d' },
    { name: 'Design', value: 20, color: '#ffc658' },
    { name: 'Marketing', value: 12, color: '#ff7300' },
    { name: 'Other', value: 8, color: '#0088fe' }
  ];

  const userGrowthData = [
    { month: 'Jan', students: 8500, instructors: 245 },
    { month: 'Feb', students: 9200, instructors: 267 },
    { month: 'Mar', students: 8900, instructors: 251 },
    { month: 'Apr', students: 10100, instructors: 289 },
    { month: 'May', students: 9800, instructors: 276 },
    { month: 'Jun', students: 11200, instructors: 312 }
  ];

  const topInstructors = [
    { name: 'John Smith', revenue: 12450, students: 756, courses: 3 },
    { name: 'Sarah Johnson', revenue: 9800, students: 523, courses: 2 },
    { name: 'Mike Wilson', revenue: 8750, students: 412, courses: 4 },
    { name: 'Emily Davis', revenue: 7200, students: 289, courses: 2 },
    { name: 'Chris Brown', revenue: 6900, students: 234, courses: 3 }
  ];

  const exportReport = (type: string) => {
    console.log(`Exporting ${type} report for ${timeRange}`);
  };
  
  const handleShowDailySummary = () => {
    setSummaryOpen(true);
  };

  const handleShowCoursePerformance = () => {
    setPerfOpen(true);
  };

  return (
    <div className="space-y-6">
      <ReportControls 
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onExport={exportReport}
      />
      
      <RevenueAnalyticsCard data={revenueData} onExport={exportReport} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CourseCategoriesCard data={categoryData} onExport={exportReport} />
        <UserGrowthCard data={userGrowthData} onExport={exportReport} />
      </div>

      <TopInstructorsCard instructors={topInstructors} onExport={exportReport} />
      
      <QuickActions 
        onShowDailySummary={handleShowDailySummary}
        onShowCoursePerformance={handleShowCoursePerformance}
        onExport={exportReport}
        isLoadingCourses={isLoadingCourses}
      />

      <DailySummaryDialog 
        isOpen={isSummaryOpen}
        onOpenChange={setSummaryOpen}
        summaryData={dailySummaryData}
      />

      <CoursePerformanceDialog
        isOpen={isPerfOpen}
        onOpenChange={setPerfOpen}
        courses={courses}
      />
    </div>
  );
};

export default AdminReporting;
