
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Mail, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const UserManagement = () => {
  const [users] = useState([
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
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="instructor">Instructor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
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
              {filteredUsers.map((user) => (
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
                            onClick={() => handleUserAction(user.id, 'view-profile')}
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            View Full Profile
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start"
                            onClick={() => handleUserAction(user.id, 'send-message')}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                          {user.status === 'Active' ? (
                            <Button 
                              variant="destructive" 
                              className="w-full justify-start"
                              onClick={() => handleUserAction(user.id, 'suspend')}
                            >
                              <UserX className="w-4 h-4 mr-2" />
                              Suspend User
                            </Button>
                          ) : (
                            <Button 
                              variant="default" 
                              className="w-full justify-start"
                              onClick={() => handleUserAction(user.id, 'reactivate')}
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Reactivate User
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            className="w-full justify-start"
                            onClick={() => handleUserAction(user.id, 'change-role')}
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            Change Role
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
