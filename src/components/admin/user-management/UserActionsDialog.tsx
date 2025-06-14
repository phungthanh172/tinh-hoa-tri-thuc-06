
import React from 'react';
import { MoreHorizontal, UserCheck, UserX, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  coursesCount?: number;
  studentsCount?: number;
  totalRevenue?: number;
  coursesEnrolled?: number;
  totalSpent?: number;
  suspensionReason?: string;
}

interface UserActionsDialogProps {
  user: User;
  onUserAction: (userId: number, action: string) => void;
}

const UserActionsDialog = ({ user, onUserAction }: UserActionsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Actions - {user.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onUserAction(user.id, 'view-profile')}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            View Full Profile
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onUserAction(user.id, 'send-message')}
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          {user.status === 'Active' ? (
            <Button 
              variant="destructive" 
              className="w-full justify-start"
              onClick={() => onUserAction(user.id, 'suspend')}
            >
              <UserX className="w-4 h-4 mr-2" />
              Suspend User
            </Button>
          ) : (
            <Button 
              variant="default" 
              className="w-full justify-start"
              onClick={() => onUserAction(user.id, 'reactivate')}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Reactivate User
            </Button>
          )}
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => onUserAction(user.id, 'change-role')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Change Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserActionsDialog;
