
import React from 'react';
import { Star, Users, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import CourseBreadcrumbs from './CourseBreadcrumbs';

interface CourseHeroProps {
  course: {
    title: string;
    subtitle: string;
    rating: number;
    reviewCount: number;
    studentsCount: number;
    instructor: {
      name: string;
    };
    lastUpdated: string;
    language: string;
    bestseller?: boolean;
    categories: string[];
  };
}

const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  return (
    <div className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseBreadcrumbs categories={course.categories} />

            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl mb-6">{course.subtitle}</p>
            
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 font-semibold">{course.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                    />
                  ))}
                </div>
                <span className="text-purple-400">({course.reviewCount.toLocaleString()} ratings)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.studentsCount.toLocaleString()} students</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <span>Created by</span>
              <Link to="#" className="text-purple-400 hover:underline">{course.instructor.name}</Link>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>Last updated {course.lastUpdated}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>{course.language}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;
