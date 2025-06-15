
import React from 'react';
import { Users, TrendingUp, Award, Shield, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EliteEducation = () => {
  const customerServiceCourses = [
    {
      id: 1,
      title: "Customer Service Fundamentals: Building Rapport",
      instructor: "Jane Doe",
      duration: "6 hours",
      students: 18340,
      rating: 4.9,
      price: 149,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1556740772-1a741367b93e?w=300&h=200&fit=crop",
      level: "Beginner",
      description: "Learn the core principles of exceptional customer service and build lasting customer relationships.",
      topics: ["Communication", "Empathy", "Problem-Solving", "Active Listening"]
    },
    {
      id: 2,
      title: "Advanced Communication for Support Professionals",
      instructor: "Johnathan Smith",
      duration: "10 hours",
      students: 9870,
      rating: 4.8,
      price: 199,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=200&fit=crop",
      level: "Intermediate",
      description: "Master advanced communication techniques to handle any customer interaction with confidence and skill.",
      topics: ["De-escalation", "Negotiation", "Positive Language", "Written Communication"]
    },
    {
      id: 3,
      title: "Handling Difficult Customers With Empathy",
      instructor: "Maria Garcia",
      duration: "8 hours",
      students: 14210,
      rating: 4.7,
      price: 179,
      originalPrice: 279,
      image: "https://images.unsplash.com/photo-1586473215170-25a2a2e0615e?w=300&h=200&fit=crop",
      level: "Advanced",
      description: "Develop strategies to manage challenging customers effectively, turning negative experiences into positive ones.",
      topics: ["Emotional Intelligence", "Conflict Resolution", "Stress Management", "Empathy Mapping"]
    }
  ];

  const serviceFeatures = [
    {
      icon: Users,
      title: "Customer-Centric Approach",
      description: "Instill a customer-first mindset across your entire support team."
    },
    {
      icon: TrendingUp,
      title: "Boost CSAT & NPS",
      description: "Improve key support metrics like Customer Satisfaction and Net Promoter Score."
    },
    {
      icon: Award,
      title: "Award-Winning Training",
      description: "Access high-quality, proven training materials developed by industry experts."
    },
    {
      icon: Shield,
      title: "Build Customer Trust",
      description: "Enhance brand loyalty and trust through consistent, positive interactions."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Mastering Customer Service Excellence</h1>
            <p className="text-xl mb-8 opacity-90">
              Equip your team with the skills to deliver outstanding customer experiences, drive loyalty, and boost your bottom line.
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
            <h2 className="text-3xl font-bold mb-4">Why Invest in Customer Service Training?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your support team into a powerhouse of customer satisfaction and retention.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceFeatures.map((feature, index) => (
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
            <h2 className="text-3xl font-bold mb-4">Featured Customer Service Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From essential fundamentals to advanced techniques for handling complex situations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customerServiceCourses.map((course) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Customer Support?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join leading companies that trust us to upskill their customer-facing teams.
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

export default EliteEducation;
