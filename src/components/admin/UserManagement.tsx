
import React, { useState } from 'react';
import { UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserFilters from './user-management/UserFilters';
import UsersTable from './user-management/UsersTable';
import { User } from './user-management/UserActionsDialog';

const UserManagement = () => {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      role: "Instructor",
      status: "Active",
      joinDate: "2024-01-15",
      coursesCount: 3,
      studentsCount: 156,
      totalRevenue: 2450.50
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "Student",
      status: "Active",
      joinDate: "2024-02-20",
      coursesEnrolled: 5,
      totalSpent: 299.97
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.w@email.com",
      role: "Instructor",
      status: "Suspended",
      joinDate: "2023-11-10",
      coursesCount: 1,
      studentsCount: 23,
      suspensionReason: "Content policy violation"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleUserAction = (userId: number, action: string) => {
    console.log(`Performing ${action} on user ${userId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>User Management</span>
          <Button variant="outline">
            <UserCheck className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UserFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />
        <UsersTable users={filteredUsers} onUserAction={handleUserAction} />
      </CardContent>
    </Card>
  );
};

export default UserManagement;
