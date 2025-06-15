
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface FormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  jobTitle: string;
}

const InactivityPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    jobTitle: ''
  });

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    let lastActivity = Date.now();

    const resetTimer = () => {
      lastActivity = Date.now();
      clearTimeout(inactivityTimer);
      
      inactivityTimer = setTimeout(() => {
        if (Date.now() - lastActivity >= 60000) {
          setIsOpen(true);
        }
      }, 60000);
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Start the timer
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    setIsOpen(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      company: '',
      jobTitle: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="flex">
          {/* Featured News Thumbnail */}
          <div className="w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop" 
              alt="Featured News"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold mb-2">Featured News</h3>
              <p className="text-sm opacity-90">Stay updated with the latest in online learning and professional development.</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-1/2 p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold text-gray-900">
                Get Exclusive Updates
              </DialogTitle>
              <p className="text-sm text-gray-600">
                Join thousands of learners and get personalized course recommendations.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Company
                </Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Enter your company name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder="Enter your job title"
                  className="mt-1"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Get Updates
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Maybe Later
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InactivityPopup;
