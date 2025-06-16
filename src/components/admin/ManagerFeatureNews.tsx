
import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NewsCard from './news/NewsCard';
import FeatureNewsDialog from './news/FeatureNewsDialog';
import FeatureNewsManagementDialog from './news/FeatureNewsManagementDialog';

export interface FeatureNews {
  id: number;
  title: string;
  description: string;
  image: string;
  publishDate: string;
  isActive: boolean;
  priority: number;
}

const ManagerFeatureNews = () => {
  const [selectedNews, setSelectedNews] = useState<FeatureNews | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [isManagementOpen, setManagementOpen] = useState(false);

  // Mock data for feature news
  const [featureNews] = useState<FeatureNews[]>([
    {
      id: 1,
      title: "New AI-Powered Learning Platform",
      description: "Discover our revolutionary AI-powered learning platform that adapts to your learning style and pace.",
      image: "photo-1649972904349-6e44c42644a7",
      publishDate: "2024-06-15",
      isActive: true,
      priority: 1
    },
    {
      id: 2,
      title: "Advanced Programming Courses",
      description: "Master modern programming languages with our comprehensive course collection.",
      image: "photo-1488590528505-98d2b5aba04b",
      publishDate: "2024-06-14",
      isActive: true,
      priority: 2
    },
    {
      id: 3,
      title: "Industry Partnership Program",
      description: "Connect with leading tech companies through our exclusive partnership program.",
      image: "photo-1518770660439-4636190af475",
      publishDate: "2024-06-13",
      isActive: true,
      priority: 3
    }
  ]);

  const handleNewsClick = (news: FeatureNews) => {
    setSelectedNews(news);
    setDetailOpen(true);
  };

  const handleManageNews = () => {
    setManagementOpen(true);
  };

  // Get top 3 active news by priority
  const displayNews = featureNews
    .filter(news => news.isActive)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Feature News Management</span>
            <div className="flex items-center space-x-2">
              <Button onClick={handleManageNews} variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Manage News
              </Button>
              <Button onClick={handleManageNews}>
                <Plus className="w-4 h-4 mr-2" />
                Add News
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayNews.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                onClick={() => handleNewsClick(news)}
              />
            ))}
          </div>
          {displayNews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No active feature news to display. Click "Add News" to create your first news item.
            </div>
          )}
        </CardContent>
      </Card>

      <FeatureNewsDialog
        isOpen={isDetailOpen}
        onOpenChange={setDetailOpen}
        news={selectedNews}
      />

      <FeatureNewsManagementDialog
        isOpen={isManagementOpen}
        onOpenChange={setManagementOpen}
        newsList={featureNews}
      />
    </div>
  );
};

export default ManagerFeatureNews;
