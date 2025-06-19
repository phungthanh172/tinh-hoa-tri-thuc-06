
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen, Award, Target, TrendingUp, Calendar } from 'lucide-react';

const StudentAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const progressData = [
    { course: 'JavaScript Fundamentals', progress: 85, timeSpent: 24, quizScore: 88 },
    { course: 'React for Beginners', progress: 45, timeSpent: 12, quizScore: 92 },
    { course: 'Node.js Advanced', progress: 22, timeSpent: 8, quizScore: 0 },
    { course: 'Python Basics', progress: 100, timeSpent: 18, quizScore: 85 }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5, lectures: 3 },
    { day: 'Tue', hours: 1.8, lectures: 2 },
    { day: 'Wed', hours: 3.2, lectures: 4 },
    { day: 'Thu', hours: 0.5, lectures: 1 },
    { day: 'Fri', hours: 2.1, lectures: 3 },
    { day: 'Sat', hours: 4.0, lectures: 5 },
    { day: 'Sun', hours: 1.5, lectures: 2 }
  ];

  const skillDistribution = [
    { skill: 'Frontend Development', level: 75, color: '#8884d8' },
    { skill: 'Backend Development', level: 45, color: '#82ca9d' },
    { skill: 'Database Management', level: 30, color: '#ffc658' },
    { skill: 'DevOps', level: 20, color: '#ff7300' }
  ];

  const achievements = [
    { title: 'Course Completer', description: 'Completed first course', earned: true, date: '2024-01-15' },
    { title: 'Quiz Master', description: 'Scored 90%+ on 5 quizzes', earned: true, date: '2024-01-22' },
    { title: 'Consistent Learner', description: 'Studied 7 days in a row', earned: false, progress: 5 },
    { title: 'Speed Learner', description: 'Completed course in under 30 days', earned: true, date: '2024-02-10' }
  ];

  const totalHours = weeklyActivity.reduce((sum, day) => sum + day.hours, 0);
  const avgQuizScore = progressData.reduce((sum, course) => sum + course.quizScore, 0) / progressData.filter(c => c.quizScore > 0).length;
  const completedCourses = progressData.filter(course => course.progress === 100).length;
  const overallProgress = progressData.reduce((sum, course) => sum + course.progress, 0) / progressData.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Learning Analytics</h2>
        <Badge variant="outline" className="text-lg px-3 py-1">
          Overall Progress: {overallProgress.toFixed(0)}%
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold">{totalHours.toFixed(1)}</p>
                <p className="text-xs text-green-600">This week</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Courses</p>
                <p className="text-2xl font-bold">{completedCourses}</p>
                <p className="text-xs text-gray-500">out of {progressData.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Quiz Score</p>
                <p className="text-2xl font-bold">{avgQuizScore.toFixed(0)}%</p>
                <p className="text-xs text-purple-600">Excellent!</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievements</p>
                <p className="text-2xl font-bold">{achievements.filter(a => a.earned).length}</p>
                <p className="text-xs text-orange-600">Badges earned</p>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList>
          <TabsTrigger value="progress">Course Progress</TabsTrigger>
          <TabsTrigger value="activity">Weekly Activity</TabsTrigger>
          <TabsTrigger value="skills">Skill Development</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {progressData.map((course, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{course.course}</h4>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.timeSpent}h
                        </span>
                        {course.quizScore > 0 && (
                          <Badge variant={course.quizScore >= 80 ? "default" : "secondary"}>
                            Quiz: {course.quizScore}%
                          </Badge>
                        )}
                        <Badge variant={course.progress === 100 ? "default" : "outline"}>
                          {course.progress}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={course.progress} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Learning Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8884d8" name="Hours" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{totalHours.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">Total Hours This Week</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {weeklyActivity.reduce((sum, day) => sum + day.lectures, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Lectures Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skill Development Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillDistribution.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.skill}</span>
                      <Badge variant="outline">{skill.level}%</Badge>
                    </div>
                    <Progress value={skill.level} className="h-3" />
                    <div className="text-xs text-gray-500">
                      {skill.level < 30 ? 'Beginner' : skill.level < 70 ? 'Intermediate' : 'Advanced'} Level
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{achievement.title}</h4>
                      {achievement.earned ? (
                        <Award className="w-5 h-5 text-green-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    {achievement.earned ? (
                      <div className="flex items-center text-xs text-green-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        Earned on {achievement.date}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{achievement.progress}/7</span>
                        </div>
                        <Progress value={(achievement.progress! / 7) * 100} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAnalytics;
