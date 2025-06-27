
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Purchase {
  id: string;
  courseTitle: string;
  instructor: string;
  purchaseDate: string;
  amount: number;
  paymentMethod: string;
  status: string;
  invoiceUrl: string;
  courseUrl: string;
}

interface PurchaseCardProps {
  purchase: Purchase;
  getStatusBadge: (status: string) => JSX.Element;
}

const PurchaseCard = ({ purchase, getStatusBadge }: PurchaseCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{purchase.courseTitle}</h3>
          {getStatusBadge(purchase.status)}
        </div>
        <p className="text-sm text-gray-600 mb-1">By {purchase.instructor}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(purchase.purchaseDate).toLocaleDateString()}
          </span>
          <span>{purchase.paymentMethod}</span>
          <span className="font-semibold">${purchase.amount}</span>
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        {purchase.status === 'completed' && (
          <Button size="sm" variant="outline" asChild>
            <Link to={purchase.courseUrl}>
              <Eye className="w-4 h-4 mr-1" />
              View Course
            </Link>
          </Button>
        )}
        <Button size="sm" variant="outline">
          <Download className="w-4 h-4 mr-1" />
          Invoice
        </Button>
      </div>
    </div>
  );
};

export default PurchaseCard;
