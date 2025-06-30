
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Clock, BookOpen, Award } from 'lucide-react';
import ProgressGamification from '@/components/gamification/ProgressGamification';

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
    <div className="space-y-8">
      {/* Gamification Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Your Learning Journey</h2>
        <ProgressGamification />
      </div>

      {/* Continue Learning Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrolledCourses.slice(0, 2).map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-32 h-24 object-cover rounded-l-lg"
                  />
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold mb-1 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                        <span>{course.progress}% complete</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">Next: {course.nextLesson}</span>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Play className="w-4 h-4 mr-1" />
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{learningStats.totalHours}h</div>
            <div className="text-sm text-gray-600">Total Hours</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{learningStats.coursesCompleted}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{learningStats.certificatesEarned}</div>
            <div className="text-sm text-gray-600">Certificates</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-2xl">🔥</div>
            <div className="text-2xl font-bold">{learningStats.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Learning Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Progress this week</span>
              <span>{learningStats.weeklyProgress} / {learningStats.weeklyGoal} hours</span>
            </div>
            <Progress value={(learningStats.weeklyProgress / learningStats.weeklyGoal) * 100} />
            <p className="text-sm text-gray-600">
              {learningStats.weeklyGoal - learningStats.weeklyProgress > 0 
                ? `${learningStats.weeklyGoal - learningStats.weeklyProgress} hours remaining to reach your goal`
                : 'Goal achieved! 🎉'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
