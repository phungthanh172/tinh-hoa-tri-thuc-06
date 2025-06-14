
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Refund {
  id: number;
  student: string;
  course: string;
  amount: number;
  requestDate: string;
  status: string;
  reason: string;
  processedDate?: string;
}

interface RefundManagementSectionProps {
  refunds: Refund[];
  onRefundAction: (refundId: number, action: string) => void;
}

const RefundManagementSection: React.FC<RefundManagementSectionProps> = ({ 
  refunds, 
  onRefundAction 
}) => {
  return (
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
                          onClick={() => onRefundAction(refund.id, 'approve')}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onRefundAction(refund.id, 'reject')}
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
  );
};

export default RefundManagementSection;
