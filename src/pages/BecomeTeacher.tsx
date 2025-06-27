
import React from 'react';
import { Users, TrendingUp, Award, Shield, PlayCircle, BookOpen, Target, Lightbulb, Globe, Star, CheckCircle, ArrowRight, Zap, Heart, Brain, GraduationCap, Rocket, TreePine, DollarSign, Clock, Trophy, User, MapPin, Camera, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BecomeTeacher = () => {
  // Teaching benefits
  const teachingBenefits = [
    {
      icon: Heart,
      title: "Make a Lasting Impact",
      description: "Shape the future by inspiring and educating the next generation of learners and leaders.",
      highlight: "Transform Lives"
    },
    {
      icon: DollarSign,
      title: "Earn While You Teach",
      description: "Generate substantial income by sharing your expertise with our global community of eager learners.",
      highlight: "Up to $5,000/month"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Teach students from around the world and build an international community of learners.",
      highlight: "50+ Countries"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Create your own schedule and teach at your own pace while maintaining work-life balance.",
      highlight: "Your Timeline"
    }
  ];

  // Educational mission
  const educationalMissions = [
    {
      icon: Target,
      title: "Democratize Quality Education",
      description: "Breaking down barriers to ensure world-class education reaches every corner of the globe, regardless of economic status or geographic location."
    },
    {
      icon: Rocket,
      title: "Innovation in Learning",
      description: "Pioneering cutting-edge educational technologies and methodologies to create more effective and engaging learning experiences."
    },
    {
      icon: TreePine,
      title: "Sustainable Educational Growth",
      description: "Building educational ecosystems that grow and adapt with communities, ensuring long-term positive impact on society."
    },
    {
      icon: Users,
      title: "Inclusive Learning Communities",
      description: "Creating diverse, supportive environments where every learner feels valued and empowered to achieve their full potential."
    }
  ];

  // Requirements for becoming a teacher
  const teacherRequirements = [
    {
      category: "Expertise",
      items: ["Subject matter expertise", "Professional experience", "Passion for teaching"],
      icon: Brain
    },
    {
      category: "Equipment",
      items: ["Reliable internet connection", "Computer/laptop", "Webcam and microphone"],
      icon: Camera
    },
    {
      category: "Commitment",
      items: ["Minimum 5 hours per week", "Regular student interaction", "Content creation"],
      icon: Trophy
    }
  ];

  // Success stories from teachers
  const teacherSuccessStories = [
    {
      name: "Dr. Amanda Chen",
      subject: "Data Science",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=face",
      earnings: "$8,500/month",
      students: "12,000+",
      story: "From university professor to global online educator. I've impacted more lives in 2 years than in my entire academic career.",
      rating: 4.9
    },
    {
      name: "Mark Rodriguez",
      subject: "Web Development",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      earnings: "$6,200/month",
      students: "8,500+",
      story: "Started as a freelance developer, now I'm building the next generation of programmers while earning more than my corporate job.",
      rating: 4.8
    },
    {
      name: "Sarah Williams",
      subject: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      earnings: "$4,800/month",
      students: "6,200+",
      story: "Teaching has allowed me to scale my knowledge and help thousands of entrepreneurs grow their businesses online.",
      rating: 4.9
    }
  ];

  // Platform statistics
  const platformStats = [
    { number: "500K+", label: "Active Students" },
    { number: "15K+", label: "Expert Teachers" },
    { number: "$50M+", label: "Teacher Earnings" },
    { number: "180+", label: "Countries Served" }
  ];

  // Application process steps
  const applicationSteps = [
    {
      step: 1,
      title: "Apply Online",
      description: "Submit your application with your expertise and teaching interests."
    },
    {
      step: 2,
      title: "Review Process",
      description: "Our team reviews your qualifications and teaching potential."
    },
    {
      step: 3,
      title: "Create Content",
      description: "Develop your first course with our support and guidance."
    },
    {
      step: 4,
      title: "Start Teaching",
      description: "Launch your course and begin earning while making impact."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-700 to-cyan-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-cyan-300/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
              <GraduationCap className="w-4 h-4 mr-2 text-emerald-300" />
              <span className="text-sm font-medium">Join 15,000+ Expert Educators Worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Become a
              <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Teacher & Leader
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
              Transform lives, share your expertise, and build a global impact while earning substantial income. 
              Join the world's most innovative educational platform and help shape the future of learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold text-lg px-10 py-6 h-auto rounded-full shadow-xl">
                <Rocket className="w-6 h-6 mr-3" />
                Start Teaching Today
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold text-lg px-10 py-6 h-auto rounded-full">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {platformStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-emerald-300">{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Why Become a Teacher?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Teaching is more than just sharing knowledge – it's about creating lasting impact, 
                building communities, and transforming the future of education globally.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teachingBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-cyan-50 group">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-bold text-gray-900">{benefit.title}</h3>
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                            {benefit.highlight}
                          </Badge>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Educational Mission */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Educational Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're not just building an education platform – we're creating a movement to transform how the world learns, 
                grows, and connects through knowledge sharing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {educationalMissions.map((mission, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <mission.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">{mission.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{mission.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Teacher Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet educators who have transformed their careers and impacted thousands of lives through our platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teacherSuccessStories.map((teacher, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <img 
                        src={teacher.image} 
                        alt={teacher.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{teacher.name}</h4>
                        <p className="text-sm text-emerald-600 font-medium">{teacher.subject}</p>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(teacher.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">{teacher.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-emerald-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-emerald-600">{teacher.earnings}</div>
                        <div className="text-xs text-gray-600">Monthly Earnings</div>
                      </div>
                      <div className="bg-cyan-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-cyan-600">{teacher.students}</div>
                        <div className="text-xs text-gray-600">Students Taught</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 italic leading-relaxed text-sm">"{teacher.story}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">What You Need to Get Started</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've made it simple to begin your teaching journey. Here's everything you need to become a successful educator on our platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teacherRequirements.map((requirement, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <requirement.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">{requirement.category}</h3>
                    <div className="space-y-3">
                      {requirement.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{item}</span>
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

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Your Teaching Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow these simple steps to become part of our global community of educators and start making an impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {applicationSteps.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-emerald-300 mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 via-teal-700 to-cyan-800 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Education?</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join thousands of educators who are already making a difference. Your expertise is needed to help build 
              the future of learning. Start your teaching journey today and become part of something extraordinary.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button size="lg" asChild className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold text-lg px-10 py-6 h-auto rounded-full shadow-xl">
                <Link to="/auth">
                  <GraduationCap className="w-6 h-6 mr-3" />
                  Apply to Teach
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold text-lg px-10 py-6 h-auto rounded-full">
                <Link to="/courses">
                  Explore Courses
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">No</div>
                <div className="text-sm opacity-80">Upfront costs</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-80">Teacher support</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-80">Course ownership</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BecomeTeacher;
