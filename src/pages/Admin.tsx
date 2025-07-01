
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, TrendingUp, DollarSign, Settings, Shield } from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();

  // Redirect non-admin users (in a real app, you'd check user roles)
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const stats = [
    { title: 'Total Users', value: '10,234', icon: Users, color: 'text-blue-600' },
    { title: 'Active Courses', value: '567', icon: BookOpen, color: 'text-green-600' },
    { title: 'Monthly Growth', value: '+23%', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Revenue', value: '$45,678', icon: DollarSign, color: 'text-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Admin Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your platform efficiently</p>
            </div>
            <Badge className="bg-red-100 text-red-700">
              <Shield className="w-4 h-4 mr-1" />
              Admin Access
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Manage user accounts, permissions, and access levels.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Active Users</span>
                  <Badge>8,456</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>New Registrations (Today)</span>
                  <Badge className="bg-green-100 text-green-700">+47</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Pending Verifications</span>
                  <Badge className="bg-yellow-100 text-yellow-700">23</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Course Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Oversee course content, approvals, and instructor management.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Published Courses</span>
                  <Badge>567</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Pending Review</span>
                  <Badge className="bg-orange-100 text-orange-700">12</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Draft Courses</span>
                  <Badge className="bg-gray-100 text-gray-700">89</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Configure platform settings and system preferences.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Platform Version</span>
                  <Badge>v2.1.0</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Last Backup</span>
                  <Badge className="bg-green-100 text-green-700">2 hours ago</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>System Status</span>
                  <Badge className="bg-green-100 text-green-700">Healthy</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Frequently used administrative actions.
              </p>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded transition-colors">
                  View Recent Activity
                </button>
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded transition-colors">
                  Generate Reports
                </button>
                <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded transition-colors">
                  System Maintenance
                </button>
                <button className="w-full p-3 text-left bg-red-50 hover:bg-red-100 rounded transition-colors">
                  Security Audit
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
