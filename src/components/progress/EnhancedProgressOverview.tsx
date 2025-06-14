
import React from 'react';
import { TrendingUp, Target, Calendar, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useProgress } from '@/contexts/ProgressContext';
import { useGamification } from '@/contexts/GamificationContext';

interface EnhancedProgressOverviewProps {
  courseId: string;
}

const EnhancedProgressOverview: React.FC<EnhancedProgressOverviewProps> = ({ courseId }) => {
  const { getCourseProgress } = useProgress();
  const { userProgress } = useGamification();
  const courseProgress = getCourseProgress(courseId);

  if (!courseProgress) return null;

  const completedLectures = courseProgress.lectures.filter(l => l.completed).length;
  const totalLectures = courseProgress.lectures.length;
  const completedQuizzes = courseProgress.quizzes.filter(q => q.completed).length;
  const totalQuizzes = courseProgress.quizzes.length;
  
  const averageQuizScore = courseProgress.quizzes.length > 0
    ? Math.round(courseProgress.quizzes.reduce((acc, quiz) => acc + quiz.score, 0) / courseProgress.quizzes.length)
    : 0;

  const estimatedCompletionDays = Math.ceil((100 - courseProgress.completionPercentage) / 10); // Mock calculation

  return (
    <div className="space-y-6">
      {/* Streak and Momentum */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Learning Streak</h3>
                <p className="text-gray-600">Keep up the momentum!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600">
                {userProgress.streakDays}
              </div>
              <div className="text-sm text-gray-600">consecutive days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {courseProgress.completionPercentage}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <Progress value={courseProgress.completionPercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Quiz Average</p>
                <p className="text-2xl font-bold text-blue-600">{averageQuizScore}%</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {completedQuizzes}/{totalQuizzes} quizzes completed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time to Complete</p>
                <p className="text-2xl font-bold text-purple-600">{estimatedCompletionDays}d</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Estimated at current pace
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {userProgress.achievements.length}
                </p>
              </div>
              <div className="text-2xl">🏆</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Badges earned
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {courseProgress.lectures.slice(0, 3).map((lecture, index) => (
              <div key={lecture.lectureId} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${lecture.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="text-sm">Lecture {index + 1}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={(lecture.watchTime / lecture.totalDuration) * 100} className="w-20 h-2" />
                  {lecture.completed && <Badge variant="secondary" className="text-xs">✓</Badge>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedProgressOverview;
