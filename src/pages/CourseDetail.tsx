
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseHero from '@/components/course/CourseHero';
import CourseInfoTabs from '@/components/course/CourseInfoTabs';
import CourseSidebar from '@/components/course/CourseSidebar';

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

  const sampleQuizQuestions = [
    {
      id: '1',
      question: 'What is the correct way to declare a variable in JavaScript?',
      type: 'multiple-choice' as const,
      options: [
        { id: 'a', text: 'var myVariable;', isCorrect: true },
        { id: 'b', text: 'variable myVariable;', isCorrect: false },
        { id: 'c', text: 'v myVariable;', isCorrect: false },
        { id: 'd', text: 'declare myVariable;', isCorrect: false }
      ],
      explanation: 'In JavaScript, variables are declared using var, let, or const keywords.',
      points: 1
    },
    {
      id: '2',
      question: 'JavaScript is a compiled language.',
      type: 'multiple-choice' as const,
      options: [
        { id: 'a', text: 'True', isCorrect: false },
        { id: 'b', text: 'False', isCorrect: true }
      ],
      explanation: 'JavaScript is an interpreted language, not a compiled language.',
      points: 1
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <CourseHero course={course} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <CourseInfoTabs
              course={course}
              whatYoullLearn={whatYoullLearn}
              courseContent={courseContent}
              requirements={requirements}
              sampleQuizQuestions={sampleQuizQuestions}
            />
          </div>

          {/* Sticky Sidebar */}
          <CourseSidebar course={course} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
