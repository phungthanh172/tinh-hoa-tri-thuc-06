
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, TrendingUp, Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const PersonalizedRecommendations = () => {
  const recommendationSections = [
    {
      title: "Trending Now",
      icon: TrendingUp,
      courses: [
        {
          id: 1,
          title: "AI & Machine Learning Fundamentals",
          instructor: "Dr. Sarah Chen",
          rating: 4.8,
          students: 45623,
          duration: "12 hours",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop",
          trending: true
        },
        {
          id: 2,
          title: "Blockchain Development Masterclass",
          instructor: "Alex Rodriguez",
          rating: 4.7,
          students: 23456,
          duration: "18 hours",
          price: 99.99,
          image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop",
          trending: true
        }
      ]
    },
    {
      title: "Recommended for You",
      icon: Heart,
      courses: [
        {
          id: 3,
          title: "Advanced React Patterns",
          instructor: "Emma Thompson",
          rating: 4.9,
          students: 67890,
          duration: "15 hours",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
          recommended: true
        },
        {
          id: 4,
          title: "TypeScript Mastery Course",
          instructor: "Michael Zhang",
          rating: 4.6,
          students: 34567,
          duration: "10 hours",
          price: 69.99,
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
          recommended: true
        }
      ]
    },
    {
      title: "Continue Learning",
      icon: BookOpen,
      courses: [
        {
          id: 5,
          title: "JavaScript Fundamentals",
          instructor: "Jonas Schmedtmann",
          rating: 4.7,
          students: 123456,
          duration: "25 hours",
          price: 84.99,
          progress: 65,
          image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop"
        }
      ]
    }
  ];

  const popularCategories = [
    { name: "Web Development", count: 1250, color: "bg-blue-500" },
    { name: "Data Science", count: 890, color: "bg-green-500" },
    { name: "Mobile Development", count: 670, color: "bg-purple-500" },
    { name: "Cloud Computing", count: 540, color: "bg-orange-500" },
    { name: "Cybersecurity", count: 430, color: "bg-red-500" },
    { name: "AI & Machine Learning", count: 380, color: "bg-indigo-500" }
  ];

  return (
    <div className="space-y-8">
      {/* Popular Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Popular Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {popularCategories.map((category) => (
              <Link
                key={category.name}
                to={`/search?category=${encodeURIComponent(category.name.toLowerCase())}`}
                className="block"
              >
                <div className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-12 h-12 ${category.color} rounded-lg mb-3 flex items-center justify-center`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} courses</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Sections */}
      {recommendationSections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <section.icon className="w-6 h-6 mr-2 text-purple-600" />
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.courses.map((course) => (
                <Link key={course.id} to={`/course/${course.id}`} className="block">
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      {course.trending && (
                        <Badge className="absolute top-2 left-2 bg-red-500">Trending</Badge>
                      )}
                      {course.recommended && (
                        <Badge className="absolute top-2 left-2 bg-purple-500">Recommended</Badge>
                      )}
                      {course.progress && (
                        <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 rounded">
                          <div className="flex items-center justify-between text-white text-xs p-2">
                            <span>{course.progress}% complete</span>
                            <div className="w-20 bg-gray-300 rounded-full h-1.5">
                              <div 
                                className="bg-purple-500 h-1.5 rounded-full" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                      
                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
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
                        <span className="text-lg font-bold text-purple-600">${course.price}</span>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          {course.progress ? 'Continue' : 'Enroll Now'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonalizedRecommendations;
