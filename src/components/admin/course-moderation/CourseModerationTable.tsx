
import React, { useState } from 'react';
import { Eye, CheckCircle, XCircle, AlertTriangle, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Course {
  id: number;
  title: string;
  instructor: string;
  status: string;
  submitDate: string;
  category: string;
  price: number;
  studentsEnrolled: number;
  flagged: boolean;
  reports: number;
}

interface CourseModerationTableProps {
  courses: Course[];
  onCourseAction: (courseId: number, action: string, reason?: string) => void;
}

const CourseModerationTable = ({ courses, onCourseAction }: CourseModerationTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = courses.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status: string, flagged: boolean) => {
    if (flagged) return <Badge variant="destructive">Flagged</Badge>;
    
    switch (status) {
      case 'Approved':
        return <Badge variant="default">Approved</Badge>;
      case 'Pending Approval':
        return <Badge variant="secondary">Pending</Badge>;
      case 'Under Review':
        return <Badge variant="destructive">Under Review</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if needed
      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis1" />);
      }

      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis2" />);
      }

      // Show last page
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink 
              onClick={() => handlePageChange(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    return items;
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submit Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.category}</div>
                    </div>
                    {course.flagged && <Flag className="w-4 h-4 text-red-500" />}
                  </div>
                </TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>
                  {getStatusBadge(course.status, course.flagged)}
                  {course.reports > 0 && (
                    <div className="text-xs text-red-600 mt-1">
                      {course.reports} reports
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-sm">{course.submitDate}</TableCell>
                <TableCell>${course.price}</TableCell>
                <TableCell>{course.studentsEnrolled}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Moderate Course: {course.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Button 
                              variant="default"
                              onClick={() => onCourseAction(course.id, 'approve')}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => onCourseAction(course.id, 'reject')}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => onCourseAction(course.id, 'flag-review')}
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Flag for Review
                          </Button>
                          
                          <div>
                            <label className="text-sm font-medium">Moderation Notes</label>
                            <Textarea 
                              placeholder="Add notes about your decision..."
                              className="mt-1"
                            />
                          </div>
                          
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => onCourseAction(course.id, 'request-changes')}
                          >
                            Request Changes from Instructor
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            
            {renderPaginationItems()}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CourseModerationTable;
