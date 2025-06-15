
import React from 'react';
import { Building2, Users, TrendingUp, Shield, Award, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const UdemyBusiness = () => {
  const businessCourses = [
    {
      id: 1,
      title: "Complete Landing Page Design for Business Growth",
      instructor: "Sarah Johnson",
      duration: "8 hours",
      students: 15420,
      rating: 4.8,
      price: 199,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      level: "All Levels",
      description: "Master the art of creating high-converting landing pages that drive business results",
      topics: ["Conversion Optimization", "UI/UX Design", "A/B Testing", "Analytics"]
    },
    {
      id: 2,
      title: "Corporate Branding & Landing Page Strategy",
      instructor: "Michael Chen",
      duration: "12 hours",
      students: 8932,
      rating: 4.9,
      price: 249,
      originalPrice: 349,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
      level: "Intermediate",
      description: "Build cohesive brand experiences through strategic landing page design",
      topics: ["Brand Strategy", "Visual Identity", "Corporate Design", "Marketing Funnels"]
    },
    {
      id: 3,
      title: "Landing Page Conversion Optimization for Enterprises",
      instructor: "Emma Rodriguez",
      duration: "10 hours",
      students: 12567,
      rating: 4.7,
      price: 229,
      originalPrice: 329,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop",
      level: "Advanced",
      description: "Advanced techniques for maximizing enterprise landing page conversions",
      topics: ["Enterprise Solutions", "Data Analytics", "ROI Optimization", "Team Management"]
    }
  ];

  const businessFeatures = [
    {
      icon: Building2,
      title: "Enterprise-Ready Content",
      description: "Courses designed specifically for corporate training and business growth"
    },
    {
      icon: Users,
      title: "Team Learning",
      description: "Manage and track learning progress across your entire organization"
    },
    {
      icon: TrendingUp,
      title: "Business Impact",
      description: "Measure ROI and business outcomes from your learning investments"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Advanced security features and compliance for corporate environments"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Udemy Business</h1>
            <p className="text-xl mb-8 opacity-90">
              Empower your team with the skills they need to drive business growth. 
              Specialized courses in landing page design and conversion optimization for companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Udemy Business?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your team's capabilities with enterprise-grade learning solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Landing Page Courses for Companies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Master the art of creating high-converting landing pages that drive business results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600">{course.level}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {course.topics.slice(0, 3).map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{course.duration}</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(course.rating))}
                    </div>
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-purple-600">${course.price}</span>
                      <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                    </div>
                    <Button asChild size="sm">
                      <Link to={`/course/${course.id}`}>Enroll Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Team?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of companies that trust Udemy Business to upskill their teams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Start 30-Day Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UdemyBusiness;
