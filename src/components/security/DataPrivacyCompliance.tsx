
import React, { useState } from 'react';
import { Shield, Download, Trash2, Eye, Settings, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PrivacySettings {
  emailNotifications: boolean;
  marketingEmails: boolean;
  analyticsTracking: boolean;
  dataSharing: boolean;
  cookieConsent: boolean;
}

interface DataExportRequest {
  id: string;
  requestDate: Date;
  status: 'pending' | 'processing' | 'ready' | 'completed';
  downloadUrl?: string;
}

const DataPrivacyCompliance: React.FC = () => {
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    emailNotifications: true,
    marketingEmails: false,
    analyticsTracking: true,
    dataSharing: false,
    cookieConsent: true
  });

  const [exportRequest, setExportRequest] = useState<DataExportRequest | null>(null);
  const [showDeletionConfirm, setShowDeletionConfirm] = useState(false);

  const handleSettingChange = (key: keyof PrivacySettings, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`Privacy setting updated: ${key} = ${value}`);
  };

  const handleDataExportRequest = () => {
    const newRequest: DataExportRequest = {
      id: `export_${Date.now()}`,
      requestDate: new Date(),
      status: 'pending'
    };
    setExportRequest(newRequest);
    console.log('Data export requested:', newRequest);
  };

  const handleAccountDeletion = () => {
    console.log('Account deletion requested');
    setShowDeletionConfirm(false);
    // In real implementation, this would trigger account deletion process
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Data Privacy & Compliance</span>
            <Badge className="bg-green-100 text-green-800">GDPR/CCPA Compliant</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="privacy-settings">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="privacy-settings">Privacy Settings</TabsTrigger>
              <TabsTrigger value="data-export">Data Export</TabsTrigger>
              <TabsTrigger value="data-deletion">Data Deletion</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Info</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy-settings" className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Control how your personal data is used and processed. Changes take effect immediately.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive important updates about your courses and account</p>
                  </div>
                  <Switch
                    checked={privacySettings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Marketing Communications</h4>
                    <p className="text-sm text-gray-600">Receive promotional emails and course recommendations</p>
                  </div>
                  <Switch
                    checked={privacySettings.marketingEmails}
                    onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Analytics & Usage Tracking</h4>
                    <p className="text-sm text-gray-600">Help us improve the platform by sharing anonymous usage data</p>
                  </div>
                  <Switch
                    checked={privacySettings.analyticsTracking}
                    onCheckedChange={(checked) => handleSettingChange('analyticsTracking', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Data Sharing with Partners</h4>
                    <p className="text-sm text-gray-600">Share anonymized data with educational partners</p>
                  </div>
                  <Switch
                    checked={privacySettings.dataSharing}
                    onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">Cookie Consent</h4>
                    <p className="text-sm text-gray-600">Allow non-essential cookies for enhanced experience</p>
                  </div>
                  <Switch
                    checked={privacySettings.cookieConsent}
                    onCheckedChange={(checked) => handleSettingChange('cookieConsent', checked)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data-export" className="space-y-4">
              <Alert>
                <Download className="h-4 w-4" />
                <AlertDescription>
                  Request a copy of all your personal data. This includes your profile, course progress, and activity history.
                </AlertDescription>
              </Alert>

              {exportRequest ? (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data Export Request</h4>
                        <p className="text-sm text-gray-600">
                          Requested: {exportRequest.requestDate.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={exportRequest.status === 'ready' ? 'default' : 'secondary'}>
                        {exportRequest.status}
                      </Badge>
                    </div>
                    {exportRequest.status === 'ready' && exportRequest.downloadUrl && (
                      <Button className="mt-4" onClick={() => window.open(exportRequest.downloadUrl)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download Data
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center space-y-4">
                  <Eye className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="font-medium">Request Your Data</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get a comprehensive export of all your personal data stored on our platform
                    </p>
                    <Button onClick={handleDataExportRequest}>Request Data Export</Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="data-deletion" className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Warning:</strong> Account deletion is permanent and cannot be undone. All your course progress, certificates, and data will be permanently deleted.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">What will be deleted:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Your profile and account information</li>
                    <li>• Course progress and completion records</li>
                    <li>• Certificates and achievements</li>
                    <li>• Notes and bookmarks</li>
                    <li>• Communication history</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">What will be retained:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Anonymous usage statistics (required by law)</li>
                    <li>• Financial transaction records (7 years)</li>
                    <li>• Legal compliance records</li>
                  </ul>
                </div>

                {!showDeletionConfirm ? (
                  <Button 
                    variant="destructive" 
                    onClick={() => setShowDeletionConfirm(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete My Account
                  </Button>
                ) : (
                  <div className="space-y-4 p-4 border-2 border-red-200 rounded-lg bg-red-50">
                    <h4 className="font-medium text-red-800">Confirm Account Deletion</h4>
                    <p className="text-sm text-red-700">
                      Are you absolutely sure? This action cannot be undone.
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="destructive" onClick={handleAccountDeletion}>
                        Yes, Delete My Account
                      </Button>
                      <Button variant="outline" onClick={() => setShowDeletionConfirm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>GDPR Compliance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600">
                      We comply with the General Data Protection Regulation (GDPR) and ensure:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Lawful basis for processing your data</li>
                      <li>• Right to access, rectify, and delete your data</li>
                      <li>• Data portability and export capabilities</li>
                      <li>• Clear consent mechanisms</li>
                      <li>• Privacy by design and default</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>CCPA Compliance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600">
                      We comply with the California Consumer Privacy Act (CCPA) and provide:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Right to know what personal information is collected</li>
                      <li>• Right to delete personal information</li>
                      <li>• Right to opt-out of sale of personal information</li>
                      <li>• Right to non-discrimination</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Data Protection Measures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Technical Safeguards</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• End-to-end encryption</li>
                          <li>• Secure data centers</li>
                          <li>• Regular security audits</li>
                          <li>• Access controls</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Organizational Measures</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Staff training programs</li>
                          <li>• Data protection policies</li>
                          <li>• Incident response procedures</li>
                          <li>• Regular compliance reviews</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPrivacyCompliance;
