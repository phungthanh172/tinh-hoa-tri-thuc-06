
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserActionsDialog, { User } from './UserActionsDialog';

interface UsersTableProps {
  users: User[];
  onUserAction: (userId: number, action: string) => void;
}

const UsersTable = ({ users, onUserAction }: UsersTableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.role === 'Instructor' ? 'default' : 'secondary'}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{user.joinDate}</TableCell>
              <TableCell className="text-sm">
                {user.role === 'Instructor' ? (
                  <div>
                    <div>{user.coursesCount} courses</div>
                    <div className="text-gray-500">{user.studentsCount} students</div>
                  </div>
                ) : (
                  <div>
                    <div>{user.coursesEnrolled} enrolled</div>
                    <div className="text-gray-500">${user.totalSpent}</div>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <UserActionsDialog user={user} onUserAction={onUserAction} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
