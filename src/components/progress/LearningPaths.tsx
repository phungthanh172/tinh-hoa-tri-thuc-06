
import React from 'react';
import { BookOpen, Clock, Award, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/contexts/GamificationContext';

const LearningPaths: React.FC = () => {
  const { learningPaths, getLearningPathProgress, isLearningPathCompleted } = useGamification();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Learning Paths</h2>
        <p className="text-gray-600">Structured learning journeys to master new skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {learningPaths.map((path) => {
          const progress = getLearningPathProgress(path.id);
          const isCompleted = isLearningPathCompleted(path.id);

          return (
            <Card key={path.id} className="relative overflow-hidden">
              {isCompleted && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-100 text-green-800">
                    <Award className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                    <p className="text-gray-600 text-sm">{path.description}</p>
                  </div>
                </CardTitle>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{path.courses.length} courses</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{path.estimatedHours}h total</span>
                  </div>
                  <Badge className={getDifficultyColor(path.difficulty)}>
                    {path.difficulty}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-800">Certificate</span>
                  </div>
                  <h4 className="font-semibold text-purple-900">{path.certificate.title}</h4>
                  <p className="text-sm text-purple-700">{path.certificate.description}</p>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    View Courses
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                    {progress === 0 ? 'Start Path' : 'Continue'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPaths;
