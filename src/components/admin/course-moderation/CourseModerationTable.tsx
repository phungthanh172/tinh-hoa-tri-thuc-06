
import React from 'react';
import { Eye, CheckCircle, XCircle, AlertTriangle, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

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

  return (
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
          {courses.map((course) => (
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
  );
};

export default CourseModerationTable;
