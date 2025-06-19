
import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  Globe, 
  AlertTriangle, 
  TrendingUp,
  Zap,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { performanceMonitoringApi, type SystemMetrics, type CDNMetrics, type DatabaseMetrics, type LoadBalancerMetrics, type ScalabilityAlert } from '@/services/performanceMonitoringApi';

const ScalabilityDashboard = () => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [cdnMetrics, setCdnMetrics] = useState<CDNMetrics[]>([]);
  const [dbMetrics, setDbMetrics] = useState<DatabaseMetrics | null>(null);
  const [lbMetrics, setLbMetrics] = useState<LoadBalancerMetrics | null>(null);
  const [alerts, setAlerts] = useState<ScalabilityAlert[]>([]);
  const [historicalData, setHistoricalData] = useState<SystemMetrics[]>([]);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadHistoricalData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    try {
      const [system, cdn, db, lb, alertsData] = await Promise.all([
        performanceMonitoringApi.getSystemMetrics(),
        performanceMonitoringApi.getCDNMetrics(),
        performanceMonitoringApi.getDatabaseMetrics(),
        performanceMonitoringApi.getLoadBalancerMetrics(),
        performanceMonitoringApi.getScalabilityAlerts()
      ]);

      setSystemMetrics(system);
      setCdnMetrics(cdn);
      setDbMetrics(db);
      setLbMetrics(lb);
      setAlerts(alertsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistoricalData = async () => {
    try {
      const data = await performanceMonitoringApi.getHistoricalMetrics(timeRange);
      setHistoricalData(data);
    } catch (error) {
      console.error('Failed to load historical data:', error);
    }
  };

  const handleAutoScale = async (resourceType: string, action: 'scale-up' | 'scale-down') => {
    try {
      const result = await performanceMonitoringApi.triggerAutoScaling(resourceType, action);
      if (result.success) {
        console.log('Auto-scaling triggered:', result.message);
      }
    } catch (error) {
      console.error('Failed to trigger auto-scaling:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <Activity className="w-8 h-8 text-blue-600 mx-auto animate-pulse" />
          <p className="text-gray-600">Loading scalability metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {alerts.filter(alert => !alert.resolved).length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span className="font-medium text-red-800">
                {alerts.filter(alert => !alert.resolved).length} active scalability alerts require attention
              </span>
              <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                View Details
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Real-time Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold">{systemMetrics?.responseTime}ms</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <Badge variant={systemMetrics && systemMetrics.responseTime < 200 ? "default" : "destructive"} className="mt-2">
              {systemMetrics && systemMetrics.responseTime < 200 ? "Optimal" : "Slow"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Throughput</p>
                <p className="text-2xl font-bold">{systemMetrics?.throughput}/min</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <Badge variant="default" className="mt-2 bg-blue-500">High Traffic</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Connections</p>
                <p className="text-2xl font-bold">{systemMetrics?.activeConnections?.toLocaleString()}</p>
              </div>
              <Server className="w-8 h-8 text-purple-600" />
            </div>
            <Badge variant="outline" className="mt-2">Connected</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold">{systemMetrics?.errorRate?.toFixed(2)}%</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <Badge variant={systemMetrics && systemMetrics.errorRate < 1 ? "default" : "destructive"} className="mt-2">
              {systemMetrics && systemMetrics.errorRate < 1 ? "Stable" : "Issues"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="cdn">CDN & Global</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="loadbalancer">Load Balancing</TabsTrigger>
          <TabsTrigger value="autoscaling">Auto-Scaling</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>System Performance Trends</CardTitle>
                <div className="flex space-x-2">
                  {(['1h', '24h', '7d', '30d'] as const).map((range) => (
                    <Button
                      key={range}
                      variant={timeRange === range ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
                    <YAxis />
                    <Tooltip labelFormatter={(value) => new Date(value).toLocaleString()} />
                    <Line type="monotone" dataKey="cpuUsage" stroke="#8884d8" name="CPU %" />
                    <Line type="monotone" dataKey="memoryUsage" stroke="#82ca9d" name="Memory %" />
                    <Line type="monotone" dataKey="responseTime" stroke="#ffc658" name="Response Time (ms)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cdn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Global CDN Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cdnMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hitRatio" fill="#8884d8" name="Hit Ratio %" />
                    <Bar dataKey="latency" fill="#82ca9d" name="Latency (ms)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Database Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{dbMetrics?.connectionPoolUsage}%</div>
                  <div className="text-sm text-gray-600">Connection Pool</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dbMetrics?.queryPerformance}ms</div>
                  <div className="text-sm text-gray-600">Avg Query Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{dbMetrics?.cacheHitRatio?.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Cache Hit Ratio</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loadbalancer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Load Balancer Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Server Health</h4>
                    <div className="space-y-2">
                      {lbMetrics?.serverHealth.map((server) => (
                        <div key={server.serverId} className="flex items-center justify-between p-2 border rounded">
                          <span className="font-medium">{server.serverId}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant={server.status === 'healthy' ? 'default' : 'destructive'}>
                              {server.status}
                            </Badge>
                            <span className="text-sm text-gray-600">{server.responseTime}ms</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Request Distribution</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={lbMetrics?.requestDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="serverId" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="requestCount" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="autoscaling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Auto-Scaling Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Compute Resources</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleAutoScale('compute', 'scale-up')}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Scale Up Compute
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleAutoScale('compute', 'scale-down')}
                    >
                      Scale Down Compute
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Database Resources</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleAutoScale('database', 'scale-up')}
                    >
                      <Database className="w-4 h-4 mr-2" />
                      Scale Up Database
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleAutoScale('database', 'scale-down')}
                    >
                      Scale Down Database
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Scaling Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alerts.filter(alert => !alert.resolved).map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`} />
                      <div>
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-sm text-gray-600">
                          {alert.currentValue} / {alert.threshold} threshold
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScalabilityDashboard;
