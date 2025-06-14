
import React from 'react';
import { Search, Star, Users, Clock, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Index = () => {
  const featuredCourses = [
    {
      id: 1,
      title: "Complete React Developer Course",
      instructor: "Sarah Johnson",
      instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      studentsCount: 15420,
      price: 89.99,
      originalPrice: 199.99,
      duration: "42 hours",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      category: "Web Development",
      level: "Beginner to Advanced"
    },
    {
      id: 2,
      title: "Python for Data Science Masterclass",
      instructor: "Dr. Michael Chen",
      instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      studentsCount: 23180,
      price: 79.99,
      originalPrice: 179.99,
      duration: "38 hours",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      category: "Data Science",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "UI/UX Design Complete Course",
      instructor: "Emma Rodriguez",
      instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      studentsCount: 18750,
      price: 94.99,
      originalPrice: 189.99,
      duration: "35 hours",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      category: "Design",
      level: "All Levels"
    },
    {
      id: 4,
      title: "Machine Learning A-Z",
      instructor: "Alex Thompson",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      studentsCount: 31200,
      price: 99.99,
      originalPrice: 199.99,
      duration: "45 hours",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      category: "Machine Learning",
      level: "Intermediate to Advanced"
    }
  ];

  const categories = [
    { name: "Web Development", icon: "💻", courses: 1250 },
    { name: "Data Science", icon: "📊", courses: 890 },
    { name: "Design", icon: "🎨", courses: 670 },
    { name: "Business", icon: "💼", courses: 1100 },
    { name: "Marketing", icon: "📢", courses: 580 },
    { name: "Photography", icon: "📸", courses: 420 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary">LearnHub</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Categories</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Teach</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Business</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">Log In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
              Learn Without Limits
            </h2>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Start, switch, or advance your career with more than 5,000 courses from world-class instructors
            </p>
            <div className="flex max-w-md mx-auto mb-8 animate-fade-in">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="What do you want to learn?" 
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button size="lg" className="ml-2 h-12 px-8">
                Search
              </Button>
            </div>
            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                57M+ Students
              </div>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                213K+ Courses
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                57K+ Instructors
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Top Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h4 className="font-semibold mb-1">{category.name}</h4>
                  <p className="text-sm text-gray-500">{category.courses} courses</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold">Featured Courses</h3>
            <Button variant="outline">View All Courses</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group overflow-hidden">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">
                    {course.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <h4 className="font-bold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={course.instructorAvatar} />
                      <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                    </Avatar>
                    <span>{course.instructor}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{course.studentsCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-3">
                    {course.level}
                  </Badge>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${course.price}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${course.originalPrice}
                      </span>
                    </div>
                    <Button size="sm" className="hover:scale-105 transition-transform">
                      Enroll Now
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">57M+</div>
              <div className="text-blue-100">Students</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">213K+</div>
              <div className="text-blue-100">Courses</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">57K+</div>
              <div className="text-blue-100">Instructors</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">190+</div>
              <div className="text-blue-100">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Start Learning?</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of students and instructors from around the world. Start your learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Start Teaching
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">LearnHub</h4>
              <p className="text-gray-400">
                The world's largest online learning platform with over 57 million students.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Community</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Students</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Teachers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Affiliate</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
