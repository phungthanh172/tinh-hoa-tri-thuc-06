
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, DollarSign, BookOpen, AlertTriangle, Download } from 'lucide-react';

interface DailySummaryData {
  date: string;
  newUsers: number;
  dailyRevenue: number;
  newCourses: number;
  newSupportTickets: number;
}

interface DailySummaryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  summaryData: DailySummaryData;
}

const DailySummaryDialog: React.FC<DailySummaryDialogProps> = ({ isOpen, onOpenChange, summaryData }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] print:shadow-none print:border-none">
        <DialogHeader>
          <DialogTitle>Daily Summary Report</DialogTitle>
          <DialogDescription>
            A quick overview of platform activity for {summaryData.date}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <Users className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">New Users</p>
                <p className="text-xl font-bold">{summaryData.newUsers}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <DollarSign className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Revenue</p>
                <p className="text-xl font-bold">${summaryData.dailyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <BookOpen className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">New Courses Published</p>
                <p className="text-xl font-bold">{summaryData.newCourses}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">New Support Tickets</p>
                <p className="text-xl font-bold">{summaryData.newSupportTickets}</p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="print:hidden">
          <Button variant="outline" onClick={handlePrint}>
            <Download className="w-4 h-4 mr-2" />
            Print / Save as PDF
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DailySummaryDialog;
