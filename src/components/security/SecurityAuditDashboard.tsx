
import React, { useState } from 'react';
import { Shield, Activity, AlertTriangle, TrendingUp, Users, Lock, Eye, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

interface SecurityEvent {
  id: string;
  timestamp: Date;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  userId?: string;
  contentId?: string;
  ipAddress: string;
  resolved: boolean;
}

const SecurityAuditDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Mock data for demonstration
  const securityMetrics: SecurityMetric[] = [
    {
      id: 'failed_auth',
      name: 'Failed Authentication Attempts',
      value: 23,
      trend: 'down',
      severity: 'medium',
      description: 'Decrease of 15% from last week'
    },
    {
      id: 'content_access',
      name: 'Unauthorized Content Access Attempts',
      value: 5,
      trend: 'stable',
      severity: 'low',
      description: 'All attempts blocked successfully'
    },
    {
      id: 'drm_violations',
      name: 'DRM Protection Violations',
      value: 2,
      trend: 'down',
      severity: 'high',
      description: 'Users attempting to circumvent protection'
    },
    {
      id: 'suspicious_downloads',
      name: 'Suspicious Download Patterns',
      value: 8,
      trend: 'up',
      severity: 'medium',
      description: 'Rate limiting applied automatically'
    }
  ];

  const securityEvents: SecurityEvent[] = [
    {
      id: 'event_001',
      timestamp: new Date('2024-01-20T10:30:00'),
      type: 'Failed Authentication',
      severity: 'medium',
      description: 'Multiple failed login attempts from same IP',
      userId: 'user_123',
      ipAddress: '192.168.1.100',
      resolved: true
    },
    {
      id: 'event_002',
      timestamp: new Date('2024-01-20T09:15:00'),
      type: 'DRM Violation Attempt',
      severity: 'high',
      description: 'User attempted to download protected video content',
      userId: 'user_456',
      contentId: 'video_789',
      ipAddress: '10.0.0.50',
      resolved: false
    },
    {
      id: 'event_003',
      timestamp: new Date('2024-01-19T16:45:00'),
      type: 'Suspicious Activity',
      severity: 'low',
      description: 'Rapid sequential access to multiple courses',
      userId: 'user_789',
      ipAddress: '172.16.0.10',
      resolved: true
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-green-600 rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const complianceScore = 94; // Mock compliance score

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Security Audit Dashboard</span>
            <Badge className="bg-blue-100 text-blue-800">Real-time Monitoring</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">Security Events</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {securityMetrics.map((metric) => (
                  <Card key={metric.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">{metric.name}</h4>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{metric.value}</span>
                        <Badge className={getSeverityColor(metric.severity)}>
                          {metric.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{metric.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  System security status: <strong>SECURE</strong> • Last audit: 2 hours ago • Next scheduled audit: Tomorrow at 2:00 AM
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Security Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Security Score</span>
                      <span className="text-2xl font-bold text-green-600">{complianceScore}%</span>
                    </div>
                    <Progress value={complianceScore} className="h-3" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-green-600">Strengths:</p>
                        <ul className="text-gray-600 mt-1">
                          <li>• Strong encryption in place</li>
                          <li>• DRM protection active</li>
                          <li>• Regular security updates</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-orange-600">Areas for Improvement:</p>
                        <ul className="text-gray-600 mt-1">
                          <li>• Increase session timeout monitoring</li>
                          <li>• Enhanced user behavior analysis</li>
                          <li>• Additional audit logging</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Security Events</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Log
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {securityEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getSeverityColor(event.severity)}>
                              {event.severity}
                            </Badge>
                            <span className="font-medium">{event.type}</span>
                            {event.resolved ? (
                              <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">Active</Badge>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{event.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{event.timestamp.toLocaleString()}</span>
                            <span>IP: {event.ipAddress}</span>
                            {event.userId && <span>User: {event.userId}</span>}
                            {event.contentId && <span>Content: {event.contentId}</span>}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {!event.resolved && (
                            <Button variant="outline" size="sm">
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">GDPR Compliance</h4>
                          <p className="text-sm text-gray-600">General Data Protection Regulation</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">CCPA Compliance</h4>
                          <p className="text-sm text-gray-600">California Consumer Privacy Act</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">SOC 2 Type II</h4>
                          <p className="text-sm text-gray-600">Security, Availability, and Confidentiality</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Certified</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">ISO 27001</h4>
                          <p className="text-sm text-gray-600">Information Security Management</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Audit Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 border-l-4 border-blue-500 bg-blue-50">
                        <div>
                          <p className="font-medium">Daily Security Scan</p>
                          <p className="text-sm text-gray-600">Automated vulnerability assessment</p>
                        </div>
                        <span className="text-sm text-gray-500">Every day at 2:00 AM</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 border-l-4 border-green-500 bg-green-50">
                        <div>
                          <p className="font-medium">Weekly Compliance Review</p>
                          <p className="text-sm text-gray-600">GDPR/CCPA compliance check</p>
                        </div>
                        <span className="text-sm text-gray-500">Every Monday at 9:00 AM</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 border-l-4 border-orange-500 bg-orange-50">
                        <div>
                          <p className="font-medium">Monthly Penetration Test</p>
                          <p className="text-sm text-gray-600">External security assessment</p>
                        </div>
                        <span className="text-sm text-gray-500">First Monday of each month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Monthly Security Summary</h4>
                          <p className="text-sm text-gray-600">January 2024 - Comprehensive security overview</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Vulnerability Assessment Report</h4>
                          <p className="text-sm text-gray-600">Latest scan results and remediation plans</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Compliance Audit Report</h4>
                          <p className="text-sm text-gray-600">GDPR/CCPA compliance status and findings</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Incident Response Report</h4>
                          <p className="text-sm text-gray-600">Security incidents and response actions</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityAuditDashboard;
