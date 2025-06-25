
export interface Payout {
  id: number;
  instructor: string;
  amount: number;
  period: string;
  status: 'Pending' | 'Processed' | 'Hold' | 'Rejected';
  dueDate: string;
  courses: number;
  processedDate?: string;
  holdReason?: string;
}
