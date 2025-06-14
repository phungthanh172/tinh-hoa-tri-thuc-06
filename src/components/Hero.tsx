
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Star, Award, Users, BookOpen, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-purple-600 to-blue-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Join 50M+ learners worldwide</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Future Today
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Unlock your potential with expert-led courses. Learn in-demand skills, 
              advance your career, and achieve your dreams with our world-class platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 h-auto">
                Start Learning Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-8 py-4 h-auto">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-yellow-800" />
                </div>
                <div className="text-3xl font-bold mb-2">4.9/5</div>
                <div className="text-sm opacity-80">Average Rating</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-green-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-800" />
                </div>
                <div className="text-3xl font-bold mb-2">50M+</div>
                <div className="text-sm opacity-80">Active Learners</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-blue-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-800" />
                </div>
                <div className="text-3xl font-bold mb-2">10K+</div>
                <div className="text-sm opacity-80">Expert Courses</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="bg-orange-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-orange-800" />
                </div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className="text-lg mb-6 opacity-90">Trusted by professionals at</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm">Google</div>
              <div className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm">Microsoft</div>
              <div className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm">Amazon</div>
              <div className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm">Netflix</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
