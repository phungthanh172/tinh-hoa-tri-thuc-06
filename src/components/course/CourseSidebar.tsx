
import React from 'react';
import { Play, Download, Smartphone, Monitor, Trophy, Share, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CourseSidebarProps {
  course: {
    image: string;
    title: string;
    price: number;
    originalPrice: number;
  };
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ course }) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <Card>
          <CardContent className="p-6">
            <div className="relative mb-6">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-48 object-cover rounded"
              />
              <Button 
                size="lg" 
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white bg-opacity-90 text-black hover:bg-opacity-100"
              >
                <Play className="w-6 h-6 ml-1" />
              </Button>
            </div>

            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-3xl font-bold">${course.price}</span>
                <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
              </div>
              <p className="text-red-600 font-semibold">75% off</p>
            </div>

            <div className="space-y-3 mb-6">
              <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                Add to cart
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                Buy now
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600 mb-6">
              30-Day Money-Back Guarantee
            </p>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold">This course includes:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4" />
                  <span>69 hours on-demand video</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>114 downloadable resources</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Access on mobile and TV</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm">
              <button className="flex items-center space-x-1 text-purple-600 hover:underline">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-1 text-purple-600 hover:underline">
                <Heart className="w-4 h-4" />
                <span>Gift this course</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseSidebar;
