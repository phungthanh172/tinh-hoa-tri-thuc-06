import React, { useState } from 'react';
import { Users, BookOpen, DollarSign, Settings, BarChart3, Shield, FileText, AlertTriangle, Activity, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserManagement from '@/components/admin/UserManagement';
import CourseModeration from '@/components/admin/CourseModeration';
import FinancialOversight from '@/components/admin/FinancialOversight';
import PlatformConfiguration from '@/components/admin/PlatformConfiguration';
import AdminReporting from '@/components/admin/AdminReporting';
import ContentModeration from '@/components/admin/ContentModeration';
import SupportManagement from '@/components/admin/SupportManagement';
import SystemMonitoring from '@/components/admin/SystemMonitoring';
import AdminBlogManagement from '@/components/admin/BlogManagement';
import FeatureManagement from '@/components/admin/FeatureManagement';
import ManagerFeatureNews from '@/components/admin/ManagerFeatureNews';

const AdminDashboard = () => {
  const [adminStats] = useState({
    totalUsers: 12450,
    activeInstructors: 325,
    pendingCourses: 18,
    totalRevenue: 245680.50,
    monthlyGrowth: 12.5,
    supportTickets: 7,
    systemHealth: 'Healthy',
    reportedContent: 3,
    activeUsers: 1890
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Comprehensive platform management and oversight</p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-red-600" />
            <span className="text-sm font-medium text-red-600">Admin Access</span>
          </div>
        </div>

        {/* Enhanced Admin Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">{adminStats.activeUsers}</p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Instructors</p>
                  <p className="text-2xl font-bold">{adminStats.activeInstructors}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Courses</p>
                  <p className="text-2xl font-bold">{adminStats.pendingCourses}</p>
                </div>
                <BookOpen className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                  <p className="text-2xl font-bold">+{adminStats.monthlyGrowth}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                  <p className="text-2xl font-bold">{adminStats.supportTickets}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reported Content</p>
                  <p className="text-2xl font-bold">{adminStats.reportedContent}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-11">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="courses">
            <CourseModeration />
          </TabsContent>

          <TabsContent value="content">
            <ContentModeration />
          </TabsContent>

          <TabsContent value="blog">
            <AdminBlogManagement />
          </TabsContent>

          <TabsContent value="news">
            <ManagerFeatureNews />
          </TabsContent>

          <TabsContent value="features">
            <FeatureManagement />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialOversight />
          </TabsContent>

          <TabsContent value="platform">
            <PlatformConfiguration />
          </TabsContent>

          <TabsContent value="support">
            <SupportManagement />
          </TabsContent>

          <TabsContent value="system">
            <SystemMonitoring />
          </TabsContent>

          <TabsContent value="reports">
            <AdminReporting />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
