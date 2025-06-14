
import React, { useState } from 'react';
import { Star, Clock, Users, Play, Globe, Download, Trophy, Smartphone, Monitor, Award, ChevronDown, ChevronUp, Heart, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link, useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();

  const course = {
    id: 1,
    title: "The Complete JavaScript Course 2024: From Zero to Expert!",
    subtitle: "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!",
    instructor: {
      name: "Jonas Schmedtmann",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      title: "Web Developer, Designer, and Teacher",
      bio: "Hi, I'm Jonas! I have been identified as one of Udemy's Top Instructors and all my premium courses have earned the best-selling status for outstanding performance and student satisfaction.",
      rating: 4.7,
      reviewCount: 123456,
      students: 850000,
      courses: 5
    },
    rating: 4.7,
    reviewCount: 289456,
    studentsCount: 756843,
    price: 84.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=400&fit=crop",
    previewVideo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    lastUpdated: "11/2023",
    language: "English",
    duration: "69 total hours",
    lectures: 320,
    level: "All Levels",
    bestseller: true,
    categories: ["Development", "Web Development", "JavaScript"]
  };

  const whatYoullLearn = [
    "Become an advanced, confident, and modern JavaScript developer from scratch",
    "Build 6 beautiful real-world projects for your portfolio",
    "Become job-ready by understanding how JavaScript really works behind the scenes",
    "How to think and work like a developer: problem-solving, researching, workflows",
    "JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, etc.",
    "Modern ES6+ from the beginning: arrow functions, destructuring, spread operator, optional chaining (ES2020), etc.",
    "Modern OOP: Classes, constructors, prototypal inheritance, encapsulation, etc.",
    "Complex features like the 'this' keyword, higher-order functions, closures, etc."
  ];

  const courseContent = [
    {
      title: "Welcome, Welcome, Welcome!",
      lectures: 6,
      duration: "39min",
      lessons: [
        { title: "Course Structure and Projects", duration: "7:31", preview: true },
        { title: "Watch Before You Start!", duration: "4:07" },
        { title: "Setting Up Our Code Editor", duration: "11:30" }
      ]
    },
    {
      title: "JavaScript Fundamentals – Part 1",
      lectures: 25,
      duration: "7hr 4min",
      lessons: [
        { title: "Section Intro", duration: "1:15" },
        { title: "Hello World!", duration: "4:30" },
        { title: "A Brief Introduction to JavaScript", duration: "8:21" }
      ]
    }
  ];

  const requirements = [
    "No coding experience is necessary to take this course! I take you from beginner to expert!",
    "Any computer and OS will work — Windows, macOS or Linux. We will set up your text editor the course.",
    "A basic understanding of HTML and CSS is a plus, but not a must! The course includes an HTML and CSS crash course."
  ];

  const CourseContentItem = ({ section, index }) => (
    <AccordionItem value={`section-${index}`} className="border-b">
      <AccordionTrigger className="text-left hover:no-underline py-4">
        <div className="flex justify-between items-center w-full pr-4">
          <div>
            <h3 className="font-semibold">{section.title}</h3>
            <p className="text-sm text-gray-600">{section.lectures} lectures • {section.duration}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2 pb-4">
          {section.lessons.map((lesson, lessonIndex) => (
            <div key={lessonIndex} className="flex items-center justify-between py-2 px-4 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Play className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{lesson.title}</span>
                {lesson.preview && (
                  <Badge variant="outline" className="text-xs">Preview</Badge>
                )}
              </div>
              <span className="text-sm text-gray-500">{lesson.duration}</span>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Breadcrumbs */}
              <nav className="text-sm mb-4">
                <Link to="/courses" className="text-purple-400 hover:underline">Development</Link>
                <span className="mx-2">></span>
                <Link to="/courses" className="text-purple-400 hover:underline">Web Development</Link>
                <span className="mx-2">></span>
                <span>JavaScript</span>
              </nav>

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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
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

            {/* Course content */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Course content</h2>
              <p className="text-gray-600 mb-4">
                {courseContent.length} sections • {courseContent.reduce((acc, section) => acc + section.lectures, 0)} lectures • 69h 37m total length
              </p>
              
              <Card>
                <Accordion type="multiple" className="w-full">
                  {courseContent.map((section, index) => (
                    <CourseContentItem key={index} section={section} index={index} />
                  ))}
                </Accordion>
              </Card>
            </div>

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

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-48 object-cover rounded"
                    />
                    <Button 
                      size="lg" 
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white bg-opacity-90 text-black hover:bg-opacity-100"
                    >
                      <Play className="w-6 h-6 ml-1" />
                    </Button>
                  </div>

                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-3xl font-bold">${course.price}</span>
                      <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                    </div>
                    <p className="text-red-600 font-semibold">75% off</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                      Add to cart
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                      Buy now
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-600 mb-6">
                    30-Day Money-Back Guarantee
                  </p>

                  <div className="space-y-3 mb-6">
                    <h3 className="font-semibold">This course includes:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Monitor className="w-4 h-4" />
                        <span>69 hours on-demand video</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>114 downloadable resources</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4" />
                        <span>Access on mobile and TV</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-purple-600 hover:underline">
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-1 text-purple-600 hover:underline">
                      <Heart className="w-4 h-4" />
                      <span>Gift this course</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
