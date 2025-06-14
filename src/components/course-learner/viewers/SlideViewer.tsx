
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SlideViewerProps {
  title: string;
  totalSlides?: number;
}

const SlideViewer: React.FC<SlideViewerProps> = ({ title, totalSlides = 12 }) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <Card className="w-full h-full min-h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center border rounded-b-lg relative">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-20 h-16 bg-blue-500 mx-auto rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">SLIDE</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">JavaScript Fundamentals</h3>
              <p className="text-gray-600 mt-2">Understanding variables, functions, and scope</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-700">
                This slide presentation covers the core concepts of JavaScript programming language.
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={prevSlide}
              disabled={currentSlide === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentSlide} / {totalSlides}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={nextSlide}
              disabled={currentSlide === totalSlides}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SlideViewer;
