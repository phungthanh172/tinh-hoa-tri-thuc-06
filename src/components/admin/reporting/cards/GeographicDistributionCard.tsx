
import React from 'react';
import { MapPin, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface GeographicData {
  country: string;
  users: number;
  revenue: number;
  percentage: number;
}

interface GeographicDistributionCardProps {
  data: GeographicData[];
  onExport: (type: string) => void;
}

const GeographicDistributionCard: React.FC<GeographicDistributionCardProps> = ({ data, onExport }) => {
  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Geographic Distribution
          </span>
          <Button variant="outline" size="sm" onClick={() => onExport('geographic')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-semibold text-blue-600">{totalUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold text-green-600">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
          
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.country}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{item.users.toLocaleString()} users</Badge>
                  <span className="text-sm text-gray-600">${item.revenue.toLocaleString()}</span>
                </div>
              </div>
              <Progress value={item.percentage} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{item.percentage}% of total</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeographicDistributionCard;
