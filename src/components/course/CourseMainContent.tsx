
import React from 'react';
import { Check, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import CourseContentSection from './CourseContentSection';

interface CourseMainContentProps {
  course: any;
  whatYoullLearn: string[];
  courseContent: any[];
  requirements: string[];
  reviews: any[];
}

const CourseMainContent: React.FC<CourseMainContentProps> = ({
  course,
  whatYoullLearn,
  courseContent,
  requirements,
  reviews
}) => {
  const ratingDistribution = [
    { stars: 5, percentage: 70, count: 203220 },
    { stars: 4, percentage: 18, count: 52090 },
    { stars: 3, percentage: 8, count: 23156 },
    { stars: 2, percentage: 3, count: 8687 },
    { stars: 1, percentage: 1, count: 2303 }
  ];

  return (
    <div className="space-y-8">
      {/* What you'll learn */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl">What you'll learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {whatYoullLearn.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course content */}
      <CourseContentSection courseContent={courseContent} />

      {/* Requirements */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Requirements</h2>
        <ul className="space-y-2">
          {requirements.map((requirement, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>{requirement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <div className="prose max-w-none">
          <p className="mb-4">{course.description}</p>
          <p className="mb-4">
            This course is perfect for anyone who wants to learn JavaScript from scratch, as well as for developers who want to deepen their understanding of the language. We'll start with the absolute basics and work our way up to advanced topics.
          </p>
          <p>
            You'll learn not just the syntax, but also how to think like a developer and solve problems efficiently. By the end of this course, you'll be confident in your JavaScript skills and ready to tackle real-world projects.
          </p>
        </div>
      </div>

      {/* Instructor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Instructor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-600">{course.instructor.name}</h3>
                <p className="text-gray-600 mb-2">{course.instructor.title}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-orange-400 mr-1" />
                    <span>{course.instructor.rating} Instructor Rating</span>
                  </div>
                  <div>
                    <span className="font-semibold">{course.instructor.reviewCount.toLocaleString()}</span> Reviews
                  </div>
                  <div>
                    <span className="font-semibold">{course.instructor.students.toLocaleString()}</span> Students
                  </div>
                  <div>
                    <span className="font-semibold">{course.instructor.courses}</span> Courses
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700">{course.instructor.bio}</p>
          </div>
        </CardContent>
      </Card>

      {/* Student feedback */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Student feedback</h2>
        
        {/* Rating Summary */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-6xl font-bold text-orange-500 mb-2">{course.rating}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600">Course Rating</p>
              </div>
              
              <div className="space-y-2">
                {ratingDistribution.map((rating) => (
                  <div key={rating.stars} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-20">
                      <Star className="w-4 h-4 text-orange-400 fill-current" />
                      <span className="text-sm">{rating.stars}</span>
                    </div>
                    <Progress value={rating.percentage} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600 w-16">{rating.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-orange-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseMainContent;
