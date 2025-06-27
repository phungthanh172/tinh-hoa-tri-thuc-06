
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Play, 
  Download,
  Star,
  Calendar,
  Bell,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, type: "course", message: "New lecture added to JavaScript Course", time: "1 hour ago", read: false },
    { id: 2, type: "announcement", message: "Course sale: 50% off all Python courses", time: "3 hours ago", read: false },
    { id: 3, type: "achievement", message: "You earned the 'Consistent Learner' badge!", time: "1 day ago", read: false }
  ]);

  const enrolledCourses = [
    {
      id: 1,
      title: "The Complete JavaScript Course 2024",
      instructor: "Jonas Schmedtmann",
      progress: 75,
      totalLessons: 320,
      completedLessons: 240,
      duration: "69h",
      nextLesson: "Async/Await in JavaScript",
      thumbnail: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop",
      lastAccessed: "2 hours ago"
    },
    {
      id: 2,
      title: "React - The Complete Guide 2024",
      instructor: "Maximilian Schwarzmüller",
      progress: 45,
      totalLessons: 835,
      completedLessons: 376,
      duration: "48.5h",
      nextLesson: "React Hooks Deep Dive",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      lastAccessed: "1 day ago"
    }
  ];

  const recentAchievements = [
    { id: 1, title: "JavaScript Master", description: "Completed 5 JavaScript courses", icon: "🏆", date: "2 days ago" },
    { id: 2, title: "Quick Learner", description: "Finished a course in under a week", icon: "⚡", date: "1 week ago" },
    { id: 3, title: "Discussion Expert", description: "Answered 10 student questions", icon: "💬", date: "2 weeks ago" }
  ];

  const upcomingDeadlines = [
    { id: 1, course: "JavaScript Course", task: "Final Project Submission", dueDate: "Dec 25, 2024", priority: "high" },
    { id: 2, course: "React Course", task: "Quiz: React Hooks", dueDate: "Dec 28, 2024", priority: "medium" }
  ];

  const learningStats = {
    totalHours: 156,
    coursesCompleted: 8,
    certificatesEarned: 6,
    currentStreak: 15,
    weeklyGoal: 10,
    weeklyProgress: 7
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
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
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-white text-gray-800">
                    {course.progress}% Complete
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">By {course.instructor}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    <span>{course.duration}</span>
                  </div>
                  <Progress value={course.progress} className="mb-3" />
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link to={`/course/${course.id}/learn`}>Continue Learning</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/course/${course.id}`}>Course Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Learning Hours</span>
                    <span className="text-lg font-bold">{learningStats.totalHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Courses Completed</span>
                    <span className="text-lg font-bold">{learningStats.coursesCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Certificates Earned</span>
                    <span className="text-lg font-bold">{learningStats.certificatesEarned}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Streak</span>
                    <span className="text-lg font-bold">{learningStats.currentStreak} days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-semibold text-sm">{deadline.task}</p>
                        <p className="text-xs text-gray-600">{deadline.course}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{deadline.dueDate}</p>
                        <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                          {deadline.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAchievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  <p className="text-xs text-gray-500">{achievement.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Notifications
                <Button size="sm" variant="outline" onClick={handleMarkAllNotificationsRead}>
                  Mark All Read
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`flex items-start space-x-3 p-3 border rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
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

export default StudentDashboard;
