
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Star,
  Play,
  Download,
  MessageSquare,
  Award
} from 'lucide-react';

interface CourseAnalyticsProps {
  courseId: string;
  courseName: string;
}

const CourseAnalytics = ({ courseId, courseName }: CourseAnalyticsProps) => {
  // Mock data - would come from API
  const enrollmentData = [
    { month: 'Jan', enrollments: 45, revenue: 3780 },
    { month: 'Feb', enrollments: 52, revenue: 4368 },
    { month: 'Mar', enrollments: 68, revenue: 5712 },
    { month: 'Apr', enrollments: 71, revenue: 5964 },
    { month: 'May', enrollments: 85, revenue: 7140 },
    { month: 'Jun', enrollments: 92, revenue: 7728 }
  ];

  const engagementData = [
    { name: 'Video Views', value: 1250, color: '#8884d8' },
    { name: 'Quiz Attempts', value: 892, color: '#82ca9d' },
    { name: 'Downloads', value: 534, color: '#ffc658' },
    { name: 'Discussions', value: 321, color: '#ff7300' }
  ];

  const completionRates = [
    { section: 'Introduction', completion: 95 },
    { section: 'Fundamentals', completion: 78 },
    { section: 'Advanced Topics', completion: 62 },
    { section: 'Projects', completion: 45 },
    { section: 'Final Assessment', completion: 38 }
  ];

  const stats = {
    totalEnrollments: 892,
    totalRevenue: 42156,
    averageRating: 4.7,
    completionRate: 68,
    activeStudents: 324,
    totalQuestions: 156,
    responseRate: 89
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{courseName} - Analytics</h2>
          <p className="text-gray-600">Course performance insights and metrics</p>
        </div>
        <Badge variant="outline" className="text-green-600">
          Live Course
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold">{stats.totalEnrollments}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold">{stats.averageRating}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600">Based on 234 reviews</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600">{stats.activeStudents} active students</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment & Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="enrollments" fill="#8884d8" name="Enrollments" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={3} name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Section Completion Rates */}
      <Card>
        <CardHeader>
          <CardTitle>Section Completion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={completionRates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="section" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completion" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Student Feedback Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Questions Asked</p>
                <p className="text-2xl font-bold">{stats.totalQuestions}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {stats.responseRate}% response rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Video Engagement</p>
                <p className="text-2xl font-bold">76%</p>
              </div>
              <Play className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Average watch time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resource Downloads</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <Download className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Total downloads
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseAnalytics;
