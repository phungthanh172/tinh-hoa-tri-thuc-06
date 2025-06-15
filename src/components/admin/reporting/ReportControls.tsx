
import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportControlsProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  onExport: (type: string) => void;
}

const ReportControls: React.FC<ReportControlsProps> = ({ timeRange, onTimeRangeChange, onExport }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Analytics & Reporting
          </span>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={onTimeRangeChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => onExport('comprehensive')}>
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ReportControls;
