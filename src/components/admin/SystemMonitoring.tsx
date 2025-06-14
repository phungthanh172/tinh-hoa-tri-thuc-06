
import React, { useState } from 'react';
import { Activity, Server, Database, Shield, RefreshCw, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const SystemMonitoring = () => {
  const [systemMetrics] = useState({
    serverHealth: 'Healthy',
    uptime: '99.9%',
    responseTime: '180ms',
    activeUsers: 1890,
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 78,
    networkThroughput: '2.4 GB/h'
  });

  const [performanceData] = useState([
    { time: '00:00', cpu: 40, memory: 55, users: 1200 },
    { time: '04:00', cpu: 35, memory: 52, users: 800 },
    { time: '08:00', cpu: 50, memory: 65, users: 1500 },
    { time: '12:00', cpu: 60, memory: 70, users: 1800 },
    { time: '16:00', cpu: 55, memory: 68, users: 1900 },
    { time: '20:00', cpu: 45, memory: 60, users: 1600 }
  ]);

  const [auditLogs] = useState([
    {
      id: 1,
      admin: 'Admin User',
      action: 'User Suspended',
      target: 'john.doe@email.com',
      timestamp: '2024-01-20 14:30:00',
      status: 'Success'
    },
    {
      id: 2,
      admin: 'System',
      action: 'Course Auto-approved',
      target: 'Advanced React Course',
      timestamp: '2024-01-20 14:15:00',
      status: 'Success'
    },
    {
      id: 3,
      admin: 'Admin User',
      action: 'Financial Report Generated',
      target: 'Monthly Report',
      timestamp: '2024-01-20 13:45:00',
      status: 'Success'
    }
  ]);

  const [securityAlerts] = useState([
    {
      id: 1,
      type: 'Failed Login Attempts',
      severity: 'Medium',
      count: 15,
      lastOccurred: '2024-01-20 14:25:00'
    },
    {
      id: 2,
      type: 'Suspicious Payment Activity',
      severity: 'High',
      count: 2,
      lastOccurred: '2024-01-20 13:10:00'
    }
  ]);

  const handleSystemAction = (action: string) => {
    console.log(`Performing system action: ${action}`);
  };

  const getHealthBadge = (status: string) => {
    switch (status) {
      case 'Healthy':
        return <Badge variant="default" className="bg-green-500">Healthy</Badge>;
      case 'Warning':
        return <Badge variant="secondary" className="bg-yellow-500">Warning</Badge>;
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-lg font-bold">{systemMetrics.serverHealth}</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            {getHealthBadge(systemMetrics.serverHealth)}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-lg font-bold">{systemMetrics.uptime}</p>
              </div>
              <Server className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-lg font-bold">{systemMetrics.responseTime}</p>
              </div>
              <RefreshCw className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-lg font-bold">{systemMetrics.activeUsers}</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Resource Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className="text-sm text-gray-500">{systemMetrics.cpuUsage}%</span>
              </div>
              <Progress value={systemMetrics.cpuUsage} />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm text-gray-500">{systemMetrics.memoryUsage}%</span>
              </div>
              <Progress value={systemMetrics.memoryUsage} />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Disk Usage</span>
                <span className="text-sm text-gray-500">{systemMetrics.diskUsage}%</span>
              </div>
              <Progress value={systemMetrics.diskUsage} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" name="CPU %" />
                  <Area type="monotone" dataKey="memory" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Memory %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Alerts
              </span>
              <Button variant="outline" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{alert.type}</div>
                    <div className="text-sm text-gray-500">{alert.count} occurrences</div>
                  </div>
                  <div className="text-right">
                    {getSeverityBadge(alert.severity)}
                    <div className="text-xs text-gray-500 mt-1">{alert.lastOccurred}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Admin</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.admin}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="text-sm">{log.target}</TableCell>
                      <TableCell className="text-xs">{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Actions */}
      <Card>
        <CardHeader>
          <CardTitle>System Maintenance & Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={() => handleSystemAction('backup')}
            >
              <Download className="w-4 h-4 mr-2" />
              Create Backup
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleSystemAction('cache-clear')}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Cache
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleSystemAction('security-scan')}
            >
              <Shield className="w-4 h-4 mr-2" />
              Security Scan
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleSystemAction('health-check')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Health Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoring;
