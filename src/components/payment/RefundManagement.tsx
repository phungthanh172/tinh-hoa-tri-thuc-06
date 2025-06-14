
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, DollarSign, Calendar, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const RefundManagement = () => {
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [refundReason, setRefundReason] = useState('');
  const [refundAmount, setRefundAmount] = useState('');

  const refundRequests = [
    {
      id: 'REF-001',
      studentName: 'John Doe',
      studentEmail: 'john@example.com',
      courseName: 'Complete JavaScript Course',
      purchaseDate: '2024-01-15',
      requestDate: '2024-01-20',
      amount: 84.99,
      reason: 'Course not as expected',
      status: 'pending',
      daysElapsed: 5,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'REF-002',
      studentName: 'Jane Smith',
      studentEmail: 'jane@example.com',
      courseName: 'React Masterclass',
      purchaseDate: '2024-01-10',
      requestDate: '2024-01-18',
      amount: 129.99,
      reason: 'Technical issues',
      status: 'approved',
      daysElapsed: 8,
      paymentMethod: 'PayPal'
    },
    {
      id: 'REF-003',
      studentName: 'Mike Johnson',
      studentEmail: 'mike@example.com',
      courseName: 'Python for Beginners',
      purchaseDate: '2024-01-05',
      requestDate: '2024-01-25',
      amount: 59.99,
      reason: 'Duplicate purchase',
      status: 'processed',
      daysElapsed: 20,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'REF-004',
      studentName: 'Sarah Wilson',
      studentEmail: 'sarah@example.com',
      courseName: 'Advanced CSS',
      purchaseDate: '2023-12-20',
      requestDate: '2024-01-22',
      amount: 79.99,
      reason: 'Course content outdated',
      status: 'rejected',
      daysElapsed: 33,
      paymentMethod: 'Credit Card'
    }
  ];

  const refundReasons = [
    'Course not as expected',
    'Technical issues',
    'Duplicate purchase',
    'Course content outdated',
    'Instructor unavailable',
    'Platform issues',
    'Other'
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'processed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'processed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canRefund = (request) => {
    return request.daysElapsed <= 30 && request.status === 'pending';
  };

  const handleApproveRefund = (refundId) => {
    console.log('Approving refund:', refundId);
    // Implementation for approving refund
  };

  const handleRejectRefund = (refundId) => {
    console.log('Rejecting refund:', refundId);
    // Implementation for rejecting refund
  };

  const handleProcessRefund = (refundId) => {
    console.log('Processing refund:', refundId);
    // Implementation for processing refund
  };

  const stats = {
    totalRequests: refundRequests.length,
    pendingRequests: refundRequests.filter(r => r.status === 'pending').length,
    totalRefunded: refundRequests
      .filter(r => r.status === 'processed')
      .reduce((sum, r) => sum + r.amount, 0),
    averageProcessingTime: '2.5 days'
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{stats.totalRequests}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Refunded</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalRefunded.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Processing</p>
                <p className="text-2xl font-bold">{stats.averageProcessingTime}</p>
              </div>
              <RefreshCw className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refund Policy Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Refund Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Refunds are available within 30 days of purchase</li>
            <li>• Students must have completed less than 30% of the course</li>
            <li>• Refunds are processed within 5-7 business days</li>
            <li>• Original payment method will be credited</li>
            <li>• Promotional discounts may affect refund amounts</li>
          </ul>
        </CardContent>
      </Card>

      {/* Refund Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Refund Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {refundRequests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedRefund(request)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(request.status)}
                    <div>
                      <h3 className="font-semibold">{request.id}</h3>
                      <p className="text-sm text-gray-600">{request.studentName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                    <span className="font-semibold">${request.amount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Course:</span>
                    <p className="font-medium">{request.courseName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Reason:</span>
                    <p className="font-medium">{request.reason}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Request Date:</span>
                    <p className="font-medium">{request.requestDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Days Elapsed:</span>
                    <p className={`font-medium ${request.daysElapsed > 30 ? 'text-red-600' : 'text-green-600'}`}>
                      {request.daysElapsed} days
                    </p>
                  </div>
                </div>

                {canRefund(request) && (
                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApproveRefund(request.id);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRejectRefund(request.id);
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {request.status === 'approved' && (
                  <div className="mt-4">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProcessRefund(request.id);
                      }}
                    >
                      Process Refund
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manual Refund Form */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Refund</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="student-email">Student Email</Label>
              <Input
                id="student-email"
                placeholder="student@example.com"
              />
            </div>
            <div>
              <Label htmlFor="refund-amount">Refund Amount</Label>
              <Input
                id="refund-amount"
                type="number"
                placeholder="0.00"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="refund-reason">Reason</Label>
            <Select value={refundReason} onValueChange={setRefundReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {refundReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="admin-notes">Admin Notes</Label>
            <Textarea
              id="admin-notes"
              placeholder="Internal notes about this refund..."
              className="min-h-[100px]"
            />
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            Process Manual Refund
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefundManagement;
