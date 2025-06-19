
export interface SystemMetrics {
  timestamp: Date;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkThroughput: number;
  activeConnections: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
}

export interface CDNMetrics {
  region: string;
  hitRatio: number;
  bandwidth: number;
  requests: number;
  latency: number;
}

export interface DatabaseMetrics {
  connectionPoolUsage: number;
  queryPerformance: number;
  replicationLag: number;
  diskIOPS: number;
  cacheHitRatio: number;
}

export interface LoadBalancerMetrics {
  serverHealth: { serverId: string; status: 'healthy' | 'unhealthy'; responseTime: number }[];
  requestDistribution: { serverId: string; requestCount: number }[];
  totalRequests: number;
  failedRequests: number;
}

export interface ScalabilityAlert {
  id: string;
  type: 'cpu' | 'memory' | 'disk' | 'network' | 'database' | 'custom';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  threshold: number;
  currentValue: number;
  timestamp: Date;
  resolved: boolean;
}

// Mock performance monitoring service
export const performanceMonitoringApi = {
  // Get current system metrics
  getSystemMetrics: async (): Promise<SystemMetrics> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      timestamp: new Date(),
      cpuUsage: Math.floor(Math.random() * 40) + 20, // 20-60%
      memoryUsage: Math.floor(Math.random() * 30) + 40, // 40-70%
      diskUsage: Math.floor(Math.random() * 20) + 60, // 60-80%
      networkThroughput: Math.floor(Math.random() * 500) + 1000, // 1000-1500 MB/s
      activeConnections: Math.floor(Math.random() * 500) + 1500,
      responseTime: Math.floor(Math.random() * 50) + 150, // 150-200ms
      errorRate: Math.random() * 0.5, // 0-0.5%
      throughput: Math.floor(Math.random() * 1000) + 2000 // 2000-3000 req/min
    };
  },

  // Get CDN performance metrics
  getCDNMetrics: async (): Promise<CDNMetrics[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const regions = ['US-East', 'US-West', 'Europe', 'Asia-Pacific', 'South America'];
    return regions.map(region => ({
      region,
      hitRatio: Math.random() * 20 + 80, // 80-100%
      bandwidth: Math.floor(Math.random() * 500) + 1000,
      requests: Math.floor(Math.random() * 10000) + 50000,
      latency: Math.floor(Math.random() * 30) + 20 // 20-50ms
    }));
  },

  // Get database performance metrics
  getDatabaseMetrics: async (): Promise<DatabaseMetrics> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    return {
      connectionPoolUsage: Math.floor(Math.random() * 30) + 40, // 40-70%
      queryPerformance: Math.floor(Math.random() * 20) + 80, // 80-100ms avg
      replicationLag: Math.floor(Math.random() * 5), // 0-5ms
      diskIOPS: Math.floor(Math.random() * 1000) + 2000,
      cacheHitRatio: Math.random() * 10 + 90 // 90-100%
    };
  },

  // Get load balancer metrics
  getLoadBalancerMetrics: async (): Promise<LoadBalancerMetrics> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const servers = ['server-1', 'server-2', 'server-3', 'server-4'];
    return {
      serverHealth: servers.map(serverId => ({
        serverId,
        status: Math.random() > 0.1 ? 'healthy' : 'unhealthy' as const,
        responseTime: Math.floor(Math.random() * 50) + 100
      })),
      requestDistribution: servers.map(serverId => ({
        serverId,
        requestCount: Math.floor(Math.random() * 1000) + 500
      })),
      totalRequests: Math.floor(Math.random() * 10000) + 50000,
      failedRequests: Math.floor(Math.random() * 100) + 10
    };
  },

  // Get scalability alerts
  getScalabilityAlerts: async (): Promise<ScalabilityAlert[]> => {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    return [
      {
        id: '1',
        type: 'cpu',
        severity: 'medium',
        message: 'CPU usage approaching threshold',
        threshold: 80,
        currentValue: 75,
        timestamp: new Date(Date.now() - 300000),
        resolved: false
      },
      {
        id: '2',
        type: 'memory',
        severity: 'high',
        message: 'Memory usage critical',
        threshold: 90,
        currentValue: 87,
        timestamp: new Date(Date.now() - 600000),
        resolved: false
      }
    ];
  },

  // Trigger auto-scaling action
  triggerAutoScaling: async (resourceType: string, action: 'scale-up' | 'scale-down'): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: `${action} triggered for ${resourceType}. New instances will be available in 2-3 minutes.`
    };
  },

  // Get historical performance data
  getHistoricalMetrics: async (timeRange: '1h' | '24h' | '7d' | '30d'): Promise<SystemMetrics[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const dataPoints = timeRange === '1h' ? 12 : timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
    return Array.from({ length: dataPoints }, (_, i) => ({
      timestamp: new Date(Date.now() - (dataPoints - i) * (timeRange === '1h' ? 300000 : timeRange === '24h' ? 3600000 : timeRange === '7d' ? 86400000 : 86400000)),
      cpuUsage: Math.floor(Math.random() * 40) + 20,
      memoryUsage: Math.floor(Math.random() * 30) + 40,
      diskUsage: Math.floor(Math.random() * 20) + 60,
      networkThroughput: Math.floor(Math.random() * 500) + 1000,
      activeConnections: Math.floor(Math.random() * 500) + 1500,
      responseTime: Math.floor(Math.random() * 50) + 150,
      errorRate: Math.random() * 0.5,
      throughput: Math.floor(Math.random() * 1000) + 2000
    }));
  }
};
