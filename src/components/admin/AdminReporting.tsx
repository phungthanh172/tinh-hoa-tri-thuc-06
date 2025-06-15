import React, { useState } from 'react';
import { BarChart3, Download, Calendar, TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import DailySummaryDialog from './reporting/DailySummaryDialog';
import { useQuery } from '@tanstack/react-query';
import { coursesApi, Course } from '@/services/coursesApi';
import CoursePerformanceDialog from './reporting/CoursePerformanceDialog';

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
    { month: 'Jan', revenue: 45000, users: 1200, courses: 15 },
    { month: 'Feb', revenue: 52000, users: 1350, courses: 18 },
    { month: 'Mar', revenue: 48000, users: 1280, courses: 16 },
    { month: 'Apr', revenue: 61000, users: 1480, courses: 22 },
    { month: 'May', revenue: 55000, users: 1420, courses: 19 },
    { month: 'Jun', revenue: 67000, users: 1650, courses: 25 }
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
    // In a real app, you might fetch this data on-demand
    setSummaryOpen(true);
  };

  const handleShowCoursePerformance = () => {
    setPerfOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Analytics & Reporting
            </span>
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => exportReport('comprehensive')}>
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Revenue Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Revenue Analytics
            </span>
            <Button variant="outline" size="sm" onClick={() => exportReport('revenue')}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Course Categories
              </span>
              <Button variant="outline" size="sm" onClick={() => exportReport('categories')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                User Growth
              </span>
              <Button variant="outline" size="sm" onClick={() => exportReport('users')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="students" stroke="#8884d8" name="Students" />
                  <Line type="monotone" dataKey="instructors" stroke="#82ca9d" name="Instructors" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Instructors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Top Performing Instructors
            </span>
            <Button variant="outline" size="sm" onClick={() => exportReport('instructors')}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topInstructors.map((instructor, index) => (
              <div key={instructor.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{instructor.name}</h3>
                    <p className="text-sm text-gray-500">{instructor.courses} courses</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${instructor.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{instructor.students} students</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" onClick={handleShowDailySummary}>
              <Calendar className="w-4 h-4 mr-2" />
              Daily Summary
            </Button>
            <Button variant="outline" onClick={() => exportReport('financial')}>
              <DollarSign className="w-4 h-4 mr-2" />
              Financial Report
            </Button>
            <Button variant="outline" onClick={() => exportReport('user-activity')}>
              <Users className="w-4 h-4 mr-2" />
              User Activity
            </Button>
            <Button variant="outline" onClick={handleShowCoursePerformance} disabled={isLoadingCourses}>
              <BookOpen className="w-4 h-4 mr-2" />
              {isLoadingCourses ? 'Loading...' : 'Course Performance'}
            </Button>
          </div>
        </CardContent>
      </Card>

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
