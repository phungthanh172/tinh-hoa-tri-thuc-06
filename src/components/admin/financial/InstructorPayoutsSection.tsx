
import React from 'react';
import { Download, RefreshCw, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Payout {
  id: number;
  instructor: string;
  amount: number;
  period: string;
  status: string;
  dueDate: string;
  courses: number;
  processedDate?: string;
  holdReason?: string;
}

interface InstructorPayoutsSectionProps {
  payouts: Payout[];
  onPayoutAction: (payoutId: number, action: string) => void;
}

const InstructorPayoutsSection: React.FC<InstructorPayoutsSectionProps> = ({ 
  payouts, 
  onPayoutAction 
}) => {
  return (
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
                                onClick={() => onPayoutAction(payout.id, 'process')}
                              >
                                Process Payout
                              </Button>
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => onPayoutAction(payout.id, 'hold')}
                              >
                                Put on Hold
                              </Button>
                            </div>
                          )}
                          
                          {payout.status === 'Hold' && (
                            <Button 
                              className="w-full"
                              onClick={() => onPayoutAction(payout.id, 'release')}
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
  );
};

export default InstructorPayoutsSection;
