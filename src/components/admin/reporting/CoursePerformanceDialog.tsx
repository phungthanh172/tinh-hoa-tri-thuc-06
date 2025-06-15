
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Star } from 'lucide-react';
import { Course } from '@/services/coursesApi';

interface CoursePerformanceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  courses: Course[];
}

const CoursePerformanceDialog: React.FC<CoursePerformanceDialogProps> = ({ isOpen, onOpenChange, courses }) => {
  const handlePrint = () => {
    window.print();
  };
  
  // Sort courses by a performance metric, e.g., mocked revenue
  const sortedCourses = [...courses].sort((a, b) => (b.studentsCount * b.price) - (a.studentsCount * a.price));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl print:shadow-none print:border-none">
        <DialogHeader>
          <DialogTitle>Course Performance Report</DialogTitle>
          <DialogDescription>
            An overview of course performance metrics. Sorted by estimated revenue.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead className="text-right">Students</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Est. Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell className="text-right">{course.studentsCount.toLocaleString()}</TableCell>
                  <TableCell className="text-right flex items-center justify-end">
                    {course.rating} <Star className="w-4 h-4 ml-1 text-yellow-500 fill-yellow-500" />
                  </TableCell>
                  <TableCell className="text-right">${(course.studentsCount * course.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter className="print:hidden">
          <Button variant="outline" onClick={handlePrint}>
            <Download className="w-4 h-4 mr-2" />
            Print / Save as PDF
          </Button>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CoursePerformanceDialog;
