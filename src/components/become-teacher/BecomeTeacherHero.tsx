
import React from 'react';
import { Zap, GraduationCap, PlayCircle, BookOpen, Users, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface PlatformStat {
  number: string;
  label: string;
  growth: string;
}

interface BecomeTeacherHeroProps {
  platformStats: PlatformStat[];
}

const BecomeTeacherHero: React.FC<BecomeTeacherHeroProps> = ({ platformStats }) => {
  return (
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
              <div key={index} className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black mb-2 text-yellow-300">{stat.number}</div>
                <div className="text-sm opacity-90 mb-1">{stat.label}</div>
                <div className="text-xs text-green-300 font-medium">{stat.growth}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeTeacherHero;
