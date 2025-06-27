
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';
import PurchaseCard from './purchase/PurchaseCard';
import RefundCard from './purchase/RefundCard';
import StatsCards from './purchase/StatsCards';

const PurchaseHistory = () => {
  const [activeTab, setActiveTab] = useState('purchases');

  const purchases = [
    {
      id: 'PUR-001',
      courseTitle: "The Complete JavaScript Course 2024",
      instructor: "Jonas Schmedtmann",
      purchaseDate: "2024-12-15",
      amount: 84.99,
      paymentMethod: "Credit Card ****1234",
      status: "completed",
      invoiceUrl: "#",
      courseUrl: "/course/1"
    },
    {
      id: 'PUR-002',
      courseTitle: "React - The Complete Guide 2024",
      instructor: "Maximilian Schwarzmüller",
      purchaseDate: "2024-12-10",
      amount: 89.99,
      paymentMethod: "PayPal",
      status: "completed",
      invoiceUrl: "#",
      courseUrl: "/course/2"
    },
    {
      id: 'PUR-003',
      courseTitle: "Python for Data Science",
      instructor: "Jose Portilla",
      purchaseDate: "2024-12-08",
      amount: 74.99,
      paymentMethod: "Credit Card ****5678",
      status: "refunded",
      invoiceUrl: "#",
      courseUrl: "/course/3"
    }
  ];

  const refundRequests = [
    {
      id: 'REF-001',
      courseTitle: "Advanced Node.js Development",
      purchaseId: 'PUR-004',
      requestDate: "2024-12-18",
      amount: 99.99,
      reason: "Course content not as expected",
      status: "pending",
      estimatedProcessing: "3-5 business days"
    },
    {
      id: 'REF-002',
      courseTitle: "Vue.js Complete Course",
      purchaseId: 'PUR-005',
      requestDate: "2024-12-16",
      amount: 79.99,
      reason: "Technical issues with course videos",
      status: "approved",
      estimatedProcessing: "1-2 business days"
    }
  ];

  const invoices = [
    {
      id: 'INV-001',
      purchaseId: 'PUR-001',
      issueDate: "2024-12-15",
      amount: 84.99,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 'INV-002',
      purchaseId: 'PUR-002',
      issueDate: "2024-12-10",
      amount: 89.99,
      status: "paid",
      downloadUrl: "#"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      pending: { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      refunded: { variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
      approved: { variant: 'default' as const, className: 'bg-blue-100 text-blue-800' },
      paid: { variant: 'default' as const, className: 'bg-green-100 text-green-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant} className={config.className}>{status}</Badge>;
  };

  const totalSpent = purchases.reduce((total, purchase) => 
    purchase.status === 'completed' ? total + purchase.amount : total, 0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase History</h1>
        <p className="text-gray-600">Manage your course purchases, invoices, and refunds</p>
      </div>

      <StatsCards 
        totalSpent={totalSpent}
        totalPurchases={purchases.length}
        refundRequestsCount={refundRequests.length}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <PurchaseCard 
                    key={purchase.id} 
                    purchase={purchase} 
                    getStatusBadge={getStatusBadge} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Refund Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {refundRequests.map((refund) => (
                  <RefundCard 
                    key={refund.id} 
                    refund={refund} 
                    getStatusBadge={getStatusBadge} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoices & Receipts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold mb-1">Invoice {invoice.id}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Purchase: {invoice.purchaseId}</span>
                        <span>Date: {new Date(invoice.issueDate).toLocaleDateString()}</span>
                        <span className="font-semibold">${invoice.amount}</span>
                        {getStatusBadge(invoice.status)}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download PDF
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurchaseHistory;
