
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, Play, Star, Award } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  element?: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: string;
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Elite Education! 🎉',
    description: 'Ready to transform your career with world-class education? Let\'s take a quick tour of what makes us special.',
    position: 'bottom'
  },
  {
    id: 'courses',
    title: 'Discover Amazing Courses',
    description: 'Browse our curated collection of expert-led courses designed to accelerate your career growth.',
    element: '[data-tour="featured-courses"]',
    position: 'top'
  },
  {
    id: 'instructors',
    title: 'Learn from Industry Experts',
    description: 'Our world-class instructors bring real-world experience to every lesson.',
    element: '[data-tour="instructors"]',
    position: 'top'
  },
  {
    id: 'features',
    title: 'Premium Features',
    description: 'Enjoy industry-recognized certificates, career advancement support, and a global community.',
    element: '[data-tour="features"]',
    position: 'top'
  },
  {
    id: 'dashboard',
    title: 'Track Your Progress',
    description: 'Monitor your learning journey with detailed analytics and achievement badges.',
    position: 'bottom',
    action: 'Visit your dashboard to see progress tracking in action!'
  }
];

interface WelcomeTourProps {
  onComplete: () => void;
}

const WelcomeTour: React.FC<WelcomeTourProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  useEffect(() => {
    const tourCompleted = localStorage.getItem('welcome-tour-completed');
    if (!tourCompleted) {
      setIsOpen(true);
    } else {
      setHasSeenTour(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('welcome-tour-completed', 'true');
    setIsOpen(false);
    setHasSeenTour(true);
    onComplete();
  };

  const handleSkip = () => {
    localStorage.setItem('welcome-tour-completed', 'true');
    setIsOpen(false);
    setHasSeenTour(true);
  };

  const restartTour = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  if (hasSeenTour && !isOpen) {
    return (
      <Button
        onClick={restartTour}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 bg-white shadow-lg"
      >
        <Play className="w-4 h-4 mr-2" />
        Take Tour Again
      </Button>
    );
  }

  const currentTourStep = tourSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              {currentTourStep.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-purple-600'
                    : index < currentStep
                    ? 'bg-purple-300'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed">
            {currentTourStep.description}
          </p>

          {currentTourStep.action && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              💡 {currentTourStep.action}
            </Badge>
          )}

          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <span className="text-sm text-gray-500">
              {currentStep + 1} of {tourSteps.length}
            </span>

            <Button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            >
              {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < tourSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
              {currentStep === tourSteps.length - 1 && <Star className="w-4 h-4" />}
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={handleSkip}
            className="w-full text-sm text-gray-500 hover:text-gray-700"
          >
            Skip tour
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeTour;
