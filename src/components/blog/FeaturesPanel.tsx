
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Target, Users, TrendingUp, Award } from 'lucide-react';

const FeaturesPanel = () => {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: 'AI-Powered Learning',
      description: 'Personalized course recommendations based on your learning style and goals.',
      status: 'New',
      color: 'bg-purple-500'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Interactive Coding Labs',
      description: 'Practice coding directly in your browser with real-time feedback.',
      status: 'Beta',
      color: 'bg-blue-500'
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Goal Tracking',
      description: 'Set learning goals and track your progress with detailed analytics.',
      status: 'Updated',
      color: 'bg-green-500'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Study Groups',
      description: 'Connect with peers and form study groups for collaborative learning.',
      status: 'Coming Soon',
      color: 'bg-orange-500'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Skill Assessment',
      description: 'Comprehensive skill evaluations to identify your strengths and areas for improvement.',
      status: 'New',
      color: 'bg-indigo-500'
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'Industry Certifications',
      description: 'Earn recognized certifications from leading technology companies.',
      status: 'Featured',
      color: 'bg-yellow-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-green-100 text-green-800';
      case 'Beta': return 'bg-blue-100 text-blue-800';
      case 'Updated': return 'bg-purple-100 text-purple-800';
      case 'Coming Soon': return 'bg-orange-100 text-orange-800';
      case 'Featured': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="sticky top-8">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-gray-50 to-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            New Features
          </CardTitle>
          <p className="text-sm text-gray-600">
            Discover the latest tools and features to enhance your learning experience
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="group cursor-pointer p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 border border-gray-100">
              <div className="flex items-start space-x-3">
                <div className={`${feature.color} p-2 rounded-lg text-white flex-shrink-0`}>
                  {feature.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm text-gray-900 group-hover:text-purple-600 transition-colors">
                      {feature.title}
                    </h4>
                    <Badge className={`text-xs ${getStatusColor(feature.status)}`}>
                      {feature.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full text-sm hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
            >
              View All Features
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesPanel;
