import React, { useState } from 'react';
import SystemHealthOverview from './system-monitoring/SystemHealthOverview';
import ResourceUsageChart from './system-monitoring/ResourceUsageChart';
import PerformanceChart from './system-monitoring/PerformanceChart';
import SecurityAlertsCard from './system-monitoring/SecurityAlertsCard';
import AdminAuditLog from './system-monitoring/AdminAuditLog';
import SystemActions from './system-monitoring/SystemActions';
import ScalabilityDashboard from './ScalabilityDashboard';
import CDNManagement from './CDNManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="scalability">Scalability & Performance</TabsTrigger>
          <TabsTrigger value="cdn">CDN & Global Delivery</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Health Overview */}
          <SystemHealthOverview systemMetrics={systemMetrics} />

          {/* Resource Usage & Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResourceUsageChart systemMetrics={systemMetrics} />
            <PerformanceChart performanceData={performanceData} />
          </div>

          {/* Security & Audit */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SecurityAlertsCard securityAlerts={securityAlerts} />
            <AdminAuditLog auditLogs={auditLogs} />
          </div>

          {/* System Actions */}
          <SystemActions onSystemAction={handleSystemAction} />
        </TabsContent>

        <TabsContent value="scalability">
          <ScalabilityDashboard />
        </TabsContent>

        <TabsContent value="cdn">
          <CDNManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMonitoring;
