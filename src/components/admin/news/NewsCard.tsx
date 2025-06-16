
import React from 'react';
import { Calendar, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { FeatureNews } from '../ManagerFeatureNews';

interface NewsCardProps {
  news: FeatureNews;
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={`https://images.unsplash.com/${news.image}?w=400&h=200&fit=crop`}
            alt={news.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge 
            variant={news.isActive ? "default" : "secondary"}
            className="absolute top-2 right-2"
          >
            {news.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{news.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{news.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {format(new Date(news.publishDate), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              View Details
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
