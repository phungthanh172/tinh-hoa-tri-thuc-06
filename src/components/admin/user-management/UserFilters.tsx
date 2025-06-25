
import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UserFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
}

const UserFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter
}: UserFiltersProps) => {
  
  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setRoleFilter('all');
    toast.success('Filters reset successfully');
    console.log('User filters reset');
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      console.log(`Searching users with term: ${value}`);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    console.log(`Status filter changed to: ${value}`);
    toast.success(`Showing ${value === 'all' ? 'all' : value} users`);
  };

  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
    console.log(`Role filter changed to: ${value}`);
    toast.success(`Showing ${value === 'all' ? 'all roles' : value + 's'}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={handleStatusChange}>
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
      <Select value={roleFilter} onValueChange={handleRoleChange}>
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
      <Button variant="outline" onClick={handleReset} className="flex items-center space-x-2">
        <RefreshCw className="w-4 h-4" />
        <span>Reset</span>
      </Button>
    </div>
  );
};

export default UserFilters;
