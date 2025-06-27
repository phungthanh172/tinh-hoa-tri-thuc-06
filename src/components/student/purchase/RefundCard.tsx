
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface RefundRequest {
  id: string;
  courseTitle: string;
  purchaseId: string;
  requestDate: string;
  amount: number;
  reason: string;
  status: string;
  estimatedProcessing: string;
}

interface RefundCardProps {
  refund: RefundRequest;
  getStatusBadge: (status: string) => JSX.Element;
}

const RefundCard = ({ refund, getStatusBadge }: RefundCardProps) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold">{refund.courseTitle}</h3>
          <p className="text-sm text-gray-600">Request ID: {refund.id}</p>
        </div>
        {getStatusBadge(refund.status)}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Request Date: {new Date(refund.requestDate).toLocaleDateString()}</p>
          <p className="text-gray-600">Amount: ${refund.amount}</p>
        </div>
        <div>
          <p className="text-gray-600">Reason: {refund.reason}</p>
          <p className="text-gray-600">Processing Time: {refund.estimatedProcessing}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center text-sm">
        {refund.status === 'pending' ? (
          <div className="flex items-center text-yellow-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            Your refund request is being reviewed
          </div>
        ) : (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            Your refund has been approved and will be processed soon
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundCard;
