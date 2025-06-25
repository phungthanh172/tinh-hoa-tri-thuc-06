
import React from 'react';
import { Download, RefreshCw, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SystemActionsProps {
  onSystemAction: (action: string) => void;
}

const SystemActions = ({ onSystemAction }: SystemActionsProps) => {
  const handleSystemAction = async (action: string) => {
    console.log(`Executing system action: ${action}`);
    
    switch (action) {
      case 'backup':
        toast.loading('Creating system backup...', { id: 'backup' });
        // Simulate backup process
        setTimeout(() => {
          toast.success('System backup created successfully', { id: 'backup' });
          onSystemAction(action);
        }, 2000);
        break;
        
      case 'cache-clear':
        toast.loading('Clearing cache...', { id: 'cache' });
        // Simulate cache clearing
        setTimeout(() => {
          toast.success('Cache cleared successfully', { id: 'cache' });
          onSystemAction(action);
        }, 1000);
        break;
        
      case 'security-scan':
        toast.loading('Running security scan...', { id: 'security' });
        // Simulate security scan
        setTimeout(() => {
          toast.success('Security scan completed - No threats detected', { id: 'security' });
          onSystemAction(action);
        }, 3000);
        break;
        
      case 'health-check':
        toast.loading('Performing health check...', { id: 'health' });
        // Simulate health check
        setTimeout(() => {
          toast.success('System health check passed - All services operational', { id: 'health' });
          onSystemAction(action);
        }, 1500);
        break;
        
      default:
        toast.error('Unknown system action');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          System Maintenance & Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            onClick={() => handleSystemAction('backup')}
            className="flex flex-col h-16 space-y-1"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs">Create Backup</span>
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleSystemAction('cache-clear')}
            className="flex flex-col h-16 space-y-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-xs">Clear Cache</span>
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleSystemAction('security-scan')}
            className="flex flex-col h-16 space-y-1"
          >
            <Shield className="w-4 h-4" />
            <span className="text-xs">Security Scan</span>
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleSystemAction('health-check')}
            className="flex flex-col h-16 space-y-1"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs">Health Check</span>
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">
              All system actions are logged and monitored for security purposes.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemActions;
