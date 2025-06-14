
import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SecurityAlert {
  id: number;
  type: string;
  severity: string;
  count: number;
  lastOccurred: string;
}

interface SecurityAlertsCardProps {
  securityAlerts: SecurityAlert[];
}

const SecurityAlertsCard = ({ securityAlerts }: SecurityAlertsCardProps) => {
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
  );
};

export default SecurityAlertsCard;
