
import React, { useState, useEffect } from 'react';
import { Globe, MapPin, Zap, BarChart3, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { performanceMonitoringApi, type CDNMetrics } from '@/services/performanceMonitoringApi';

interface CDNEdgeLocation {
  id: string;
  region: string;
  city: string;
  country: string;
  status: 'active' | 'maintenance' | 'offline';
  capacity: number;
  usage: number;
  latency: number;
}

const CDNManagement = () => {
  const [cdnMetrics, setCdnMetrics] = useState<CDNMetrics[]>([]);
  const [edgeLocations] = useState<CDNEdgeLocation[]>([
    { id: '1', region: 'US-East', city: 'New York', country: 'USA', status: 'active', capacity: 100, usage: 65, latency: 12 },
    { id: '2', region: 'US-West', city: 'Los Angeles', country: 'USA', status: 'active', capacity: 100, usage: 72, latency: 15 },
    { id: '3', region: 'Europe', city: 'Frankfurt', country: 'Germany', status: 'active', capacity: 100, usage: 58, latency: 18 },
    { id: '4', region: 'Asia-Pacific', city: 'Singapore', country: 'Singapore', status: 'active', capacity: 100, usage: 81, latency: 22 },
    { id: '5', region: 'South America', city: 'São Paulo', country: 'Brazil', status: 'maintenance', capacity: 100, usage: 0, latency: 0 }
  ]);
  const [cachingSettings, setCachingSettings] = useState({
    videoCacheTTL: '7d',
    imageCacheTTL: '30d',
    staticAssetsTTL: '1y',
    apiCacheTTL: '5m',
    compressionEnabled: true,
    imageOptimization: true
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCDNData();
    const interval = setInterval(loadCDNData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const loadCDNData = async () => {
    try {
      const metrics = await performanceMonitoringApi.getCDNMetrics();
      setCdnMetrics(metrics);
    } catch (error) {
      console.error('Failed to load CDN data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const bandwidthData = cdnMetrics.map((metric, index) => ({
    ...metric,
    fill: COLORS[index % COLORS.length]
  }));

  const totalBandwidth = cdnMetrics.reduce((sum, metric) => sum + metric.bandwidth, 0);
  const averageLatency = cdnMetrics.reduce((sum, metric) => sum + metric.latency, 0) / cdnMetrics.length;
  const totalRequests = cdnMetrics.reduce((sum, metric) => sum + metric.requests, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <Globe className="w-8 h-8 text-blue-600 mx-auto animate-pulse" />
          <p className="text-gray-600">Loading CDN metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CDN Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bandwidth</p>
                <p className="text-2xl font-bold">{totalBandwidth.toFixed(1)} GB</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Latency</p>
                <p className="text-2xl font-bold">{averageLatency.toFixed(0)}ms</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <Badge variant={averageLatency < 50 ? "default" : "destructive"} className="mt-2">
              {averageLatency < 50 ? "Excellent" : "Needs Optimization"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{(totalRequests / 1000).toFixed(0)}K</p>
              </div>
              <Globe className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Edge Locations</p>
                <p className="text-2xl font-bold">{edgeLocations.filter(loc => loc.status === 'active').length}</p>
              </div>
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <Badge variant="outline" className="mt-2">
              {edgeLocations.length} Total
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance & Edge Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Regional Bandwidth Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bandwidthData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="bandwidth"
                    label={({ region, bandwidth }) => `${region}: ${bandwidth.toFixed(0)}GB`}
                  >
                    {bandwidthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edge Location Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {edgeLocations.map((location) => (
                <div key={location.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(location.status)}`} />
                    <div>
                      <div className="font-medium">{location.city}, {location.country}</div>
                      <div className="text-sm text-gray-600">{location.region}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{location.usage}% usage</div>
                    <div className="text-xs text-gray-600">{location.latency}ms latency</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cdnMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="hitRatio" fill="#8884d8" name="Hit Ratio %" />
                <Bar yAxisId="right" dataKey="latency" fill="#82ca9d" name="Latency (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* CDN Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            CDN Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Cache Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Video Cache TTL</label>
                  <Select value={cachingSettings.videoCacheTTL} onValueChange={(value) => setCachingSettings(prev => ({ ...prev, videoCacheTTL: value }))}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">1 Day</SelectItem>
                      <SelectItem value="7d">7 Days</SelectItem>
                      <SelectItem value="30d">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Image Cache TTL</label>
                  <Select value={cachingSettings.imageCacheTTL} onValueChange={(value) => setCachingSettings(prev => ({ ...prev, imageCacheTTL: value }))}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 Days</SelectItem>
                      <SelectItem value="30d">30 Days</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Optimization Features</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Compression Enabled</label>
                  <Switch 
                    checked={cachingSettings.compressionEnabled}
                    onCheckedChange={(checked) => setCachingSettings(prev => ({ ...prev, compressionEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Image Optimization</label>
                  <Switch 
                    checked={cachingSettings.imageOptimization}
                    onCheckedChange={(checked) => setCachingSettings(prev => ({ ...prev, imageOptimization: checked }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={() => console.log('CDN settings saved:', cachingSettings)}>
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CDNManagement;
