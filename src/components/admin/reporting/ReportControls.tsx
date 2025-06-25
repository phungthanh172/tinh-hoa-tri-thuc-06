
import React from 'react';
import { BarChart3, Download, FileText, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ReportControlsProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  onExport: (type: string) => void;
}

const ReportControls: React.FC<ReportControlsProps> = ({ timeRange, onTimeRangeChange, onExport }) => {
  
  const handleExportAll = async () => {
    console.log('Exporting comprehensive report');
    toast.loading('Generating comprehensive report...', { id: 'comprehensive' });
    
    // Simulate comprehensive report generation
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = `comprehensive_report_${new Date().toISOString().split('T')[0]}.zip`;
      
      toast.success('Comprehensive report generated and downloaded', { id: 'comprehensive' });
      onExport('comprehensive');
    }, 3000);
  };

  const handleTimeRangeChange = (value: string) => {
    console.log(`Time range changed to: ${value}`);
    onTimeRangeChange(value);
    toast.success(`Time range updated to ${value.replace('days', ' days').replace('1year', '1 year')}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Analytics & Reporting
          </span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <Select value={timeRange} onValueChange={handleTimeRangeChange}>
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
            </div>
            <Button variant="outline" onClick={handleExportAll}>
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
