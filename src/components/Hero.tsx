
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Learn Skills That Matter
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Master in-demand skills with our comprehensive online courses. 
            Learn from industry experts and advance your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm opacity-90">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span>4.9/5 Rating</span>
            </div>
            <div>50,000+ Students</div>
            <div>100+ Courses</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
