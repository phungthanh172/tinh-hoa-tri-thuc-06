
import React from 'react';
import { Play, Heart, Share, Gift, Clock, FileText, Download, Smartphone, Infinity, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface CourseDetailSidebarProps {
  course: any;
}

const CourseDetailSidebar: React.FC<CourseDetailSidebarProps> = ({ course }) => {
  const navigate = useNavigate();

  const getIncludesIcon = (iconType: string) => {
    switch (iconType) {
      case 'video': return <Clock className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'download': return <Download className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'infinity': return <Infinity className="w-4 h-4" />;
      case 'certificate': return <Award className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleGoToCourse = () => {
    navigate(`/course/${course.id}/learn`);
  };

  // Check if course is paid (assuming price is 0 for free courses)
  const isPaidCourse = course.price > 0;

  return (
    <Card className="shadow-lg border border-gray-200 bg-white">
      <CardContent className="p-0">
        {/* Course Preview */}
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-t-lg">
            <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
              <Play className="w-6 h-6 text-gray-900 ml-1" />
            </button>
          </div>
          <div className="absolute top-4 right-4">
            <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
              <Heart className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 bg-white">
          {/* Price */}
          {isPaidCourse && (
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-black">${course.price}</span>
                <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                <Badge className="bg-red-100 text-red-800">
                  {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                </Badge>
              </div>
              <p className="text-sm text-red-600 font-medium">
                <Clock className="w-4 h-4 inline mr-1" />
                2 days left at this price!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {isPaidCourse ? (
              <>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold">
                  Add to cart
                </Button>
                <Button variant="outline" className="w-full py-3 text-lg font-semibold border-gray-900 text-gray-900 hover:bg-gray-50">
                  Buy now
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleGoToCourse}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
              >
                Go to Course
              </Button>
            )}
          </div>

          {/* Guarantee */}
          {isPaidCourse && (
            <p className="text-center text-sm text-gray-600">
              30-Day Money-Back Guarantee
            </p>
          )}

          {/* This course includes */}
          <div>
            <h3 className="font-semibold mb-3 text-black">This course includes:</h3>
            <ul className="space-y-2">
              {course.includes.map((item: any, index: number) => (
                <li key={index} className="flex items-center space-x-3 text-sm text-gray-700">
                  {getIncludesIcon(item.icon)}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Links */}
          <div className="flex justify-center space-x-6 pt-4 border-t border-gray-200">
            <button className="flex items-center space-x-1 text-purple-600 hover:underline">
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-1 text-purple-600 hover:underline">
              <Gift className="w-4 h-4" />
              <span>Gift this course</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Students</span>
              <span>{course.studentsCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Language</span>
              <span>{course.language}</span>
            </div>
            <div className="flex justify-between">
              <span>Level</span>
              <span>{course.level}</span>
            </div>
            <div className="flex justify-between">
              <span>Last updated</span>
              <span>{course.lastUpdated}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseDetailSidebar;
