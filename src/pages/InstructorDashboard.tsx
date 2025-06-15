import React, { useState } from 'react';
import { Plus, BookOpen, Users, DollarSign, BarChart3, Settings, Video, FileText, HelpCircle, User, MessageSquare, Megaphone, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import InstructorProfile from '@/components/instructor/InstructorProfile';
import StudentInteraction from '@/components/instructor/StudentInteraction';
import EarningsTracker from '@/components/instructor/EarningsTracker';
import PromotionalTools from '@/components/instructor/PromotionalTools';

const InstructorDashboard = () => {
  const [courses] = useState([
    {
      id: 1,
      title: "The Complete JavaScript Course 2024",
      status: "Published",
      students: 756,
      revenue: 15240.50,
      rating: 4.7,
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "React for Beginners",
      status: "Draft",
      students: 0,
      revenue: 0,
      rating: 0,
      lastUpdated: "2024-01-10"
    }
  ]);

  const stats = {
    totalStudents: 756,
    totalRevenue: 15240.50,
    totalCourses: 2,
    avgRating: 4.7
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your courses and track your success</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/blog/write">
              <Button variant="outline" size="lg">
                <PenTool className="w-5 h-5 mr-2" />
                Write Blog Post
              </Button>
            </Link>
            <Link to="/instructor/course/create">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-5 h-5 mr-2" />
                Create New Course
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold">{stats.totalCourses}</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold">{stats.avgRating}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="promotion">Promotion</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                            {course.status}
                          </Badge>
                          <span>{course.students} students</span>
                          <span>${course.revenue.toLocaleString()} revenue</span>
                          {course.rating > 0 && <span>⭐ {course.rating}</span>}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/instructor/course/${course.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Link to={`/course/${course.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <InstructorProfile />
          </TabsContent>

          <TabsContent value="students">
            <StudentInteraction />
          </TabsContent>

          <TabsContent value="earnings">
            <EarningsTracker />
          </TabsContent>

          <TabsContent value="promotion">
            <PromotionalTools />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Course Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default InstructorDashboard;
