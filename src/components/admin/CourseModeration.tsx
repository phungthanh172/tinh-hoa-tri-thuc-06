
import React, { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, AlertTriangle, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const CourseModeration = () => {
  const [courses] = useState([
    {
      id: 1,
      title: "Advanced JavaScript Concepts",
      instructor: "John Smith",
      status: "Pending Approval",
      submitDate: "2024-01-20",
      category: "Development",
      price: 79.99,
      studentsEnrolled: 0,
      flagged: false,
      reports: 0
    },
    {
      id: 2,
      title: "Complete Digital Marketing Guide",
      instructor: "Sarah Johnson",
      status: "Approved",
      submitDate: "2024-01-15",
      category: "Marketing",
      price: 99.99,
      studentsEnrolled: 234,
      flagged: false,
      reports: 0
    },
    {
      id: 3,
      title: "Questionable Content Course",
      instructor: "Mike Wilson",
      status: "Under Review",
      submitDate: "2024-01-18",
      category: "Business",
      price: 149.99,
      studentsEnrolled: 12,
      flagged: true,
      reports: 3
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status.toLowerCase().includes(statusFilter.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  const handleCourseAction = (courseId: number, action: string, reason?: string) => {
    console.log(`Performing ${action} on course ${courseId}`, reason ? { reason } : {});
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Course Moderation</span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Flag className="w-4 h-4 mr-2" />
              View Reports
            </Button>
            <Button variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Bulk Approve
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search courses by title or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending Approval</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="review">Under Review</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Courses Table */}
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
              {filteredCourses.map((course) => (
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
                                onClick={() => handleCourseAction(course.id, 'approve')}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                              <Button 
                                variant="destructive"
                                onClick={() => handleCourseAction(course.id, 'reject')}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => handleCourseAction(course.id, 'flag-review')}
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
                              onClick={() => handleCourseAction(course.id, 'request-changes')}
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
      </CardContent>
    </Card>
  );
};

export default CourseModeration;
