
import React from 'react';
import { Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

interface ResourceUsageChartProps {
  systemMetrics: SystemMetrics;
}

const ResourceUsageChart = ({ systemMetrics }: ResourceUsageChartProps) => {
  return (
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
  );
};

export default ResourceUsageChart;
