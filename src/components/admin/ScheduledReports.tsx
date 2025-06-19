
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, Mail, Plus, Settings, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';

const ScheduledReports = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [emailList, setEmailList] = useState('');

  const scheduledReports = [
    {
      id: 1,
      name: 'Weekly Revenue Report',
      type: 'financial',
      frequency: 'weekly',
      recipients: ['admin@platform.com', 'finance@platform.com'],
      lastSent: '2024-01-22',
      nextSend: '2024-01-29',
      active: true,
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Monthly User Growth',
      type: 'users',
      frequency: 'monthly',
      recipients: ['marketing@platform.com', 'ceo@platform.com'],
      lastSent: '2024-01-01',
      nextSend: '2024-02-01',
      active: true,
      format: 'CSV'
    },
    {
      id: 3,
      name: 'Daily Course Performance',
      type: 'courses',
      frequency: 'daily',
      recipients: ['content@platform.com'],
      lastSent: '2024-01-23',
      nextSend: '2024-01-24',
      active: false,
      format: 'Excel'
    },
    {
      id: 4,
      name: 'Quarterly Instructor Payouts',
      type: 'payouts',
      frequency: 'quarterly',
      recipients: ['finance@platform.com', 'legal@platform.com'],
      lastSent: '2024-01-01',
      nextSend: '2024-04-01',
      active: true,
      format: 'PDF'
    }
  ];

  const handleCreateReport = () => {
    if (!reportName || !reportType || !frequency) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Scheduled report created successfully');
    setIsCreateDialogOpen(false);
    setReportName('');
    setReportType('');
    setFrequency('');
    setEmailList('');
  };

  const toggleReportStatus = (reportId: number) => {
    toast.success('Report status updated');
  };

  const deleteReport = (reportId: number) => {
    toast.success('Scheduled report deleted');
  };

  const sendReportNow = (reportId: number) => {
    toast.success('Report sent successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Scheduled Reports</h2>
          <p className="text-gray-600">Automate report delivery to stakeholders</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Scheduled Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reportName">Report Name</Label>
                <Input
                  id="reportName"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="e.g., Weekly Sales Report"
                />
              </div>
              
              <div>
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="users">User Analytics</SelectItem>
                    <SelectItem value="courses">Course Performance</SelectItem>
                    <SelectItem value="instructors">Instructor Analytics</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="emails">Email Recipients</Label>
                <Input
                  id="emails"
                  value={emailList}
                  onChange={(e) => setEmailList(e.target.value)}
                  placeholder="email1@domain.com, email2@domain.com"
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleCreateReport} className="flex-1">
                  Create Report
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {scheduledReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{report.name}</h3>
                    <Badge variant={report.active ? 'default' : 'secondary'}>
                      {report.active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge variant="outline">{report.format}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        Frequency
                      </div>
                      <p className="font-medium capitalize">{report.frequency}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Last Sent
                      </div>
                      <p className="font-medium">{report.lastSent}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Next Send
                      </div>
                      <p className="font-medium">{report.nextSend}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Mail className="w-4 h-4 mr-1" />
                        Recipients
                      </div>
                      <p className="font-medium">{report.recipients.length} people</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">Recipients:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {report.recipients.map((email, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {email}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={report.active}
                      onCheckedChange={() => toggleReportStatus(report.id)}
                    />
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sendReportNow(report.id)}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Send Now
                  </Button>
                  
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteReport(report.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScheduledReports;
