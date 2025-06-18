
import React from 'react';
import { Users, BookOpen, DollarSign, AlertTriangle, Activity, MessageSquare, TrendingUp, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AdminOverviewProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    activeInstructors: number;
    pendingCourses: number;
    totalRevenue: number;
    monthlyGrowth: number;
    supportTickets: number;
    reportedContent: number;
  };
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ stats }) => {
  const recentActivities = [
    { type: 'user', message: 'New instructor registered: Sarah Johnson', time: '2 hours ago' },
    { type: 'course', message: 'Course approved: Advanced React Development', time: '4 hours ago' },
    { type: 'financial', message: 'Payout processed: $2,450.00 to 5 instructors', time: '6 hours ago' },
    { type: 'support', message: '3 new support tickets received', time: '8 hours ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12% from last month</p>
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
                <p className="text-2xl font-bold">{stats.activeInstructors}</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+{stats.monthlyGrowth}% growth</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Actions</p>
                <p className="text-2xl font-bold">{stats.pendingCourses + stats.supportTickets}</p>
                <p className="text-xs text-orange-600">Requires attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Platform Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>System Performance</span>
                <span>98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Content Quality Score</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>User Satisfaction</span>
                <span>89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <p className="text-lg font-semibold text-green-600">Healthy</p>
                <p className="text-xs text-gray-500">System Status</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">{stats.activeUsers}</p>
                <p className="text-xs text-gray-500">Active Now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Review Courses</span>
              {stats.pendingCourses > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {stats.pendingCourses}
                </Badge>
              )}
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Support Tickets</span>
              {stats.supportTickets > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {stats.supportTickets}
                </Badge>
              )}
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Reported Content</span>
              {stats.reportedContent > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {stats.reportedContent}
                </Badge>
              )}
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Process Payouts</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
