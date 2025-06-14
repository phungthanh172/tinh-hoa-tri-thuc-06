
import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, AlertCircle, Download, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const FinancialOversight = () => {
  const [financialData] = useState({
    totalRevenue: 245680.50,
    platformRevenue: 49136.10, // 20% commission
    instructorPayouts: 196544.40,
    pendingPayouts: 12450.75,
    totalRefunds: 3420.25,
    monthlyGrowth: 15.8
  });

  const [payouts] = useState([
    {
      id: 1,
      instructor: "John Smith",
      amount: 1250.50,
      period: "January 2024",
      status: "Pending",
      dueDate: "2024-02-15",
      courses: 3
    },
    {
      id: 2,
      instructor: "Sarah Johnson",
      amount: 890.25,
      period: "January 2024",
      status: "Processed",
      dueDate: "2024-02-15",
      courses: 2,
      processedDate: "2024-02-10"
    },
    {
      id: 3,
      instructor: "Mike Wilson",
      amount: 450.00,
      period: "January 2024",
      status: "Hold",
      dueDate: "2024-02-15",
      courses: 1,
      holdReason: "Account verification required"
    }
  ]);

  const [refunds] = useState([
    {
      id: 1,
      student: "Alice Brown",
      course: "JavaScript Fundamentals",
      amount: 79.99,
      requestDate: "2024-01-25",
      status: "Pending",
      reason: "Course not as described"
    },
    {
      id: 2,
      student: "Bob Wilson",
      course: "Digital Marketing Basics",
      amount: 99.99,
      requestDate: "2024-01-20",
      status: "Approved",
      reason: "Technical issues",
      processedDate: "2024-01-22"
    }
  ]);

  const handlePayoutAction = (payoutId: number, action: string) => {
    console.log(`Performing ${action} on payout ${payoutId}`);
  };

  const handleRefundAction = (refundId: number, action: string) => {
    console.log(`Performing ${action} on refund ${refundId}`);
  };

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Platform Revenue</p>
                <p className="text-2xl font-bold">${financialData.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{financialData.monthlyGrowth}% this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Platform Commission</p>
                <p className="text-2xl font-bold">${financialData.platformRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-500">20% of total revenue</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
                <p className="text-2xl font-bold">${financialData.pendingPayouts.toLocaleString()}</p>
                <p className="text-sm text-orange-600">Requires processing</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructor Payouts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Instructor Payouts</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Process All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payout.instructor}</div>
                        <div className="text-sm text-gray-500">{payout.courses} courses</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${payout.amount.toLocaleString()}</TableCell>
                    <TableCell>{payout.period}</TableCell>
                    <TableCell>
                      <Badge variant={
                        payout.status === 'Processed' ? 'default' :
                        payout.status === 'Pending' ? 'secondary' : 'destructive'
                      }>
                        {payout.status}
                      </Badge>
                      {payout.status === 'Hold' && (
                        <div className="text-xs text-red-600 mt-1">{payout.holdReason}</div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{payout.dueDate}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <CreditCard className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Payout Actions - {payout.instructor}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Amount</label>
                                <Input value={`$${payout.amount}`} readOnly />
                              </div>
                              <div>
                                <label className="text-sm font-medium">Period</label>
                                <Input value={payout.period} readOnly />
                              </div>
                            </div>
                            
                            {payout.status === 'Pending' && (
                              <div className="flex space-x-2">
                                <Button 
                                  className="flex-1"
                                  onClick={() => handlePayoutAction(payout.id, 'process')}
                                >
                                  Process Payout
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="flex-1"
                                  onClick={() => handlePayoutAction(payout.id, 'hold')}
                                >
                                  Put on Hold
                                </Button>
                              </div>
                            )}
                            
                            {payout.status === 'Hold' && (
                              <Button 
                                className="w-full"
                                onClick={() => handlePayoutAction(payout.id, 'release')}
                              >
                                Release Hold
                              </Button>
                            )}
                            
                            <div>
                              <label className="text-sm font-medium">Notes</label>
                              <Textarea placeholder="Add notes about this payout..." />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Refund Management */}
      <Card>
        <CardHeader>
          <CardTitle>Refund Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {refunds.map((refund) => (
                  <TableRow key={refund.id}>
                    <TableCell>{refund.student}</TableCell>
                    <TableCell>
                      <div className="font-medium">{refund.course}</div>
                      <div className="text-sm text-gray-500">Requested: {refund.requestDate}</div>
                    </TableCell>
                    <TableCell className="font-medium">${refund.amount}</TableCell>
                    <TableCell className="text-sm">{refund.reason}</TableCell>
                    <TableCell>
                      <Badge variant={refund.status === 'Approved' ? 'default' : 'secondary'}>
                        {refund.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {refund.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleRefundAction(refund.id, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRefundAction(refund.id, 'reject')}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialOversight;
