
import React from 'react';
import { Users, TrendingUp, Award, Shield, PlayCircle, BookOpen, Target, Lightbulb, Globe, Star, CheckCircle, ArrowRight, Zap, Heart, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '@/services/coursesApi';

const EliteEducation = () => {
  // Mission values
  const missionValues = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To democratize world-class education and make learning accessible to everyone, everywhere, at any time."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We leverage cutting-edge technology and pedagogical research to create the most effective learning experiences."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Breaking down barriers to education and empowering millions of learners across the globe to achieve their dreams."
    }
  ];

  // Educational methods
  const educationMethods = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "AI-powered personalized learning paths that adapt to your pace, style, and goals.",
      features: ["Personalized curriculum", "Real-time difficulty adjustment", "Learning analytics"]
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Connect with peers, mentors, and experts in interactive learning communities.",
      features: ["Peer-to-peer learning", "Expert mentorship", "Study groups"]
    },
    {
      icon: Zap,
      title: "Microlearning",
      description: "Bite-sized lessons that fit into your busy schedule while maximizing retention.",
      features: ["5-15 minute lessons", "Spaced repetition", "Mobile-friendly"]
    },
    {
      icon: Award,
      title: "Project-Based Learning",
      description: "Learn by doing with real-world projects that build your portfolio and skills.",
      features: ["Hands-on projects", "Industry relevance", "Portfolio building"]
    }
  ];

  // Learning outcomes
  const learningOutcomes = [
    { title: "95% Course Completion Rate", subtitle: "Above industry average" },
    { title: "87% Career Advancement", subtitle: "Within 6 months of completion" },
    { title: "4.8/5 Average Rating", subtitle: "From 2M+ student reviews" },
    { title: "50+ Countries", subtitle: "Global learning community" }
  ];

  // Success stories
  const successStories = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1c6?w=100&h=100&fit=crop&crop=face",
      story: "Elite Education transformed my career. From a marketing background to landing my dream job at Google in just 8 months.",
      course: "Full Stack Development"
    },
    {
      name: "Marcus Johnson",
      role: "Data Scientist at Microsoft",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      story: "The AI and Machine Learning course gave me the skills I needed to transition into data science. Best investment I ever made.",
      course: "AI & Machine Learning"
    },
    {
      name: "Elena Rodriguez",
      role: "UX Designer at Airbnb",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      story: "The design thinking methodology and hands-on projects prepared me perfectly for my role at Airbnb.",
      course: "UX/UI Design"
    }
  ];

  // Use React Query to get featured courses
  const { data: featuredCourses, isLoading, error } = useQuery({
    queryKey: ['featured-courses'],
    queryFn: () => coursesApi.fetchFeaturedCourses(),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
              <Star className="w-4 h-4 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">Trusted by 50M+ learners worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Unlock Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Elite Potential
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
              Join the world's most comprehensive learning platform. Master in-demand skills, 
              connect with industry experts, and transform your career with our revolutionary approach to education.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-10 py-6 h-auto rounded-full shadow-xl">
                <PlayCircle className="w-6 h-6 mr-3" />
                Start Learning Free
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-10 py-6 h-auto rounded-full">
                Explore Courses
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {learningOutcomes.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-yellow-300">{stat.title}</div>
                  <div className="text-sm opacity-80">{stat.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Mission & Vision</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe that quality education should be accessible to everyone, everywhere. 
                Our mission is to break down barriers and democratize learning for the global community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {missionValues.map((value, index) => (
                <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Methods */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Revolutionary Learning Methods</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've reimagined education using cutting-edge technology and proven pedagogical principles 
                to create the most effective learning experience possible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {educationMethods.map((method, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">{method.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{method.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {method.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real people, real transformations. See how our learners have changed their lives and careers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={story.image} 
                        alt={story.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{story.name}</h4>
                        <p className="text-sm text-purple-600">{story.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 italic leading-relaxed">"{story.story}"</p>
                    
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                      {story.course}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Transform Your Skills</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our most popular courses designed by industry experts and delivered through our innovative platform.
              </p>
            </div>

            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-white rounded-2xl h-96 shadow-lg" />
                ))}
              </div>
            )}

            {error && (
              <div className="text-center bg-red-50 border border-red-200 rounded-xl p-8">
                <p className="text-red-600">Unable to load courses at the moment. Please try again later.</p>
              </div>
            )}

            {!isLoading && !error && featuredCourses && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCourses.slice(0, 6).map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white group">
                    <div className="relative">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-purple-600 text-white">{course.level}</Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <PlayCircle className="w-16 h-16 text-white" />
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg leading-tight group-hover:text-purple-600 transition-colors">{course.title}</CardTitle>
                      <p className="text-sm text-gray-600">{course.instructor}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700 line-clamp-2">{course.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.studentsCount?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-sm text-gray-500">({course.studentsCount} reviews)</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">${course.price}</span>
                          {course.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                          )}
                        </div>
                        <Button asChild className="bg-purple-600 hover:bg-purple-700">
                          <Link to={`/course/${course.id}`}>
                            Enroll Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button size="lg" asChild className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full">
                <Link to="/courses">
                  Explore All Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Future?</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join millions of learners who have already started their journey to success. 
              Your future self is waiting – take the first step today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-10 py-6 h-auto rounded-full shadow-xl">
                <Link to="/auth">
                  <Heart className="w-6 h-6 mr-3" />
                  Start Your Journey
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-10 py-6 h-auto rounded-full">
                <Link to="/courses">
                  Browse Courses
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">Free</div>
                <div className="text-sm opacity-80">7-day trial</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-80">Expert support</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Lifetime</div>
                <div className="text-sm opacity-80">Access to updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EliteEducation;
