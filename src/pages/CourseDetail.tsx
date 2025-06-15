
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseBreadcrumbs from '@/components/course/CourseBreadcrumbs';
import CourseMainContent from '@/components/course/CourseMainContent';
import CourseDetailSidebar from '@/components/course/CourseDetailSidebar';

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
      bio: "Hi, I'm Jonas! I have been identified as one of Udemy's Top Instructors and all my premium courses have earned the best-selling status for outstanding performance and student satisfaction. I have been teaching people to code for many years now and love to share my passion for web development with my students.",
      rating: 4.7,
      reviewCount: 123456,
      students: 850000,
      courses: 5
    },
    rating: 4.7,
    reviewCount: 289456,
    studentsCount: 756843,
    price: 0,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=400&fit=crop",
    previewVideo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    lastUpdated: "11/2023",
    language: "English",
    duration: "69 total hours",
    lectures: 320,
    level: "All Levels",
    bestseller: true,
    categories: ["Development", "Web Development", "JavaScript"],
    description: "This is the most comprehensive and modern JavaScript course you'll find anywhere. It covers everything from the absolute basics to advanced topics like object-oriented programming, asynchronous JavaScript, and modern tools and workflows. By the end of this course, you'll have the skills and confidence you need to apply for JavaScript developer jobs, or work on your own projects.",
    includes: [
      { icon: "video", text: "69 hours on-demand video" },
      { icon: "article", text: "12 articles" },
      { icon: "download", text: "114 downloadable resources" },
      { icon: "mobile", text: "Access on mobile and TV" },
      { icon: "infinity", text: "Full lifetime access" },
      { icon: "certificate", text: "Certificate of completion" }
    ]
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
        { title: "Setting Up Our Code Editor", duration: "11:30" },
        { title: "Installing Node.js and Setting Up a Dev Environment", duration: "8:15" },
        { title: "How to Get Help", duration: "4:22" },
        { title: "Setting Up Prettier and VS Code", duration: "3:25" }
      ]
    },
    {
      title: "JavaScript Fundamentals – Part 1",
      lectures: 25,
      duration: "7hr 4min",
      lessons: [
        { title: "Section Intro", duration: "1:15" },
        { title: "Hello World!", duration: "4:30" },
        { title: "A Brief Introduction to JavaScript", duration: "8:21" },
        { title: "Linking a JavaScript File", duration: "6:17" },
        { title: "Values and Variables", duration: "11:02" }
      ]
    },
    {
      title: "JavaScript Fundamentals – Part 2",
      lectures: 22,
      duration: "6hr 18min",
      lessons: [
        { title: "Section Intro", duration: "1:42" },
        { title: "Activating Strict Mode", duration: "7:21" },
        { title: "Functions", duration: "13:33" },
        { title: "Function Declarations vs. Expressions", duration: "11:45" }
      ]
    }
  ];

  const requirements = [
    "No coding experience is necessary to take this course! I take you from beginner to expert!",
    "Any computer and OS will work — Windows, macOS or Linux. We will set up your text editor the course.",
    "A basic understanding of HTML and CSS is a plus, but not a must! The course includes an HTML and CSS crash course."
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Chen",
      rating: 5,
      date: "2 weeks ago",
      comment: "This course is absolutely fantastic! Jonas explains everything so clearly and the projects are really engaging. I went from knowing nothing about JavaScript to building my own projects. Highly recommend!"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      rating: 5,
      date: "1 month ago",
      comment: "Best programming course I've ever taken. The structure is perfect, starting from basics and building up to advanced concepts. The real-world projects really help solidify the learning."
    },
    {
      id: 3,
      name: "Emily Johnson",
      rating: 4,
      date: "3 weeks ago",
      comment: "Great course with excellent content. Sometimes the pace can be a bit fast, but you can always rewatch the videos. The instructor is very knowledgeable and passionate about teaching."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Black background section with main heading and sidebar */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column (70%) */}
            <div className="lg:col-span-2">
              <CourseBreadcrumbs categories={course.categories} />
              
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
                  <p className="text-lg text-gray-300 mb-4">{course.subtitle}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <span className="text-orange-400 mr-1">★</span>
                      <span className="font-semibold text-orange-400">{course.rating}</span>
                      <span className="text-purple-300 ml-2">({course.reviewCount.toLocaleString()} ratings)</span>
                    </div>
                    <span className="text-gray-300">{course.studentsCount.toLocaleString()} students</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-300">
                    <span>Created by <span className="text-purple-300 underline">{course.instructor.name}</span></span>
                    <span>Last updated {course.lastUpdated}</span>
                    <span>{course.language}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Visible on all screens, comes next to heading content */}
            <div>
              <CourseDetailSidebar course={course} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Course Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <CourseMainContent
              course={course}
              whatYoullLearn={whatYoullLearn}
              courseContent={courseContent}
              requirements={requirements}
              reviews={reviews}
            />
          </div>
          {/* Remove sticky sidebar from here, moved up */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;

