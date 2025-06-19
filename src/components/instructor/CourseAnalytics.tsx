import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Users, DollarSign, PlayCircle, BookOpen, Download, Star, Globe, Eye } from 'lucide-react';
import { exportToCsv } from '@/lib/export';
import { toast } from 'sonner';

const CourseAnalytics = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');

  const enrollmentData = [
    { month: 'Jan', enrollments: 145, revenue: 4350, views: 2340, conversions: 6.2 },
    { month: 'Feb', enrollments: 162, revenue: 4860, views: 2580, conversions: 6.3 },
    { month: 'Mar', enrollments: 138, revenue: 4140, views: 2410, conversions: 5.7 },
    { month: 'Apr', enrollments: 201, revenue: 6030, views: 2890, conversions: 7.0 },
    { month: 'May', enrollments: 189, revenue: 5670, views: 2760, conversions: 6.8 },
    { month: 'Jun', enrollments: 223, revenue: 6690, views: 3120, conversions: 7.1 }
  ];

  const studentDemographics = [
    { name: 'Beginners', value: 45, color: '#8884d8' },
    { name: 'Intermediate', value: 35, color: '#82ca9d' },
    { name: 'Advanced', value: 20, color: '#ffc658' }
  ];

  const courseMetrics = [
    {
      course: 'JavaScript Fundamentals',
      enrollments: 1256,
      completionRate: 78,
      avgRating: 4.7,
      revenue: 37680,
      trend: 'up',
      views: 15600,
      conversionRate: 8.0
    },
    {
      course: 'React for Beginners',
      enrollments: 823,
      completionRate: 65,
      avgRating: 4.5,
      revenue: 24690,
      trend: 'up',
      views: 12400,
      conversionRate: 6.6
    },
    {
      course: 'Advanced Node.js',
      enrollments: 589,
      completionRate: 82,
      avgRating: 4.8,
      revenue: 17670,
      trend: 'down',
      views: 8900,
      conversionRate: 6.6
    }
  ];

  const engagementData = [
    { lecture: 'Introduction', avgWatchTime: '95%', completionRate: 92, quizScore: 85 },
    { lecture: 'Variables & Data Types', avgWatchTime: '87%', completionRate: 88, quizScore: 78 },
    { lecture: 'Functions', avgWatchTime: '82%', completionRate: 85, quizScore: 82 },
    { lecture: 'Arrays & Objects', avgWatchTime: '79%', completionRate: 81, quizScore: 79 },
    { lecture: 'DOM Manipulation', avgWatchTime: '76%', completionRate: 78, quizScore: 74 }
  ];

  const geographicData = [
    { country: 'United States', students: 485, percentage: 38.6 },
    { country: 'United Kingdom', students: 201, percentage: 16.0 },
    { country: 'Canada', students: 163, percentage: 13.0 },
    { country: 'Australia', students: 114, percentage: 9.1 },
    { country: 'Germany', students: 89, percentage: 7.1 },
    { country: 'Others', students: 204, percentage: 16.2 }
  ];

  const exportData = (type: string) => {
    const date = new Date().toISOString().split('T')[0];
    
    try {
      switch (type) {
        case 'enrollments':
          exportToCsv(`enrollments-${date}.csv`, enrollmentData);
          break;
        case 'demographics':
          exportToCsv(`demographics-${date}.csv`, studentDemographics);
          break;
        case 'performance':
          exportToCsv(`course-performance-${date}.csv`, courseMetrics);
          break;
        case 'engagement':
          exportToCsv(`engagement-${date}.csv`, engagementData);
          break;
        case 'geographic':
          exportToCsv(`geographic-${date}.csv`, geographicData);
          break;
        default:
          toast.error('Unknown export type');
          return;
      }
      
      toast.success(`${type} data exported successfully`);
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Analytics</h2>
        <div className="flex space-x-4">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="javascript">JavaScript Fundamentals</SelectItem>
              <SelectItem value="react">React for Beginners</SelectItem>
              <SelectItem value="nodejs">Advanced Node.js</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="traffic">Traffic & Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enrollments Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Monthly Enrollments
                  <Button variant="outline" size="sm" onClick={() => exportData('enrollments')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="enrollments" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Course Performance Metrics
                <Button variant="outline" size="sm" onClick={() => exportData('performance')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseMetrics.map((course, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{course.course}</h3>
                      {course.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Enrollments</p>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-blue-600" />
                          <span className="font-medium">{course.enrollments}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-gray-600">Completion</p>
                        <span className="font-medium">{course.completionRate}%</span>
                      </div>
                      
                      <div>
                        <p className="text-gray-600">Rating</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-600" />
                          <span className="font-medium">{course.avgRating}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                          <span className="font-medium">${course.revenue.toLocaleString()}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-600">Page Views</p>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1 text-purple-600" />
                          <span className="font-medium">{course.views.toLocaleString()}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-600">Conversion</p>
                        <span className="font-medium">{course.conversionRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Student Level Distribution
                  <Button variant="outline" size="sm" onClick={() => exportData('demographics')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={studentDemographics}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {studentDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Geographic Distribution
                  </span>
                  <Button variant="outline" size="sm" onClick={() => exportData('geographic')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {geographicData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{item.country}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{item.students}</Badge>
                        <Badge variant="secondary">{item.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Lecture-Level Engagement
                <Button variant="outline" size="sm" onClick={() => exportData('engagement')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementData.map((lecture, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">{lecture.lecture}</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Avg. Watch Time</p>
                        <p className="text-lg font-semibold">{lecture.avgWatchTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Completion Rate</p>
                        <p className="text-lg font-semibold">{lecture.completionRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Quiz Score</p>
                        <p className="text-lg font-semibold">{lecture.quizScore}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm">Total Views</span>
                    </div>
                    <span className="font-medium">24,680</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Unique Visitors</span>
                    <span className="font-medium">18,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Session Duration</span>
                    <span className="font-medium">4m 32s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="font-medium">6.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Preview to Enrollment</span>
                    <span className="font-medium">12.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cart Abandonment</span>
                    <span className="font-medium">23.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">Revenue per Visit</span>
                    </div>
                    <span className="font-medium">$1.34</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Order Value</span>
                    <span className="font-medium">$29.99</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lifetime Value</span>
                    <span className="font-medium">$127.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseAnalytics;
