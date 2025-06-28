
import React, { useEffect } from 'react';
import { Users, TrendingUp, Award, Shield, PlayCircle, BookOpen, Target, Lightbulb, Globe, Star, CheckCircle, ArrowRight, Zap, Heart, Brain, GraduationCap, Rocket, TreePine, DollarSign, Clock, Trophy, User, MapPin, Camera, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BecomeTeacher = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect logged-in users to instructor dashboard
  useEffect(() => {
    if (user) {
      navigate('/instructor/dashboard');
    }
  }, [user, navigate]);

  // Don't render the page if user is logged in (will redirect)
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Enhanced teaching benefits with more compelling content
  const teachingBenefits = [
    {
      icon: Heart,
      title: "Transform Lives Globally",
      description: "Impact millions of students worldwide and become part of the educational revolution that's reshaping how people learn, grow, and achieve their dreams.",
      highlight: "Global Impact",
      stats: "2M+ Lives Changed"
    },
    {
      icon: DollarSign,
      title: "Build Sustainable Income",
      description: "Create multiple revenue streams through courses, mentoring, and premium content. Top educators earn $10,000+ monthly while maintaining flexible schedules.",
      highlight: "Up to $15,000/month",
      stats: "Avg. $4,200/month"
    },
    {
      icon: Globe,
      title: "Reach Global Audience",
      description: "Break geographical boundaries and teach students from every continent. Build your personal brand as a world-class educator and thought leader.",
      highlight: "195+ Countries",
      stats: "50M+ Global Learners"
    },
    {
      icon: Rocket,
      title: "Career Acceleration",
      description: "Teaching enhances your expertise, builds your network, and opens doors to consulting, speaking, and leadership opportunities in your field.",
      highlight: "10x Career Growth",
      stats: "85% Career Advancement"
    }
  ];

  // Enhanced educational mission with national transformation focus
  const educationalMissions = [
    {
      icon: Target,
      title: "Democratize Quality Education",
      description: "We're building the world's most accessible education platform, ensuring that premium learning experiences reach every person, regardless of their economic background or location. Our mission is to eliminate educational inequality globally.",
      impact: "Breaking barriers for 100M+ underserved learners"
    },
    {
      icon: Brain,
      title: "Revolutionize Learning Methodologies",
      description: "Pioneering AI-powered personalized learning, immersive technologies, and adaptive curricula that transform how knowledge is absorbed, retained, and applied in real-world scenarios.",
      impact: "95% improvement in learning outcomes"
    },
    {
      icon: TreePine,
      title: "Build Sustainable Educational Ecosystems",
      description: "Creating self-sustaining learning communities that adapt and evolve with societal needs, ensuring long-term educational growth and continuous innovation in every region we serve.",
      impact: "500+ thriving learning communities worldwide"
    },
    {
      icon: Users,
      title: "Foster Global Learning Communities",
      description: "Connecting learners, educators, and industry leaders in collaborative environments that transcend cultural and geographical boundaries, creating a truly global knowledge-sharing network.",
      impact: "Cross-cultural collaboration in 80+ languages"
    }
  ];

  // Enhanced requirements with professional development focus
  const teacherRequirements = [
    {
      category: "Professional Expertise",
      items: [
        "3+ years industry experience",
        "Proven subject matter mastery",
        "Passion for knowledge sharing",
        "Commitment to student success"
      ],
      icon: Brain,
      description: "Bring your real-world experience to help students bridge theory and practice"
    },
    {
      category: "Technical Setup",
      items: [
        "High-speed internet (50+ Mbps)",
        "Professional recording equipment",
        "Quiet, well-lit teaching space",
        "Backup systems for reliability"
      ],
      icon: Camera,
      description: "Professional-grade setup ensures exceptional learning experiences"
    },
    {
      category: "Teaching Commitment",
      items: [
        "Minimum 10 hours per week",
        "Regular student engagement",
        "Continuous content improvement",
        "Professional development participation"
      ],
      icon: Trophy,
      description: "Dedication to excellence drives student success and your growth"
    }
  ];

  // Enhanced success stories with more detailed information
  const teacherSuccessStories = [
    {
      name: "Dr. Sarah Chen",
      subject: "Data Science & AI",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=face",
      earnings: "$12,500/month",
      students: "25,000+",
      courses: 8,
      story: "From struggling PhD to globally recognized AI educator. Teaching online has given me financial freedom and the platform to share cutting-edge research with practitioners worldwide.",
      rating: 4.9,
      achievement: "Top 1% Global Educator",
      background: "Former Google AI Researcher"
    },
    {
      name: "Marcus Rodriguez",
      subject: "Full-Stack Development",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      earnings: "$8,900/month",
      students: "18,500+",
      courses: 12,
      story: "Transitioned from senior developer to full-time educator. Now I help thousands launch their tech careers while earning more than my corporate salary with complete flexibility.",
      rating: 4.8,
      achievement: "Career Transformation Leader",
      background: "Ex-Netflix Senior Engineer"
    },
    {
      name: "Prof. Emma Williams",
      subject: "Digital Marketing Strategy",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      earnings: "$7,200/month",
      students: "15,200+",
      courses: 6,
      story: "After 15 years in academia, online teaching has allowed me to reach more students in 2 years than in my entire university career, while building a thriving consulting practice.",
      rating: 4.9,
      achievement: "Academic Excellence Award",
      background: "Harvard Business School"
    }
  ];

  // Enhanced platform statistics
  const platformStats = [
    { number: "2.5M+", label: "Active Students", growth: "+150% YoY" },
    { number: "25K+", label: "Expert Educators", growth: "Growing Daily" },
    { number: "$120M+", label: "Educator Earnings", growth: "+300% This Year" },
    { number: "195", label: "Countries Served", growth: "Global Presence" }
  ];

  // Enhanced application process with mentorship
  const applicationSteps = [
    {
      step: 1,
      title: "Submit Application",
      description: "Complete our comprehensive application including expertise validation, teaching philosophy, and sample content demonstration.",
      duration: "5-10 minutes",
      tip: "Highlight your unique expertise and teaching approach"
    },
    {
      step: 2,
      title: "Expert Review & Interview",
      description: "Our education specialists review your profile and conduct a personalized interview to understand your goals and teaching style.",
      duration: "1-2 weeks",
      tip: "Be authentic about your passion for education"
    },
    {
      step: 3,
      title: "Course Development Support",
      description: "Work with our instructional design team to create your first course with professional guidance and technical support.",
      duration: "2-4 weeks",
      tip: "Focus on solving real student problems"
    },
    {
      step: 4,
      title: "Launch & Ongoing Success",
      description: "Go live with full marketing support, student acquisition assistance, and continuous mentorship for long-term success.",
      duration: "Ongoing",
      tip: "Stay engaged with your student community"
    }
  ];

  // National transformation initiatives
  const nationalImpacts = [
    {
      icon: GraduationCap,
      title: "Workforce Development",
      metric: "500K+",
      description: "Professionals upskilled annually, directly contributing to national economic growth and competitiveness in the global market."
    },
    {
      icon: Rocket,
      title: "Innovation Acceleration",
      metric: "75%",
      description: "Faster adoption of emerging technologies in industries where our graduates work, driving national innovation leadership."
    },
    {
      icon: Globe,
      title: "Rural Access Expansion",
      metric: "10M+",
      description: "Underserved learners gained access to world-class education, reducing the urban-rural knowledge gap significantly."
    },
    {
      icon: TrendingUp,
      title: "Economic Impact",
      metric: "$2.8B+",
      description: "Generated in economic value through improved productivity and innovation from our educational programs nationwide."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-10 w-48 h-48 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <BookOpen className="absolute top-20 left-1/4 w-8 h-8 text-white/20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <Users className="absolute top-40 right-1/4 w-6 h-6 text-white/20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <Award className="absolute bottom-40 left-1/6 w-7 h-7 text-white/20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
          <Target className="absolute bottom-20 right-1/3 w-5 h-5 text-white/20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/15 backdrop-blur-md rounded-full px-8 py-3 mb-10 border border-white/30 shadow-lg">
              <Zap className="w-5 h-5 mr-3 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Join the Global Education Revolution</span>
              <Badge className="ml-3 bg-yellow-500 text-black text-xs px-2 py-1">25K+ Educators</Badge>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-tight">
              Shape the
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
                Future of Education
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl mb-8 opacity-95 max-w-5xl mx-auto leading-relaxed font-light">
              Transform millions of lives, build sustainable income, and become part of the educational revolution 
              that's reshaping how the world learns, grows, and succeeds.
            </p>
            
            <p className="text-lg md:text-xl mb-16 opacity-80 max-w-4xl mx-auto">
              Join 25,000+ educators who are already making $4,200+ monthly while creating lasting global impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
              <Button size="lg" asChild className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-bold text-xl px-12 py-8 h-auto rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Link to="/auth">
                  <GraduationCap className="w-7 h-7 mr-4" />
                  Start Your Teaching Journey
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-purple-600 font-bold text-xl px-12 py-8 h-auto rounded-full backdrop-blur-sm bg-white/10">
                <PlayCircle className="w-7 h-7 mr-4" />
                Watch Success Stories
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {platformStats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="text-4xl md:text-5xl font-black mb-2 text-yellow-300">{stat.number}</div>
                  <div className="text-sm opacity-90 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-300 font-medium">{stat.growth}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* National Impact Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">
                Transforming Nations Through Education
              </h2>
              <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Our educators are driving national transformation by democratizing access to world-class education, 
                accelerating innovation, and building the workforce of tomorrow.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {nationalImpacts.map((impact, index) => (
                <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-white/90 backdrop-blur-sm group hover:scale-105">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <impact.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-emerald-600 mb-3">{impact.metric}</div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{impact.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{impact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">Why Choose Teaching Excellence?</h2>
              <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Teaching is the ultimate career catalyst – combining purpose, prosperity, and global impact 
                while building the future you want to live in.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {teachingBenefits.map((benefit, index) => (
                <Card key={index} className="p-10 hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-gradient-to-br from-indigo-50 to-purple-50 group">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-6 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-3xl font-bold text-gray-900">{benefit.title}</h3>
                          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 px-4 py-2 text-sm font-semibold">
                            {benefit.highlight}
                          </Badge>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg mb-4">{benefit.description}</p>
                        <div className="text-sm text-indigo-600 font-semibold">{benefit.stats}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Educational Mission */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-8">Our Global Educational Mission</h2>
              <p className="text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
                We're not just building courses – we're architecting the future of human knowledge sharing, 
                creating educational ecosystems that adapt, evolve, and transform societies worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {educationalMissions.map((mission, index) => (
                <Card key={index} className="p-10 hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-white/10 backdrop-blur-md hover:bg-white/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <mission.icon className="w-8 h-8 text-black" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold mb-4">{mission.title}</h3>
                        <p className="text-white/90 leading-relaxed text-lg mb-6">{mission.description}</p>
                        <div className="text-yellow-300 font-semibold text-sm bg-white/10 rounded-full px-4 py-2 inline-block">
                          {mission.impact}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Teacher Success Stories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">Educator Success Stories</h2>
              <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Meet inspiring educators who transformed their careers, impacted thousands of lives, 
                and built thriving educational businesses through our platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {teacherSuccessStories.map((teacher, index) => (
                <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white group hover:scale-105">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4 mb-8">
                      <img 
                        src={teacher.image} 
                        alt={teacher.name}
                        className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white"
                      />
                      <div>
                        <h4 className="font-bold text-xl text-gray-900">{teacher.name}</h4>
                        <p className="text-indigo-600 font-semibold text-sm">{teacher.subject}</p>
                        <p className="text-gray-500 text-xs">{teacher.background}</p>
                        <div className="flex items-center mt-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(teacher.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">{teacher.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
                        <div className="text-2xl font-black text-green-600">{teacher.earnings}</div>
                        <div className="text-xs text-gray-600">Monthly Income</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                        <div className="text-2xl font-black text-blue-600">{teacher.students}</div>
                        <div className="text-xs text-gray-600">Students Taught</div>
                      </div>
                    </div>
                    
                    <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {teacher.achievement}
                    </Badge>
                    
                    <p className="text-gray-700 italic leading-relaxed">&ldquo;{teacher.story}&rdquo;</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Requirements Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">Your Path to Teaching Excellence</h2>
              <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                We've streamlined the journey to becoming a world-class educator. Here's everything you need 
                to launch your successful teaching career and make global impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {teacherRequirements.map((requirement, index) => (
                <Card key={index} className="p-10 hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-white group hover:scale-105">
                  <CardContent className="pt-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-lg">
                      <requirement.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-6 text-gray-900">{requirement.category}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">{requirement.description}</p>
                    <div className="space-y-4">
                      {requirement.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 font-medium">{item}</span>
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

      {/* Enhanced Application Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-8 text-gray-900">Your Teaching Journey Roadmap</h2>
              <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                From application to global impact – we'll guide you every step of the way with personalized support, 
                expert mentorship, and proven strategies for teaching success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {applicationSteps.map((step, index) => (
                <div key={index} className="text-center relative group">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 text-white text-3xl font-black shadow-xl group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                  <div className="text-sm text-indigo-600 font-semibold mb-2">{step.duration}</div>
                  <div className="text-xs text-gray-500 italic">{step.tip}</div>
                  
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full z-10">
                      <ArrowRight className="w-8 h-8 text-indigo-300 mx-auto transform -translate-x-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-lg px-6 py-3 font-bold">
              🚀 Limited Time: Fast-Track Application Process
            </Badge>
            
            <h2 className="text-5xl md:text-6xl font-black mb-8">Ready to Transform Education?</h2>
            <p className="text-2xl mb-12 opacity-95 leading-relaxed">
              Join the global movement of educators who are reshaping the future of learning. 
              Your expertise is needed to build tomorrow's workforce and drive national transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
              <Button size="lg" asChild className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-bold text-2xl px-16 py-10 h-auto rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Link to="/auth">
                  <Rocket className="w-8 h-8 mr-4" />
                  Start Teaching Today
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-purple-600 font-bold text-2xl px-16 py-10 h-auto rounded-full backdrop-blur-sm bg-white/10">
                <Link to="/courses">
                  <BookOpen className="w-8 h-8 mr-4" />
                  Explore Platform
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="text-4xl font-black mb-2 text-yellow-300">$0</div>
                <div className="text-sm opacity-90">Setup costs</div>
                <div className="text-xs text-green-300 mt-1">Complete freedom to start</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="text-4xl font-black mb-2 text-yellow-300">24/7</div>
                <div className="text-sm opacity-90">Expert support</div>
                <div className="text-xs text-green-300 mt-1">Dedicated success team</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="text-4xl font-black mb-2 text-yellow-300">100%</div>
                <div className="text-sm opacity-90">Course ownership</div>
                <div className="text-xs text-green-300 mt-1">You control your content</div>
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
