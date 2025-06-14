
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your 
            <span className="block text-yellow-300">Learning Journey?</span>
          </h2>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join millions of learners who have transformed their careers with our platform. 
            Start today with our 30-day money-back guarantee.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold text-lg px-8 py-4 h-auto">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold text-lg px-8 py-4 h-auto">
              View All Courses
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-lg">Instant Access</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-lg">30-Day Guarantee</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-lg">Lifetime Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
