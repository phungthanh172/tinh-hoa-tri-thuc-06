
import React from 'react';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FinancialData {
  totalRevenue: number;
  platformRevenue: number;
  pendingPayouts: number;
  monthlyGrowth: number;
}

interface FinancialOverviewCardsProps {
  financialData: FinancialData;
}

const FinancialOverviewCards: React.FC<FinancialOverviewCardsProps> = ({ financialData }) => {
  return (
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
  );
};

export default FinancialOverviewCards;
