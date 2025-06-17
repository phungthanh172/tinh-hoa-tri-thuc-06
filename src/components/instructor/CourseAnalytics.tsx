
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, DollarSign, PlayCircle, BookOpen } from 'lucide-react';

const CourseAnalytics = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');

  const enrollmentData = [
    { month: 'Jan', enrollments: 45, revenue: 1350 },
    { month: 'Feb', enrollments: 52, revenue: 1560 },
    { month: 'Mar', enrollments: 38, revenue: 1140 },
    { month: 'Apr', enrollments: 71, revenue: 2130 },
    { month: 'May', enrollments: 69, revenue: 2070 },
    { month: 'Jun', enrollments: 83, revenue: 2490 }
  ];

  const studentDemographics = [
    { name: 'Beginners', value: 45, color: '#8884d8' },
    { name: 'Intermediate', value: 35, color: '#82ca9d' },
    { name: 'Advanced', value: 20, color: '#ffc658' }
  ];

  const courseMetrics = [
    {
      course: 'JavaScript Fundamentals',
      enrollments: 756,
      completionRate: 78,
      avgRating: 4.7,
      revenue: 15240,
      trend: 'up'
    },
    {
      course: 'React for Beginners',
      enrollments: 423,
      completionRate: 65,
      avgRating: 4.5,
      revenue: 8460,
      trend: 'up'
    },
    {
      course: 'Advanced Node.js',
      enrollments: 289,
      completionRate: 82,
      avgRating: 4.8,
      revenue: 5780,
      trend: 'down'
    }
  ];

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
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enrollments Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Enrollments</CardTitle>
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
              <CardTitle>Course Performance Metrics</CardTitle>
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
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Enrollments</p>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-blue-600" />
                          <span className="font-medium">{course.enrollments}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-gray-600">Completion Rate</p>
                        <span className="font-medium">{course.completionRate}%</span>
                      </div>
                      
                      <div>
                        <p className="text-gray-600">Average Rating</p>
                        <span className="font-medium">⭐ {course.avgRating}</span>
                      </div>
                      
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                          <span className="font-medium">${course.revenue.toLocaleString()}</span>
                        </div>
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
                <CardTitle>Student Level Distribution</CardTitle>
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
                <CardTitle>Geographic Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>United States</span>
                    <Badge variant="outline">45%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>United Kingdom</span>
                    <Badge variant="outline">18%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Canada</span>
                    <Badge variant="outline">12%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Australia</span>
                    <Badge variant="outline">8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Others</span>
                    <Badge variant="outline">17%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <PlayCircle className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm">Avg. Watch Time</span>
                    </div>
                    <span className="font-medium">12m 34s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completion Rate</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Drop-off Rate</span>
                    <span className="font-medium">22%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Quiz Score</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completion Rate</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Retake Rate</span>
                    <span className="font-medium">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">Q&A Posts</span>
                    </div>
                    <span className="font-medium">147</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Downloads</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notes Created</span>
                    <span className="font-medium">892</span>
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
