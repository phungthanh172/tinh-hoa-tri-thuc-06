
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface NewsItem {
  id: number;
  title: string;
  image: string;
  date: string;
}

interface FeaturedNewsProps {
  news: NewsItem[];
}

const FeaturedNews = ({ news }: FeaturedNewsProps) => {
  return (
    <div className="sticky top-8">
      <Card className="shadow-lg border-0">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 text-sm text-gray-900">Featured News</h3>
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-lg mb-2 group-hover:opacity-90 transition-opacity shadow-sm"
                />
                <h4 className="font-medium text-sm group-hover:text-purple-600 transition-colors leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedNews;
