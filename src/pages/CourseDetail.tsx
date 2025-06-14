
import React, { useState } from 'react';
import { Play, Clock, Users, Star, Download, Globe, Award, Infinity, Calendar, ChevronDown, ChevronRight, Heart, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { Link, useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});

  const course = {
    id: 1,
    title: "The Complete JavaScript Course 2024: From Zero to Expert!",
    subtitle: "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!",
    instructor: {
      name: "Jonas Schmedtmann",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      title: "Web Developer, Designer, and Teacher",
      rating: 4.7,
      reviews: 890456,
      students: 1876543,
      courses: 5
    },
    rating: 4.7,
    reviewCount: 289456,
    studentsCount: 756843,
    price: 84.99,
    originalPrice: 199.99,
    duration: "69 total hours",
    lectures: 320,
    level: "All Levels",
    language: "English",
    subtitles: ["English", "Spanish", "French", "German"],
    lastUpdated: "11/2023",
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=450&fit=crop",
    bestseller: true,
    certificate: true,
    downloadable: 37,
    articles: 12,
    mobileAccess: true,
    lifetimeAccess: true
  };

  const curriculum = [
    {
      id: 1,
      title: "Course Introduction",
      lectures: 5,
      duration: "39min",
      preview: true,
      lessons: [
        { title: "Course Structure and Projects", duration: "12:14", preview: true },
        { title: "Watch Before You Start!", duration: "7:42", preview: false },
        { title: "Setting Up Our Code Editor", duration: "15:10", preview: true }
      ]
    },
    {
      id: 2,
      title: "JavaScript Fundamentals – Part 1",
      lectures: 22,
      duration: "5hr 13min",
      preview: false,
      lessons: [
        { title: "What is JavaScript?", duration: "13:56", preview: true },
        { title: "A Brief Introduction to JavaScript", duration: "8:17", preview: false },
        { title: "Linking a JavaScript File", duration: "6:47", preview: false }
      ]
    },
    {
      id: 3,
      title: "JavaScript Fundamentals – Part 2",
      lectures: 20,
      duration: "4hr 45min",
      preview: false,
      lessons: [
        { title: "Activating Strict Mode", duration: "7:26", preview: false },
        { title: "Functions", duration: "12:20", preview: false },
        { title: "Function Declarations vs. Expressions", duration: "11:31", preview: false }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <div className="text-sm text-purple-300 mb-4">
                <Link to="/" className="hover:text-white">Development</Link>
                <span className="mx-2">/</span>
                <Link to="/courses" className="hover:text-white">Web Development</Link>
                <span className="mx-2">/</span>
                <span>JavaScript</span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.subtitle}</p>

              <div className="flex items-center space-x-6 mb-6">
                {course.bestseller && (
                  <Badge className="bg-yellow-400 text-yellow-900 px-3 py-1">
                    Bestseller
                  </Badge>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 font-semibold">{course.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-purple-300">({course.reviewCount.toLocaleString()} ratings)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.studentsCount.toLocaleString()} students</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <span>Created by</span>
                <Link to="/profile" className="text-purple-300 hover:text-white underline">
                  {course.instructor.name}
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Last updated {course.lastUpdated}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>Subtitles: {course.subtitles.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Course Preview Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-30 transition-all duration-300">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-gray-900 ml-1" />
                    </div>
                  </button>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold">${course.price}</span>
                      <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                      <Badge variant="destructive" className="text-xs">58% off</Badge>
                    </div>
                    <p className="text-sm text-red-600 font-semibold mt-1">2 days left at this price!</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                      Add to cart
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                      Buy now
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-600 mb-4">30-Day Money-Back Guarantee</p>

                  <div className="space-y-3 text-sm">
                    <h4 className="font-semibold">This course includes:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration} on-demand video</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>{course.downloadable} downloadable resources</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Infinity className="w-4 h-4" />
                        <span>Full lifetime access</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>Access on mobile and TV</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4 mt-6 pt-6 border-t">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>Wishlist</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* What you'll learn */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Become an advanced, confident, and modern JavaScript developer from scratch",
                    "Build 6 beautiful real-world projects for your portfolio",
                    "Become job-ready by understanding how JavaScript really works",
                    "How to think and work like a developer: problem-solving, researching, workflows",
                    "JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, etc.",
                    "Modern ES6+ from the beginning: arrow functions, destructuring, spread operator, optional chaining (ES2020), etc."
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-4 h-4 text-green-600 mt-1">✓</div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course content */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Course content</h2>
                  <div className="text-sm text-gray-600">
                    {curriculum.length} sections • {curriculum.reduce((acc, section) => acc + section.lectures, 0)} lectures • 69h 30m total length
                  </div>
                </div>

                <div className="space-y-2">
                  {curriculum.map((section) => (
                    <div key={section.id} className="border rounded-lg">
                      <button 
                        onClick={() => toggleSection(section.id)}
                        className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          {expandedSections[section.id] ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                          <span className="font-semibold">{section.title}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {section.lectures} lectures • {section.duration}
                        </div>
                      </button>
                      
                      {expandedSections[section.id] && (
                        <div className="border-t">
                          {section.lessons.map((lesson, index) => (
                            <div key={index} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Play className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">{lesson.title}</span>
                                {lesson.preview && (
                                  <Badge variant="outline" className="text-xs">Preview</Badge>
                                )}
                              </div>
                              <span className="text-sm text-gray-600">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Instructor</h2>
                <div className="flex items-start space-x-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={course.instructor.avatar} />
                    <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link to="/profile" className="text-xl font-semibold text-purple-600 hover:underline">
                      {course.instructor.name}
                    </Link>
                    <p className="text-gray-600 mb-4">{course.instructor.title}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>{course.instructor.rating} Instructor Rating</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{course.instructor.students.toLocaleString()} Students</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4" />
                        <span>{course.instructor.reviews.toLocaleString()} Reviews</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>{course.instructor.courses} Courses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar - empty for now */}
          <div className="lg:col-span-1">
            {/* This space can be used for related courses, etc. */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
