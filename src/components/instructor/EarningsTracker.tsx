import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const EarningsTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const earnings = {
    total: 24580.50,
    thisMonth: 4320.75,
    lastMonth: 3890.25,
    growth: 11.2
  };

  const transactions = [
    {
      id: '1',
      course: 'JavaScript Fundamentals',
      student: 'Alice Johnson',
      amount: 89.99,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      course: 'React for Beginners',
      student: 'Bob Smith',
      amount: 129.99,
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: '3',
      course: 'Advanced JavaScript',
      student: 'Carol Davis',
      amount: 199.99,
      date: '2024-01-13',
      status: 'pending'
    }
  ];

  const courseEarnings = [
    {
      course: 'JavaScript Fundamentals',
      students: 156,
      price: 89.99,
      totalEarnings: 14038.44,
      thisMonth: 1799.78,
      enrollments: [
        { date: '2024-01-15', student: 'Alice Johnson', amount: 89.99 },
        { date: '2024-01-14', student: 'Bob Smith', amount: 89.99 },
        { date: '2024-01-13', student: 'Carol Davis', amount: 89.99 }
      ]
    },
    {
      course: 'React for Beginners',
      students: 89,
      price: 129.99,
      totalEarnings: 11569.11,
      thisMonth: 1559.87,
      enrollments: [
        { date: '2024-01-12', student: 'David Wilson', amount: 129.99 },
        { date: '2024-01-11', student: 'Eva Brown', amount: 129.99 }
      ]
    }
  ];

  const handleExportReport = () => {
    console.log('Exporting earnings report...');
    toast.loading('Generating earnings report...', { id: 'export' });
    
    setTimeout(() => {
      // Create CSV content
      const csvContent = [
        ['Course', 'Students', 'Price', 'Total Earnings', 'This Month'],
        ...courseEarnings.map(course => [
          course.course,
          course.students.toString(),
          `$${course.price}`,
          `$${course.totalEarnings}`,
          `$${course.thisMonth}`
        ])
      ].map(row => row.join(',')).join('\n');

      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `earnings_report_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Earnings report downloaded successfully', { id: 'export' });
    }, 2000);
  };

  const handleViewDetails = (course: any) => {
    console.log('Viewing course details:', course);
    setSelectedCourse(course);
  };

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">${earnings.total.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold">${earnings.thisMonth.toLocaleString()}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Month</p>
                <p className="text-2xl font-bold">${earnings.lastMonth.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-green-600">+{earnings.growth}%</p>
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Earnings Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Course Earnings</CardTitle>
            <Button variant="outline" size="sm" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Course</th>
                  <th className="text-left py-3 px-4">Students</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Total Earnings</th>
                  <th className="text-left py-3 px-4">This Month</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courseEarnings.map((course, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{course.course}</td>
                    <td className="py-3 px-4">{course.students}</td>
                    <td className="py-3 px-4">${course.price}</td>
                    <td className="py-3 px-4 font-semibold">${course.totalEarnings.toLocaleString()}</td>
                    <td className="py-3 px-4 text-green-600">${course.thisMonth.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(course)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{course.course} - Detailed Earnings</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Total Students</p>
                                <p className="text-lg font-semibold">{course.students}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Course Price</p>
                                <p className="text-lg font-semibold">${course.price}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Total Earnings</p>
                                <p className="text-lg font-semibold text-green-600">${course.totalEarnings.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">This Month</p>
                                <p className="text-lg font-semibold">${course.thisMonth.toLocaleString()}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Recent Enrollments</h4>
                              <div className="space-y-2 max-h-60 overflow-y-auto">
                                {course.enrollments.map((enrollment, idx) => (
                                  <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <div>
                                      <p className="font-medium">{enrollment.student}</p>
                                      <p className="text-sm text-gray-600">{enrollment.date}</p>
                                    </div>
                                    <p className="font-semibold">${enrollment.amount}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{transaction.course}</h4>
                  <p className="text-sm text-gray-600">Student: {transaction.student}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${transaction.amount}</p>
                  <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsTracker;
