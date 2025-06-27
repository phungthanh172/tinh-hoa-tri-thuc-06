
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import OverviewTab from './dashboard/OverviewTab';
import CoursesTab from './dashboard/CoursesTab';
import ProgressTab from './dashboard/ProgressTab';
import AchievementsTab from './dashboard/AchievementsTab';
import NotificationsTab from './dashboard/NotificationsTab';

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
          <OverviewTab enrolledCourses={enrolledCourses} learningStats={learningStats} />
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <CoursesTab enrolledCourses={enrolledCourses} />
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <ProgressTab learningStats={learningStats} upcomingDeadlines={upcomingDeadlines} />
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <AchievementsTab recentAchievements={recentAchievements} />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <NotificationsTab notifications={notifications} onMarkAllRead={handleMarkAllNotificationsRead} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
