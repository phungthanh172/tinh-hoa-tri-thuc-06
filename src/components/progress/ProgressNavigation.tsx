
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Play, Trophy, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ProgressNavigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewProgress = () => {
    if (!user) {
      toast.error('Please log in to view your learning progress');
      navigate('/auth');
      return;
    }
    navigate('/learning-progress');
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Track Your Learning Progress</h3>
              <p className="text-gray-600 mt-1">
                Monitor video progress, take quizzes, and earn certificates
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Play className="w-4 h-4" />
                <span>Video Tracking</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span>Quiz System</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>Certificates</span>
              </div>
            </div>
            
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleViewProgress}
            >
              View Progress
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressNavigation;
