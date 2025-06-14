
import React, { useState } from 'react';
import { Filter, Star, Clock, Users, BookOpen, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    level: [],
    duration: [],
    rating: [],
    price: []
  });

  const courses = [
    {
      id: 1,
      title: "The Complete JavaScript Course 2024: From Zero to Expert!",
      instructor: "Jonas Schmedtmann",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      rating: 4.7,
      reviewCount: 89456,
      studentsCount: 756843,
      price: 84.99,
      originalPrice: 199.99,
      duration: "69 total hours",
      lectures: 320,
      level: "All Levels",
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop",
      bestseller: true,
      lastUpdated: "11/2023"
    },
    {
      id: 2,
      title: "React - The Complete Guide 2024 (incl. Next.js, Redux)",
      instructor: "Maximilian Schwarzmüller", 
      instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      rating: 4.6,
      reviewCount: 52341,
      studentsCount: 234567,
      price: 89.99,
      originalPrice: 199.99,
      duration: "48.5 total hours",
      lectures: 835,
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      bestseller: true,
      lastUpdated: "12/2023"
    },
    {
      id: 3,
      title: "Python for Data Science and Machine Learning Bootcamp",
      instructor: "Jose Portilla",
      instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      rating: 4.5,
      reviewCount: 78234,
      studentsCount: 445632,
      price: 79.99,
      originalPrice: 189.99,
      duration: "25 total hours",
      lectures: 165,
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
      bestseller: false,
      lastUpdated: "10/2023"
    }
  ];

  const filterOptions = {
    ratings: [
      { label: "4.5 & up", value: "4.5", count: 1234 },
      { label: "4.0 & up", value: "4.0", count: 2345 },
      { label: "3.5 & up", value: "3.5", count: 3456 },
      { label: "3.0 & up", value: "3.0", count: 4567 }
    ],
    duration: [
      { label: "0-1 Hour", value: "0-1", count: 567 },
      { label: "1-3 Hours", value: "1-3", count: 1234 },
      { label: "3-6 Hours", value: "3-6", count: 2345 },
      { label: "6-17 Hours", value: "6-17", count: 3456 },
      { label: "17+ Hours", value: "17+", count: 4567 }
    ],
    level: [
      { label: "Beginner", value: "beginner", count: 2345 },
      { label: "Intermediate", value: "intermediate", count: 3456 },
      { label: "Expert", value: "expert", count: 1234 },
      { label: "All Levels", value: "all", count: 5678 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-gray-600">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <span className="mx-2">/</span>
            <span>Development</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Web Development</span>
          </div>
          <h1 className="text-3xl font-bold mt-2">Web Development Courses</h1>
          <p className="text-gray-600 mt-1">Choose from 213,000 online courses with new additions published every month</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-80 hidden lg:block">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Filter className="w-5 h-5 text-gray-600" />
              </div>

              {/* Ratings Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Ratings</h4>
                <div className="space-y-3">
                  {filterOptions.ratings.map((rating) => (
                    <div key={rating.value} className="flex items-center space-x-3">
                      <Checkbox id={`rating-${rating.value}`} />
                      <label htmlFor={`rating-${rating.value}`} className="flex items-center space-x-2 text-sm cursor-pointer">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(parseFloat(rating.value)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span>{rating.label}</span>
                        <span className="text-gray-500">({rating.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Video Duration</h4>
                <div className="space-y-3">
                  {filterOptions.duration.map((duration) => (
                    <div key={duration.value} className="flex items-center space-x-3">
                      <Checkbox id={`duration-${duration.value}`} />
                      <label htmlFor={`duration-${duration.value}`} className="flex items-center justify-between w-full text-sm cursor-pointer">
                        <span>{duration.label}</span>
                        <span className="text-gray-500">({duration.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Level</h4>
                <div className="space-y-3">
                  {filterOptions.level.map((level) => (
                    <div key={level.value} className="flex items-center space-x-3">
                      <Checkbox id={`level-${level.value}`} />
                      <label htmlFor={`level-${level.value}`} className="flex items-center justify-between w-full text-sm cursor-pointer">
                        <span>{level.label}</span>
                        <span className="text-gray-500">({level.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                213,000 results for "web development"
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by</span>
                <Button variant="outline" className="flex items-center space-x-2">
                  <span>Most Popular</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Course Grid */}
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="flex">
                    <div className="w-64 h-36">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <Link to={`/course/${course.id}`}>
                            <h3 className="text-lg font-semibold mb-2 hover:text-purple-600 cursor-pointer line-clamp-2">
                              {course.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            Learn modern JavaScript from the beginning! Classes, arrow functions, promises, async/await, ES6+ and way more.
                          </p>
                          <div className="flex items-center space-x-2 mb-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={course.instructorAvatar} />
                              <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-700">{course.instructor}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-500 font-semibold">{course.rating}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span>({course.reviewCount.toLocaleString()})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{course.studentsCount.toLocaleString()} students</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.lectures} lectures</span>
                            </div>
                            <Badge variant="secondary">{course.level}</Badge>
                          </div>
                        </div>
                        <div className="text-right pl-4">
                          {course.bestseller && (
                            <Badge className="bg-yellow-400 text-yellow-900 mb-2">
                              Bestseller
                            </Badge>
                          )}
                          <div className="mb-2">
                            <span className="text-2xl font-bold">${course.price}</span>
                            <div className="text-sm text-gray-500 line-through">${course.originalPrice}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
