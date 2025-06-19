
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BarChart3, Settings, Plus, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const ThirdPartyIntegrations = () => {
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [trackingId, setTrackingId] = useState('');

  const integrations = [
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track user behavior, conversions, and detailed site analytics',
      icon: '📊',
      status: 'connected',
      trackingId: 'GA-XXXX-XXXX-X',
      features: ['User Tracking', 'Conversion Goals', 'Custom Events', 'E-commerce Tracking'],
      lastSync: '2024-01-23 14:30'
    },
    {
      id: 'mixpanel',
      name: 'Mixpanel',
      description: 'Advanced product analytics and user journey tracking',
      icon: '🔍',
      status: 'disconnected',
      trackingId: null,
      features: ['Event Tracking', 'Funnel Analysis', 'Cohort Analysis', 'A/B Testing'],
      lastSync: null
    },
    {
      id: 'amplitude',
      name: 'Amplitude',
      description: 'Product intelligence and behavioral analytics platform',
      icon: '📈',
      status: 'connected',
      trackingId: 'AMP-XXXX-XXXX',
      features: ['User Behavior', 'Retention Analysis', 'Revenue Analytics', 'Predictive Analytics'],
      lastSync: '2024-01-23 12:15'
    },
    {
      id: 'hotjar',
      name: 'Hotjar',
      description: 'Heatmaps, session recordings, and user feedback',
      icon: '🔥',
      status: 'disconnected',
      trackingId: null,
      features: ['Heatmaps', 'Session Recordings', 'User Polls', 'Feedback Widgets'],
      lastSync: null
    },
    {
      id: 'segment',
      name: 'Segment',
      description: 'Customer data platform for unified analytics',
      icon: '🔄',
      status: 'connected',
      trackingId: 'SEG-XXXX-XXXX',
      features: ['Data Integration', 'Real-time Streaming', 'Audience Builder', 'Warehouse Sync'],
      lastSync: '2024-01-23 15:45'
    },
    {
      id: 'tableau',
      name: 'Tableau',
      description: 'Business intelligence and advanced data visualization',
      icon: '📊',
      status: 'disconnected',
      trackingId: null,
      features: ['Data Visualization', 'Dashboard Creation', 'Advanced Analytics', 'Report Sharing'],
      lastSync: null
    }
  ];

  const handleConnect = (integrationId: string) => {
    setSelectedIntegration(integrationId);
    setIsConfigDialogOpen(true);
  };

  const handleSaveIntegration = () => {
    if (!apiKey && !trackingId) {
      toast.error('Please provide required credentials');
      return;
    }
    
    toast.success('Integration configured successfully');
    setIsConfigDialogOpen(false);
    setApiKey('');
    setTrackingId('');
    setSelectedIntegration('');
  };

  const handleDisconnect = (integrationId: string) => {
    toast.success('Integration disconnected');
  };

  const handleSync = (integrationId: string) => {
    toast.success('Data sync initiated');
  };

  const selectedIntegrationData = integrations.find(i => i.id === selectedIntegration);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Third-Party Analytics</h2>
          <p className="text-gray-600">Connect external analytics tools for deeper insights</p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {integrations.filter(i => i.status === 'connected').length} Connected
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className={`transition-all hover:shadow-md ${integration.status === 'connected' ? 'border-green-200' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {integration.status === 'connected' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                    {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                  </Badge>
                </div>
                
                {integration.trackingId && (
                  <div>
                    <span className="text-sm font-medium">Tracking ID</span>
                    <p className="text-sm text-gray-600 font-mono">{integration.trackingId}</p>
                  </div>
                )}
                
                {integration.lastSync && (
                  <div>
                    <span className="text-sm font-medium">Last Sync</span>
                    <p className="text-sm text-gray-600">{integration.lastSync}</p>
                  </div>
                )}

                <div>
                  <span className="text-sm font-medium">Features</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {integration.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {integration.features.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{integration.features.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSync(integration.id)}
                        className="flex-1"
                      >
                        Sync Data
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleConnect(integration.id)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDisconnect(integration.id)}
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleConnect(integration.id)}
                      className="flex-1"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Configure {selectedIntegrationData?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                {selectedIntegrationData?.description}
              </p>
            </div>

            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
              />
            </div>
            
            <div>
              <Label htmlFor="trackingId">Tracking ID</Label>
              <Input
                id="trackingId"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking ID"
              />
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-yellow-700 font-medium">Security Note</p>
                  <p className="text-xs text-yellow-600 mt-1">
                    API keys are encrypted and stored securely. Never share your credentials.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSaveIntegration} className="flex-1">
                Save Configuration
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsConfigDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThirdPartyIntegrations;
