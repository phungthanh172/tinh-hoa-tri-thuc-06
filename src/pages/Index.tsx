
import React from 'react';
import { Star, Clock, Users, Play, TrendingUp, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredCourses = [
    {
      id: 1,
      title: "The Complete JavaScript Course 2024: From Zero to Expert!",
      instructor: "Jonas Schmedtmann",
      rating: 4.7,
      reviewCount: 289456,
      studentsCount: 756843,
      price: 84.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop",
      bestseller: true,
      category: "Development"
    },
    {
      id: 2,
      title: "React - The Complete Guide 2024 (incl. Next.js, Redux)",
      instructor: "Maximilian Schwarzmüller",
      rating: 4.6,
      reviewCount: 152341,
      studentsCount: 434567,
      price: 89.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      bestseller: true,
      category: "Development"
    },
    {
      id: 3,
      title: "The Complete Python Bootcamp From Zero to Hero in Python 3",
      instructor: "Jose Portilla",
      rating: 4.6,
      reviewCount: 456789,
      studentsCount: 1234567,
      price: 94.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
      bestseller: true,
      category: "Development"
    },
    {
      id: 4,
      title: "Machine Learning A-Z: Python & R in Data Science",
      instructor: "Kirill Eremenko",
      rating: 4.5,
      reviewCount: 134567,
      studentsCount: 567890,
      price: 84.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
      hottag: true,
      category: "Data Science"
    },
    {
      id: 5,
      title: "The Complete Digital Marketing Course - 12 Courses in 1",
      instructor: "Daragh Walsh",
      rating: 4.5,
      reviewCount: 98765,
      studentsCount: 345678,
      price: 89.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      category: "Marketing"
    }
  ];

  const companies = [
    { name: "Nasdaq", logo: "https://logos-world.net/wp-content/uploads/2021/02/Nasdaq-Logo.png" },
    { name: "Box", logo: "https://1000logos.net/wp-content/uploads/2020/08/Box-Logo.png" },
    { name: "Volkswagen", logo: "https://1000logos.net/wp-content/uploads/2018/07/Volkswagen-logo.png" },
    { name: "NetApp", logo: "https://1000logos.net/wp-content/uploads/2020/08/NetApp-Logo.png" },
    { name: "Eventbrite", logo: "https://1000logos.net/wp-content/uploads/2021/06/Eventbrite-logo.png" }
  ];

  const CourseCard = ({ course, showCategory = false }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <Link to={`/course/${course.id}`}>
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          {course.bestseller && (
            <Badge className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold">
              Bestseller
            </Badge>
          )}
          {course.hottag && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold">
              Hot & new
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-600">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">By {course.instructor}</p>
          {showCategory && (
            <p className="text-purple-600 text-xs mb-2">{course.category}</p>
          )}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-yellow-500 font-semibold">{course.rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-gray-500 text-xs">({course.reviewCount.toLocaleString()})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">${course.price}</span>
              <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );

  const CourseCarousel = ({ title, courses, showCategory = false }) => (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              showCategory={showCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop')"
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Learning that gets you</h1>
            <p className="text-xl mb-8">Skills for your present (and your future). Get started with us.</p>
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <Input 
                  placeholder="What do you want to learn?" 
                  className="h-14 text-lg pl-4 pr-12 text-black"
                />
                <Button 
                  size="lg" 
                  className="absolute right-0 top-0 h-14 px-6 bg-purple-600 hover:bg-purple-700"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Trusted by over 15,000 companies and millions of learners around the world
            </p>
            <div className="flex justify-center items-center space-x-8 flex-wrap">
              {companies.map((company) => (
                <div key={company.name} className="h-8 opacity-60 hover:opacity-100 transition-opacity">
                  <span className="text-gray-600 font-semibold">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Carousels */}
      <CourseCarousel 
        title="Students are viewing" 
        courses={featuredCourses}
        showCategory={true}
      />

      <CourseCarousel 
        title="Top courses in Development" 
        courses={featuredCourses.filter(c => c.category === 'Development')}
      />

      <CourseCarousel 
        title="Featured courses" 
        courses={featuredCourses.filter(c => c.bestseller)}
      />

      <CourseCarousel 
        title="Popular topics to learn now" 
        courses={featuredCourses}
      />

      {/* Learning Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Transform your life through education
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Learners around the world are launching new careers, advancing in their fields, 
                and enriching their lives.
              </p>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Find out how
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Learn at your own pace</h3>
                <p className="text-gray-600 text-sm">Access courses anytime, anywhere</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Learn from experts</h3>
                <p className="text-gray-600 text-sm">Industry professionals teach you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
