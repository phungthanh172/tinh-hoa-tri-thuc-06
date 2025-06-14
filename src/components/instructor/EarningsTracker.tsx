
import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const EarningsTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');

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
      thisMonth: 1799.78
    },
    {
      course: 'React for Beginners',
      students: 89,
      price: 129.99,
      totalEarnings: 11569.11,
      thisMonth: 1559.87
    }
  ];

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
            <Button variant="outline" size="sm">
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
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
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
