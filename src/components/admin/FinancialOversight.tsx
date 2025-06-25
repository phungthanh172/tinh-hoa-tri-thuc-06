
import React, { useState } from 'react';
import FinancialOverviewCards from './financial/FinancialOverviewCards';
import InstructorPayoutsSection from './financial/InstructorPayoutsSection';
import RefundManagementSection from './financial/RefundManagementSection';
import { toast } from 'sonner';

const FinancialOversight = () => {
  const [financialData] = useState({
    totalRevenue: 245680.50,
    platformRevenue: 49136.10, // 20% commission
    instructorPayouts: 196544.40,
    pendingPayouts: 12450.75,
    totalRefunds: 3420.25,
    monthlyGrowth: 15.8
  });

  const [payouts, setPayouts] = useState([
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

  const [refunds, setRefunds] = useState([
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
    
    setPayouts(prev => prev.map(payout => {
      if (payout.id === payoutId) {
        switch (action) {
          case 'approve':
            toast.success(`Payout approved for ${payout.instructor}`);
            return { ...payout, status: 'Processed', processedDate: new Date().toISOString().split('T')[0] };
          case 'hold':
            toast.warning(`Payout put on hold for ${payout.instructor}`);
            return { ...payout, status: 'Hold', holdReason: 'Manual review required' };
          case 'reject':
            toast.error(`Payout rejected for ${payout.instructor}`);
            return { ...payout, status: 'Rejected' };
          default:
            return payout;
        }
      }
      return payout;
    }));
  };

  const handleRefundAction = (refundId: number, action: string) => {
    console.log(`Performing ${action} on refund ${refundId}`);
    
    setRefunds(prev => prev.map(refund => {
      if (refund.id === refundId) {
        switch (action) {
          case 'approve':
            toast.success(`Refund approved for ${refund.student}`);
            return { ...refund, status: 'Approved', processedDate: new Date().toISOString().split('T')[0] };
          case 'reject':
            toast.error(`Refund rejected for ${refund.student}`);
            return { ...refund, status: 'Rejected', processedDate: new Date().toISOString().split('T')[0] };
          case 'investigate':
            toast.info(`Refund under investigation for ${refund.student}`);
            return { ...refund, status: 'Under Investigation' };
          default:
            return refund;
        }
      }
      return refund;
    }));
  };

  return (
    <div className="space-y-6">
      <FinancialOverviewCards financialData={financialData} />
      <InstructorPayoutsSection 
        payouts={payouts} 
        onPayoutAction={handlePayoutAction} 
      />
      <RefundManagementSection 
        refunds={refunds} 
        onRefundAction={handleRefundAction} 
      />
    </div>
  );
};

export default FinancialOversight;
