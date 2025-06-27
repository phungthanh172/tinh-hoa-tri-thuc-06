
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Award, TrendingUp, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  nextLesson: string;
  thumbnail: string;
  lastAccessed: string;
}

interface LearningStats {
  totalHours: number;
  coursesCompleted: number;
  certificatesEarned: number;
  currentStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface OverviewTabProps {
  enrolledCourses: Course[];
  learningStats: LearningStats;
}

const OverviewTab = ({ enrolledCourses, learningStats }: OverviewTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold">{enrolledCourses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                <p className="text-2xl font-bold">{learningStats.totalHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-2xl font-bold">{learningStats.certificatesEarned}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                <p className="text-2xl font-bold">{learningStats.currentStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrolledCourses.slice(0, 2).map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{course.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">Next: {course.nextLesson}</p>
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">{course.progress}% complete</p>
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/course/${course.id}/learn`}>
                      <Play className="w-4 h-4 mr-1" />
                      Continue
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goal */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Learning Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progress this week</span>
                <span className="text-sm text-gray-600">{learningStats.weeklyProgress}/{learningStats.weeklyGoal} hours</span>
              </div>
              <Progress value={(learningStats.weeklyProgress / learningStats.weeklyGoal) * 100} className="h-3" />
              <p className="text-sm text-gray-600">
                You're {learningStats.weeklyGoal - learningStats.weeklyProgress} hours away from your weekly goal!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OverviewTab;
