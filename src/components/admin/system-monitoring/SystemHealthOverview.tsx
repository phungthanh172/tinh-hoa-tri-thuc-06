
import React from 'react';
import { Activity, Server, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SystemMetrics {
  serverHealth: string;
  uptime: string;
  responseTime: string;
  activeUsers: number;
}

interface SystemHealthOverviewProps {
  systemMetrics: SystemMetrics;
}

const SystemHealthOverview = ({ systemMetrics }: SystemHealthOverviewProps) => {
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

  return (
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
  );
};

export default SystemHealthOverview;
