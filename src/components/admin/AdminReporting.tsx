
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { coursesApi, Course } from '@/services/coursesApi';
import DailySummaryDialog from './reporting/DailySummaryDialog';
import CoursePerformanceDialog from './reporting/CoursePerformanceDialog';
import ReportControls from './reporting/ReportControls';
import RevenueAnalyticsCard from './reporting/cards/RevenueAnalyticsCard';
import CourseCategoriesCard from './reporting/cards/CourseCategoriesCard';
import UserGrowthCard from './reporting/cards/UserGrowthCard';
import TopInstructorsCard from './reporting/cards/TopInstructorsCard';
import GeographicDistributionCard from './reporting/cards/GeographicDistributionCard';
import TrafficSourcesCard from './reporting/cards/TrafficSourcesCard';
import KeyMetricsCard from './reporting/cards/KeyMetricsCard';
import QuickActions from './reporting/QuickActions';
import { exportToCsv } from '@/lib/export';

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

  // Enhanced mock data
  const keyMetrics = {
    totalUsers: 45678,
    activeUsers: 12450,
    newRegistrations: 1234,
    totalCourses: 567,
    totalEnrollments: 89012,
    totalRevenue: 2456789.50,
    averageRating: 4.6,
    courseCompletionRate: 78.5
  };

  const revenueData = [
    { month: 'Jan', revenue: 145000, enrollments: 2340 },
    { month: 'Feb', revenue: 162000, enrollments: 2580 },
    { month: 'Mar', revenue: 148000, enrollments: 2410 },
    { month: 'Apr', revenue: 181000, enrollments: 2890 },
    { month: 'May', revenue: 175000, enrollments: 2760 },
    { month: 'Jun', revenue: 197000, enrollments: 3120 }
  ];

  const categoryData = [
    { name: 'Development', value: 35, color: '#8884d8', courses: 198, revenue: 856000 },
    { name: 'Business', value: 25, color: '#82ca9d', courses: 142, revenue: 612000 },
    { name: 'Design', value: 20, color: '#ffc658', courses: 113, revenue: 489000 },
    { name: 'Marketing', value: 12, color: '#ff7300', courses: 68, revenue: 294000 },
    { name: 'Other', value: 8, color: '#0088fe', courses: 46, revenue: 205000 }
  ];

  const userGrowthData = [
    { month: 'Jan', students: 38500, instructors: 1245, activeUsers: 28600 },
    { month: 'Feb', students: 41200, instructors: 1367, activeUsers: 31200 },
    { month: 'Mar', students: 39900, instructors: 1451, activeUsers: 29800 },
    { month: 'Apr', students: 44100, instructors: 1589, activeUsers: 33100 },
    { month: 'May', students: 42800, instructors: 1676, activeUsers: 32400 },
    { month: 'Jun', students: 47200, instructors: 1812, activeUsers: 35600 }
  ];

  const topInstructors = [
    { name: 'John Smith', revenue: 124500, students: 7560, courses: 8, rating: 4.8 },
    { name: 'Sarah Johnson', revenue: 98000, students: 5230, courses: 6, rating: 4.7 },
    { name: 'Mike Wilson', revenue: 87500, students: 4120, courses: 12, rating: 4.9 },
    { name: 'Emily Davis', revenue: 72000, students: 2890, courses: 5, rating: 4.6 },
    { name: 'Chris Brown', revenue: 69000, students: 2340, courses: 7, rating: 4.5 }
  ];

  const geographicData = [
    { country: 'United States', users: 18500, revenue: 985000, percentage: 40.5 },
    { country: 'United Kingdom', users: 8200, revenue: 423000, percentage: 18.0 },
    { country: 'Canada', users: 5500, revenue: 287000, percentage: 12.0 },
    { country: 'Australia', users: 3600, revenue: 195000, percentage: 7.9 },
    { country: 'Germany', users: 2800, revenue: 156000, percentage: 6.1 },
    { country: 'Others', users: 7078, revenue: 410789, percentage: 15.5 }
  ];

  const trafficSources = [
    { source: 'Organic Search', visitors: 24500, conversions: 3420, conversionRate: 14.0 },
    { source: 'Direct', visitors: 18200, conversions: 2890, conversionRate: 15.9 },
    { source: 'Social Media', visitors: 12800, conversions: 1540, conversionRate: 12.0 },
    { source: 'Paid Ads', visitors: 8900, conversions: 1780, conversionRate: 20.0 },
    { source: 'Email', visitors: 5600, conversions: 980, conversionRate: 17.5 },
    { source: 'Referral', visitors: 4200, conversions: 420, conversionRate: 10.0 }
  ];

  const exportReport = (type: string) => {
    const date = format(new Date(), 'yyyy-MM-dd');
    let exported = false;
    let reportName = type;

    try {
      switch (type) {
        case 'financial':
        case 'revenue':
          exportToCsv(`revenue-report-${date}.csv`, revenueData);
          exported = true;
          reportName = 'Financial';
          break;
        case 'user-activity':
        case 'users':
          exportToCsv(`user-growth-report-${date}.csv`, userGrowthData);
          exported = true;
          reportName = 'User Activity';
          break;
        case 'course-categories':
          exportToCsv(`course-categories-report-${date}.csv`, categoryData.map(({ color, ...rest }) => rest));
          exported = true;
          reportName = 'Course Categories';
          break;
        case 'top-instructors':
          exportToCsv(`top-instructors-report-${date}.csv`, topInstructors);
          exported = true;
          reportName = 'Top Instructors';
          break;
        case 'geographic':
          exportToCsv(`geographic-report-${date}.csv`, geographicData);
          exported = true;
          reportName = 'Geographic Distribution';
          break;
        case 'traffic-sources':
          exportToCsv(`traffic-sources-report-${date}.csv`, trafficSources);
          exported = true;
          reportName = 'Traffic Sources';
          break;
        case 'comprehensive':
          exportToCsv(`revenue-report-${date}.csv`, revenueData);
          exportToCsv(`user-growth-report-${date}.csv`, userGrowthData);
          exportToCsv(`course-categories-report-${date}.csv`, categoryData.map(({ color, ...rest }) => rest));
          exportToCsv(`top-instructors-report-${date}.csv`, topInstructors);
          exportToCsv(`geographic-report-${date}.csv`, geographicData);
          exportToCsv(`traffic-sources-report-${date}.csv`, trafficSources);
          exported = true;
          reportName = 'Comprehensive';
          break;
        default:
          toast.error(`Export type "${type}" is not recognized.`);
      }

      if (exported) {
        toast.success(`${reportName} report exported`, {
          description: `Your file is downloading.`,
        });
      }
    } catch (error) {
      console.error("Failed to export report:", error);
      toast.error("An error occurred while exporting the report.");
    }
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
      
      <KeyMetricsCard metrics={keyMetrics} />
      
      <RevenueAnalyticsCard data={revenueData} onExport={exportReport} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CourseCategoriesCard data={categoryData} onExport={exportReport} />
        <UserGrowthCard data={userGrowthData} onExport={exportReport} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeographicDistributionCard data={geographicData} onExport={exportReport} />
        <TrafficSourcesCard data={trafficSources} onExport={exportReport} />
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
