
import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Shield, Globe, DollarSign, Mail, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PlatformConfiguration = () => {
  const [platformSettings, setPlatformSettings] = useState({
    siteName: "EduPlatform",
    siteDescription: "Learn from the best instructors worldwide",
    maintenanceMode: false,
    userRegistration: true,
    courseApprovalRequired: true,
    commissionRate: 20,
    minPayoutAmount: 50,
    payoutSchedule: "monthly",
    maxCoursePrice: 500,
    minCoursePrice: 5,
    emailNotifications: true,
    pushNotifications: true,
    autoRefunds: false,
    maxRefundDays: 30
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.platform.com",
    smtpPort: "587",
    smtpUsername: "noreply@platform.com",
    smtpPassword: "********",
    fromName: "EduPlatform",
    fromEmail: "noreply@platform.com"
  });

  const handleSettingChange = (setting: string, value: any) => {
    setPlatformSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleEmailSettingChange = (setting: string, value: string) => {
    setEmailSettings(prev => ({ ...prev, [setting]: value }));
  };

  const saveSettings = () => {
    console.log('Saving platform settings...', platformSettings);
  };

  const saveEmailSettings = () => {
    console.log('Saving email settings...', emailSettings);
  };

  return (
    <div className="space-y-6">
      {/* General Platform Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            General Platform Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={platformSettings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Input
                id="siteDescription"
                value={platformSettings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Temporarily disable access to the platform</p>
              </div>
              <Switch
                checked={platformSettings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>User Registration</Label>
                <p className="text-sm text-gray-500">Allow new users to register</p>
              </div>
              <Switch
                checked={platformSettings.userRegistration}
                onCheckedChange={(checked) => handleSettingChange('userRegistration', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Course Approval Required</Label>
                <p className="text-sm text-gray-500">Require admin approval for new courses</p>
              </div>
              <Switch
                checked={platformSettings.courseApprovalRequired}
                onCheckedChange={(checked) => handleSettingChange('courseApprovalRequired', checked)}
              />
            </div>
          </div>

          <Button onClick={saveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save General Settings
          </Button>
        </CardContent>
      </Card>

      {/* Financial Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Financial Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="commissionRate">Platform Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                value={platformSettings.commissionRate}
                onChange={(e) => handleSettingChange('commissionRate', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="minPayoutAmount">Minimum Payout Amount ($)</Label>
              <Input
                id="minPayoutAmount"
                type="number"
                value={platformSettings.minPayoutAmount}
                onChange={(e) => handleSettingChange('minPayoutAmount', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="payoutSchedule">Payout Schedule</Label>
              <Select value={platformSettings.payoutSchedule} onValueChange={(value) => handleSettingChange('payoutSchedule', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="minCoursePrice">Minimum Course Price ($)</Label>
              <Input
                id="minCoursePrice"
                type="number"
                value={platformSettings.minCoursePrice}
                onChange={(e) => handleSettingChange('minCoursePrice', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="maxCoursePrice">Maximum Course Price ($)</Label>
              <Input
                id="maxCoursePrice"
                type="number"
                value={platformSettings.maxCoursePrice}
                onChange={(e) => handleSettingChange('maxCoursePrice', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Automatic Refunds</Label>
                <p className="text-sm text-gray-500">Automatically process eligible refunds</p>
              </div>
              <Switch
                checked={platformSettings.autoRefunds}
                onCheckedChange={(checked) => handleSettingChange('autoRefunds', checked)}
              />
            </div>
            <div>
              <Label htmlFor="maxRefundDays">Maximum Refund Period (days)</Label>
              <Input
                id="maxRefundDays"
                type="number"
                value={platformSettings.maxRefundDays}
                onChange={(e) => handleSettingChange('maxRefundDays', parseInt(e.target.value))}
              />
            </div>
          </div>

          <Button onClick={saveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Financial Settings
          </Button>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Email Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={emailSettings.smtpHost}
                onChange={(e) => handleEmailSettingChange('smtpHost', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                value={emailSettings.smtpPort}
                onChange={(e) => handleEmailSettingChange('smtpPort', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="smtpUsername">SMTP Username</Label>
              <Input
                id="smtpUsername"
                value={emailSettings.smtpUsername}
                onChange={(e) => handleEmailSettingChange('smtpUsername', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={emailSettings.smtpPassword}
                onChange={(e) => handleEmailSettingChange('smtpPassword', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fromName">From Name</Label>
              <Input
                id="fromName"
                value={emailSettings.fromName}
                onChange={(e) => handleEmailSettingChange('fromName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fromEmail">From Email</Label>
              <Input
                id="fromEmail"
                type="email"
                value={emailSettings.fromEmail}
                onChange={(e) => handleEmailSettingChange('fromEmail', e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={saveEmailSettings}>
              <Save className="w-4 h-4 mr-2" />
              Save Email Settings
            </Button>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Test Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Send email notifications to users</p>
              </div>
              <Switch
                checked={platformSettings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-500">Send browser push notifications</p>
              </div>
              <Switch
                checked={platformSettings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>
          </div>

          <Button onClick={saveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformConfiguration;
