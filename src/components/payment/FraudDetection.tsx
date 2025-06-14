
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Shield, Eye, TrendingUp, Globe, CreditCard, Users, Clock } from 'lucide-react';

const FraudDetection = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const fraudAlerts = [
    {
      id: 'FRD-001',
      type: 'high-risk',
      title: 'Multiple Failed Payments',
      description: 'User attempted payment 5 times with different cards',
      timestamp: '2024-01-20 14:30:00',
      userEmail: 'suspicious@example.com',
      ipAddress: '192.168.1.100',
      location: 'Unknown Location',
      riskScore: 95,
      status: 'investigating',
      actions: ['Block User', 'Flag IP', 'Manual Review']
    },
    {
      id: 'FRD-002',
      type: 'medium-risk',
      title: 'Unusual Purchase Pattern',
      description: 'User purchased 10 courses within 1 hour',
      timestamp: '2024-01-20 13:15:00',
      userEmail: 'bulk.buyer@example.com',
      ipAddress: '203.0.113.45',
      location: 'New York, US',
      riskScore: 72,
      status: 'pending',
      actions: ['Verify Purchase', 'Contact User', 'Temporary Hold']
    },
    {
      id: 'FRD-003',
      type: 'low-risk',
      title: 'VPN Usage Detected',
      description: 'Payment made through VPN service',
      timestamp: '2024-01-20 12:45:00',
      userEmail: 'privacy.user@example.com',
      ipAddress: '198.51.100.22',
      location: 'VPN Exit Node',
      riskScore: 45,
      status: 'resolved',
      actions: ['Allow Payment', 'Add Note']
    }
  ];

  const fraudStats = {
    totalAlerts: fraudAlerts.length,
    highRiskAlerts: fraudAlerts.filter(a => a.type === 'high-risk').length,
    blockedTransactions: 12,
    falsePositives: 3,
    savingsFromPrevention: 2450.00
  };

  const riskFactors = [
    {
      factor: 'Multiple Failed Payments',
      weight: 'High',
      description: 'User attempting multiple payment methods',
      threshold: '3+ attempts',
      action: 'Block temporarily'
    },
    {
      factor: 'Geolocation Mismatch',
      weight: 'Medium',
      description: 'Payment location differs from registration',
      threshold: '>500 miles',
      action: 'Additional verification'
    },
    {
      factor: 'High-Value Purchases',
      weight: 'Medium',
      description: 'Unusually large purchase amount',
      threshold: '>$500',
      action: 'Manual review'
    },
    {
      factor: 'Velocity Checking',
      weight: 'High',
      description: 'Multiple purchases in short time',
      threshold: '>5 in 1 hour',
      action: 'Rate limiting'
    },
    {
      factor: 'Device Fingerprinting',
      weight: 'Low',
      description: 'Suspicious device characteristics',
      threshold: 'Risk score >70',
      action: 'Enhanced monitoring'
    }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'high-risk':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium-risk':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low-risk':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'investigating':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleTakeAction = (alertId, action) => {
    console.log(`Taking action "${action}" on alert ${alertId}`);
  };

  const filteredAlerts = filterStatus === 'all' 
    ? fraudAlerts 
    : fraudAlerts.filter(alert => alert.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold">{fraudStats.totalAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">{fraudStats.highRiskAlerts}</p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blocked</p>
                <p className="text-2xl font-bold">{fraudStats.blockedTransactions}</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">False Positives</p>
                <p className="text-2xl font-bold">{fraudStats.falsePositives}</p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Savings</p>
                <p className="text-2xl font-bold text-green-600">${fraudStats.savingsFromPrevention}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Fraud Alerts */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Fraud Alerts
            </CardTitle>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alerts</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id} className={`${getAlertColor(alert.type)} cursor-pointer hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5" />
                      <div>
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm opacity-80">{alert.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                      <span className={`font-bold ${getRiskScoreColor(alert.riskScore)}`}>
                        {alert.riskScore}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-600">User:</span>
                      <p className="font-medium">{alert.userEmail}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">IP Address:</span>
                      <p className="font-medium">{alert.ipAddress}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <p className="font-medium">{alert.location}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Time:</span>
                      <p className="font-medium">{alert.timestamp}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {alert.actions.map((action, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() => handleTakeAction(alert.id, action)}
                        className="text-xs"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Factors & Thresholds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{factor.factor}</h3>
                  <Badge className={
                    factor.weight === 'High' ? 'bg-red-100 text-red-800' :
                    factor.weight === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {factor.weight} Risk
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{factor.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Threshold:</span>
                    <p className="font-medium">{factor.threshold}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Action:</span>
                    <p className="font-medium">{factor.action}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Whitelist/Blacklist Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Whitelist Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="whitelist-email">Add Trusted Email</Label>
              <div className="flex space-x-2">
                <Input
                  id="whitelist-email"
                  placeholder="trusted@example.com"
                />
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Add
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Trusted Users:</p>
              <div className="space-y-1">
                {['admin@company.com', 'partner@trusted.com'].map((email, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="text-sm">{email}</span>
                    <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">Blacklist Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="blacklist-ip">Block IP Address</Label>
              <div className="flex space-x-2">
                <Input
                  id="blacklist-ip"
                  placeholder="192.168.1.100"
                />
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Block
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Blocked IPs:</p>
              <div className="space-y-1">
                {['192.168.1.100', '203.0.113.45'].map((ip, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                    <span className="text-sm">{ip}</span>
                    <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700">
                      Unblock
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FraudDetection;
