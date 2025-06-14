
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CourseModerationHeader from './course-moderation/CourseModerationHeader';
import CourseModerationFilters from './course-moderation/CourseModerationFilters';
import CourseModerationTable from './course-moderation/CourseModerationTable';

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

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status.toLowerCase().includes(statusFilter.toLowerCase());
    
    return matchesSearch && matchesStatus;
  });

  const handleCourseAction = (courseId: number, action: string, reason?: string) => {
    console.log(`Performing ${action} on course ${courseId}`, reason ? { reason } : {});
  };

  return (
    <Card>
      <CardHeader>
        <CourseModerationHeader />
      </CardHeader>
      <CardContent>
        <CourseModerationFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        <CourseModerationTable
          courses={filteredCourses}
          onCourseAction={handleCourseAction}
        />
      </CardContent>
    </Card>
  );
};

export default CourseModeration;
