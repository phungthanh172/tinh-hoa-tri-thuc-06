
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  nextLesson: string;
  thumbnail: string;
  lastAccessed: string;
}

interface CoursesTabProps {
  enrolledCourses: Course[];
}

const CoursesTab = ({ enrolledCourses }: CoursesTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {enrolledCourses.map((course) => (
        <Card key={course.id} className="hover:shadow-lg transition-shadow">
          <div className="relative">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <Badge className="absolute top-2 right-2 bg-white text-gray-800">
              {course.progress}% Complete
            </Badge>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-2">By {course.instructor}</p>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
              <span>{course.duration}</span>
            </div>
            <Progress value={course.progress} className="mb-3" />
            <div className="flex gap-2">
              <Button size="sm" className="flex-1" asChild>
                <Link to={`/course/${course.id}/learn`}>Continue Learning</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link to={`/course/${course.id}`}>Course Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CoursesTab;
