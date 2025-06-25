
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Building, Smartphone, Save, CheckCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const PayoutSettings = () => {
  const [payoutMethod, setPayoutMethod] = useState('paypal');
  const [autoPayouts, setAutoPayouts] = useState(true);
  const [minThreshold, setMinThreshold] = useState('100');
  const [isRequestingPayout, setIsRequestingPayout] = useState(false);
  const [isSavingMethod, setIsSavingMethod] = useState(false);
  const [currentBalance] = useState(1847.50);

  const payoutMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: CreditCard,
      description: 'Receive payments via PayPal',
      processingTime: '1-2 business days'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Direct bank deposit',
      processingTime: '3-5 business days'
    },
    {
      id: 'wise',
      name: 'Wise',
      icon: Smartphone,
      description: 'International transfers via Wise',
      processingTime: '1-3 business days'
    }
  ];

  const payoutHistory = [
    {
      id: 1,
      amount: 1250.00,
      method: 'PayPal',
      status: 'completed',
      date: '2024-01-15',
      reference: 'PO-2024-001'
    },
    {
      id: 2,
      amount: 890.50,
      method: 'Bank Transfer',
      status: 'pending',
      date: '2024-01-10',
      reference: 'PO-2024-002'
    },
    {
      id: 3,
      amount: 2100.00,
      method: 'PayPal',
      status: 'completed',
      date: '2024-01-05',
      reference: 'PO-2024-003'
    }
  ];

  const handleSavePayoutMethod = () => {
    setIsSavingMethod(true);
    console.log('Saving payout method:', payoutMethod);
    
    setTimeout(() => {
      setIsSavingMethod(false);
      toast.success('Payout method saved successfully');
    }, 1000);
  };

  const handleRequestPayout = () => {
    if (currentBalance < parseInt(minThreshold)) {
      toast.error(`Minimum payout threshold is $${minThreshold}`);
      return;
    }

    setIsRequestingPayout(true);
    console.log('Requesting payout for:', currentBalance);
    
    setTimeout(() => {
      setIsRequestingPayout(false);
      toast.success(`Payout request of $${currentBalance.toFixed(2)} submitted successfully`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payout Settings</h2>
        <Badge variant="outline" className="text-green-600">
          <CheckCircle className="w-4 h-4 mr-1" />
          Verified Account
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payout Method Setup */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {payoutMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      payoutMethod === method.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPayoutMethod(method.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <IconComponent className="w-5 h-5 mt-1 text-gray-600" />
                      <div className="flex-1">
                        <h3 className="font-medium">{method.name}</h3>
                        <p className="text-sm text-gray-600">{method.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Processing time: {method.processingTime}
                        </p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        payoutMethod === method.id ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                      }`}>
                        {payoutMethod === method.id && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Method-specific details */}
            {payoutMethod === 'paypal' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="paypal-email">PayPal Email</Label>
                  <Input
                    id="paypal-email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="mt-1"
                    defaultValue="instructor@example.com"
                  />
                </div>
              </div>
            )}

            {payoutMethod === 'bank' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="account-holder">Account Holder Name</Label>
                    <Input
                      id="account-holder"
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input
                      id="account-number"
                      placeholder="1234567890"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="routing-number">Routing Number</Label>
                    <Input
                      id="routing-number"
                      placeholder="021000021"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Input
                      id="bank-name"
                      placeholder="Bank of America"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {payoutMethod === 'wise' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="wise-email">Wise Account Email</Label>
                  <Input
                    id="wise-email"
                    type="email"
                    placeholder="your.email@wise.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="wise-currency">Preferred Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <Button className="w-full" onClick={handleSavePayoutMethod} disabled={isSavingMethod}>
              {isSavingMethod ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Payout Method
            </Button>
          </CardContent>
        </Card>

        {/* Payout Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-payouts">Automatic Payouts</Label>
                <p className="text-sm text-gray-600">
                  Automatically send payouts when threshold is reached
                </p>
              </div>
              <Switch
                id="auto-payouts"
                checked={autoPayouts}
                onCheckedChange={setAutoPayouts}
              />
            </div>

            <div>
              <Label htmlFor="min-threshold">Minimum Payout Threshold</Label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="min-threshold"
                  type="number"
                  value={minThreshold}
                  onChange={(e) => setMinThreshold(e.target.value)}
                  className="pl-8"
                  min="50"
                  max="1000"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum: $50, Maximum: $1,000
              </p>
            </div>

            <div>
              <Label htmlFor="payout-frequency">Payout Frequency</Label>
              <Select defaultValue="weekly">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Current Balance</h4>
              <div className="text-2xl font-bold text-green-600">${currentBalance.toFixed(2)}</div>
              <p className="text-sm text-gray-600">Available for payout</p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Request Payout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Payout</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Available Balance</p>
                      <p className="text-2xl font-bold text-green-600">${currentBalance.toFixed(2)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Payout Method</p>
                      <p className="font-medium">{payoutMethods.find(m => m.id === payoutMethod)?.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Processing Time</p>
                      <p className="font-medium">{payoutMethods.find(m => m.id === payoutMethod)?.processingTime}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1" 
                        onClick={handleRequestPayout}
                        disabled={isRequestingPayout || currentBalance < parseInt(minThreshold)}
                      >
                        {isRequestingPayout ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : null}
                        Request ${currentBalance.toFixed(2)}
                      </Button>
                    </div>
                    
                    {currentBalance < parseInt(minThreshold) && (
                      <p className="text-sm text-red-600">
                        Minimum threshold of ${minThreshold} not reached
                      </p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payoutHistory.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">${payout.amount.toFixed(2)}</span>
                    <Badge variant={payout.status === 'completed' ? 'default' : 'secondary'}>
                      {payout.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {payout.method} • {payout.date} • {payout.reference}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayoutSettings;
