
import React, { useState } from 'react';
import { Users, BookOpen, DollarSign, Settings, BarChart3, Shield, FileText, AlertTriangle } from 'lucide-react';
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

const AdminDashboard = () => {
  const [adminStats] = useState({
    totalUsers: 12450,
    activeInstructors: 325,
    pendingCourses: 18,
    totalRevenue: 245680.50,
    monthlyGrowth: 12.5,
    supportTickets: 7
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

        {/* Admin Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
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
                  <p className="text-sm font-medium text-gray-600">Active Instructors</p>
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
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="courses">Course Moderation</TabsTrigger>
            <TabsTrigger value="financial">Financial Oversight</TabsTrigger>
            <TabsTrigger value="platform">Platform Config</TabsTrigger>
            <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="courses">
            <CourseModeration />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialOversight />
          </TabsContent>

          <TabsContent value="platform">
            <PlatformConfiguration />
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
