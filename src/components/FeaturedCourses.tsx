
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users } from 'lucide-react';

const FeaturedCourses = () => {
  const courses = [
    {
      id: 1,
      title: "The Complete JavaScript Course 2024",
      instructor: "Jonas Schmedtmann",
      rating: 4.9,
      students: 120000,
      duration: "69 hours",
      price: "$89.99",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "React - The Complete Guide",
      instructor: "Maximilian Schwarzmüller",
      rating: 4.8,
      students: 95000,
      duration: "48 hours",
      price: "$79.99",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Node.js Complete Developer Course",
      instructor: "Andrew Mead",
      rating: 4.7,
      students: 80000,
      duration: "35 hours",
      price: "$69.99",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular courses, carefully selected to help you master the skills that matter most in today's tech industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-2 line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">{course.price}</span>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
