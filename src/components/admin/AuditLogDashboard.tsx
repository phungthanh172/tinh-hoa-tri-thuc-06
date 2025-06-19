
import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Shield, User, BookOpen, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exportToCsv } from '@/lib/export';
import { toast } from 'sonner';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  userRole: 'admin' | 'instructor' | 'student';
  action: string;
  category: 'user' | 'course' | 'financial' | 'system' | 'security';
  target: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  details?: string;
}

const AuditLogDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  const auditLogs: AuditLogEntry[] = [
    {
      id: '1',
      timestamp: '2024-01-20 14:30:25',
      user: 'admin@example.com',
      userRole: 'admin',
      action: 'User Account Suspended',
      category: 'user',
      target: 'john.doe@email.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      success: true,
      details: 'Suspended for policy violation'
    },
    {
      id: '2',
      timestamp: '2024-01-20 14:25:10',
      user: 'instructor@example.com',
      userRole: 'instructor',
      action: 'Course Published',
      category: 'course',
      target: 'Advanced React Development Course',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (macOS Intel Mac OS X 10_15_7)',
      success: true
    },
    {
      id: '3',
      timestamp: '2024-01-20 14:20:45',
      user: 'admin@example.com',
      userRole: 'admin',
      action: 'Payout Processed',
      category: 'financial',
      target: '$2,450.00 to 5 instructors',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      success: true
    },
    {
      id: '4',
      timestamp: '2024-01-20 14:15:30',
      user: 'system',
      userRole: 'admin',
      action: 'Failed Login Attempt',
      category: 'security',
      target: 'admin@example.com',
      ipAddress: '203.0.113.15',
      userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G975F)',
      success: false,
      details: 'Multiple failed attempts detected'
    },
    {
      id: '5',
      timestamp: '2024-01-20 14:10:15',
      user: 'instructor@example.com',
      userRole: 'instructor',
      action: 'Student Grade Updated',
      category: 'course',
      target: 'Quiz: JavaScript Fundamentals',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (macOS Intel Mac OS X 10_15_7)',
      success: true
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    const matchesRole = filterRole === 'all' || log.userRole === filterRole;
    
    return matchesSearch && matchesCategory && matchesRole;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user': return User;
      case 'course': return BookOpen;
      case 'financial': return DollarSign;
      case 'security': return Shield;
      default: return Eye;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'user': return 'text-blue-600 bg-blue-50';
      case 'course': return 'text-green-600 bg-green-50';
      case 'financial': return 'text-purple-600 bg-purple-50';
      case 'security': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const exportAuditLogs = () => {
    const date = new Date().toISOString().split('T')[0];
    const exportData = filteredLogs.map(log => ({
      timestamp: log.timestamp,
      user: log.user,
      role: log.userRole,
      action: log.action,
      category: log.category,
      target: log.target,
      success: log.success,
      ipAddress: log.ipAddress
    }));
    
    try {
      exportToCsv(`audit-logs-${date}.csv`, exportData);
      toast.success('Audit logs exported successfully');
    } catch (error) {
      toast.error('Failed to export audit logs');
    }
  };

  const securityMetrics = {
    totalEvents: auditLogs.length,
    failedLogins: auditLogs.filter(log => log.category === 'security' && !log.success).length,
    adminActions: auditLogs.filter(log => log.userRole === 'admin').length,
    suspiciousActivity: auditLogs.filter(log => log.details?.includes('suspicious')).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Audit Log Dashboard</h2>
        <Button onClick={exportAuditLogs}>
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold">{securityMetrics.totalEvents}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Logins</p>
                <p className="text-2xl font-bold text-red-600">{securityMetrics.failedLogins}</p>
              </div>
              <Shield className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admin Actions</p>
                <p className="text-2xl font-bold">{securityMetrics.adminActions}</p>
              </div>
              <User className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suspicious Activity</p>
                <p className="text-2xl font-bold text-orange-600">{securityMetrics.suspiciousActivity}</p>
              </div>
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log Entries ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => {
              const CategoryIcon = getCategoryIcon(log.category);
              return (
                <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${getCategoryColor(log.category)}`}>
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{log.action}</h4>
                          <Badge variant={log.success ? "default" : "destructive"}>
                            {log.success ? "Success" : "Failed"}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {log.userRole}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{log.user}</span> → {log.target}
                        </p>
                        {log.details && (
                          <p className="text-sm text-gray-500 mt-1">{log.details}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                          <span>{log.timestamp}</span>
                          <span>{log.ipAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogDashboard;
