
import React from 'react';
import { DollarSign, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueData {
    month: string;
    revenue: number;
}

interface RevenueAnalyticsCardProps {
    data: RevenueData[];
    onExport: (type: string) => void;
}

const RevenueAnalyticsCard: React.FC<RevenueAnalyticsCardProps> = ({ data, onExport }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Revenue Analytics
          </span>
          <Button variant="outline" size="sm" onClick={() => onExport('revenue')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueAnalyticsCard;
