
import React from 'react';
import { Star, Award, Users, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import CourseContentSection from '../CourseContentSection';

interface OverviewTabProps {
  course: any;
  whatYoullLearn: string[];
  courseContent: any[];
  requirements: string[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  course,
  whatYoullLearn,
  courseContent,
  requirements
}) => {
  return (
    <div className="space-y-8">
      {/* What you'll learn */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {whatYoullLearn.map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-4 h-4 text-green-600 mt-0.5">✓</div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CourseContentSection courseContent={courseContent} />

      {/* Requirements */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Requirements</h2>
        <ul className="space-y-2">
          {requirements.map((req, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2"></span>
              <span className="text-gray-700">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructor */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Instructor</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{course.instructor.name}</h3>
                <p className="text-gray-600 mb-4">{course.instructor.title}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{course.instructor.rating} Instructor Rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>{course.instructor.reviewCount.toLocaleString()} Reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{course.instructor.students.toLocaleString()} Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>{course.instructor.courses} Courses</span>
                  </div>
                </div>
                
                <p className="text-gray-700">{course.instructor.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
