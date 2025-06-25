
import React, { useState } from 'react';
import { Users, BookOpen, DollarSign, Settings, BarChart3, Shield, FileText, AlertTriangle, Activity, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminOverview from '@/components/admin/AdminOverview';
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
import ABTestingAnalytics from '@/components/admin/ABTestingAnalytics';
import ScheduledReports from '@/components/admin/ScheduledReports';
import ThirdPartyIntegrations from '@/components/admin/ThirdPartyIntegrations';
import ChatManagement from '@/components/admin/ChatManagement';

const AdminDashboard = () => {
  const [adminStats] = useState({
    totalUsers: 12450,
    activeUsers: 1890,
    activeInstructors: 325,
    pendingCourses: 18,
    totalRevenue: 245680.50,
    monthlyGrowth: 12.5,
    supportTickets: 7,
    systemHealth: 'Healthy',
    reportedContent: 3
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

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-12">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview stats={adminStats} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="courses">
            <CourseModeration />
          </TabsContent>

          <TabsContent value="chat">
            <ChatManagement />
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

          <TabsContent value="reports">
            <Tabs defaultValue="analytics" className="space-y-6">
              <TabsList>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="ab-testing">A/B Testing</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analytics">
                <AdminReporting />
              </TabsContent>
              
              <TabsContent value="ab-testing">
                <ABTestingAnalytics />
              </TabsContent>
              
              <TabsContent value="scheduled">
                <ScheduledReports />
              </TabsContent>
              
              <TabsContent value="integrations">
                <ThirdPartyIntegrations />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
