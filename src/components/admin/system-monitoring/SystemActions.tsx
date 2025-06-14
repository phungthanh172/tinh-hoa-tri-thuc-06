
import React from 'react';
import { Download, RefreshCw, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SystemActionsProps {
  onSystemAction: (action: string) => void;
}

const SystemActions = ({ onSystemAction }: SystemActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Maintenance & Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            onClick={() => onSystemAction('backup')}
          >
            <Download className="w-4 h-4 mr-2" />
            Create Backup
          </Button>
          <Button 
            variant="outline"
            onClick={() => onSystemAction('cache-clear')}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>
          <Button 
            variant="outline"
            onClick={() => onSystemAction('security-scan')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Security Scan
          </Button>
          <Button 
            variant="outline"
            onClick={() => onSystemAction('health-check')}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Health Check
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemActions;
