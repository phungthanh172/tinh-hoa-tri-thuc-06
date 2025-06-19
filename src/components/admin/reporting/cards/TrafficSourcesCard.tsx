
import React from 'react';
import { Globe, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TrafficSource {
  source: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
}

interface TrafficSourcesCardProps {
  data: TrafficSource[];
  onExport: (type: string) => void;
}

const TrafficSourcesCard: React.FC<TrafficSourcesCardProps> = ({ data, onExport }) => {
  const totalVisitors = data.reduce((sum, item) => sum + item.visitors, 0);
  const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
  const avgConversionRate = (totalConversions / totalVisitors) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Traffic Sources
          </span>
          <Button variant="outline" size="sm" onClick={() => onExport('traffic-sources')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-semibold text-blue-600">{totalVisitors.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Visitors</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold text-green-600">{totalConversions.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Conversions</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-lg font-semibold text-purple-600">{avgConversionRate.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Avg. Conv. Rate</p>
            </div>
          </div>
          
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.source}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{item.visitors.toLocaleString()}</Badge>
                  <Badge variant={item.conversionRate > 15 ? "default" : "secondary"}>
                    {item.conversionRate}%
                  </Badge>
                </div>
              </div>
              <Progress value={(item.visitors / totalVisitors) * 100} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{item.conversions.toLocaleString()} conversions</span>
                <span>{((item.visitors / totalVisitors) * 100).toFixed(1)}% of traffic</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSourcesCard;
