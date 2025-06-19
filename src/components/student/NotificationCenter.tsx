
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Settings, 
  BookOpen, 
  Trophy, 
  MessageSquare, 
  TrendingUp,
  Calendar,
  Mail,
  Smartphone,
  Check,
  X,
  Star,
  Users,
  Video,
  Gift
} from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'course',
      icon: BookOpen,
      title: 'New lecture added',
      message: 'JavaScript Course: "Advanced Async Programming" has been added',
      time: '2 hours ago',
      read: false,
      courseId: 1,
      actionUrl: '/course/1/lecture/new'
    },
    {
      id: 2,
      type: 'achievement',
      icon: Trophy,
      title: 'Achievement unlocked!',
      message: 'You earned the "Consistent Learner" badge for 7-day streak',
      time: '1 day ago',
      read: false,
      courseId: null,
      actionUrl: '/profile/achievements'
    },
    {
      id: 3,
      type: 'qa',
      icon: MessageSquare,
      title: 'Question answered',
      message: 'Your question in React Course has been answered by the instructor',
      time: '3 days ago',
      read: true,
      courseId: 2,
      actionUrl: '/course/2/qa/question-123'
    },
    {
      id: 4,
      type: 'announcement',
      icon: TrendingUp,
      title: 'Course sale',
      message: '50% off all Python courses - Limited time offer!',
      time: '2 days ago',
      read: true,
      courseId: null,
      actionUrl: '/courses?category=python'
    },
    {
      id: 5,
      type: 'reminder',
      icon: Calendar,
      title: 'Assignment due soon',
      message: 'Your JavaScript final project is due in 2 days',
      time: '1 week ago',
      read: true,
      courseId: 1,
      actionUrl: '/course/1/assignments'
    },
    {
      id: 6,
      type: 'review',
      icon: Star,
      title: 'Instructor replied to your review',
      message: 'Sarah Wilson responded to your 5-star review on JavaScript Fundamentals',
      time: '4 days ago',
      read: false,
      courseId: 1,
      actionUrl: '/course/1/reviews'
    },
    {
      id: 7,
      type: 'live-session',
      icon: Video,
      title: 'Live Q&A session starting soon',
      message: 'JavaScript Fundamentals live session starts in 30 minutes',
      time: '5 hours ago',
      read: false,
      courseId: 1,
      actionUrl: '/course/1/live-session'
    },
    {
      id: 8,
      type: 'social',
      icon: Users,
      title: 'New discussion in your course',
      message: '5 new replies in "JavaScript Best Practices" discussion',
      time: '6 hours ago',
      read: false,
      courseId: 1,
      actionUrl: '/course/1/discussions'
    },
    {
      id: 9,
      type: 'promotion',
      icon: Gift,
      title: 'Special offer for you!',
      message: 'Get 30% off your next course purchase - expires in 3 days',
      time: '1 day ago',
      read: true,
      courseId: null,
      actionUrl: '/courses?promo=STUDENT30'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    courseUpdates: true,
    achievements: true,
    announcements: true,
    qaUpdates: true,
    reminders: true,
    reviewReplies: true,
    liveSessions: true,
    socialActivity: true,
    promotions: false,
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    instantEmail: false,
    dailySummary: true
  });

  const markAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const updateSetting = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const todayNotifications = notifications.filter(n => {
    const notifTime = new Date(Date.now() - parseInt(n.time.split(' ')[0]) * 3600000);
    const today = new Date();
    return notifTime.toDateString() === today.toDateString();
  });

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      course: BookOpen,
      achievement: Trophy,
      announcement: TrendingUp,
      qa: MessageSquare,
      reminder: Calendar,
      review: Star,
      'live-session': Video,
      social: Users,
      promotion: Gift
    };
    return iconMap[type as keyof typeof iconMap] || Bell;
  };

  const getNotificationColor = (type: string) => {
    const colorMap = {
      course: 'text-blue-600',
      achievement: 'text-yellow-600',
      announcement: 'text-purple-600',
      qa: 'text-green-600',
      reminder: 'text-orange-600',
      review: 'text-pink-600',
      'live-session': 'text-red-600',
      social: 'text-indigo-600',
      promotion: 'text-emerald-600'
    };
    return colorMap[type as keyof typeof colorMap] || 'text-gray-600';
  };

  const getPriorityBadge = (type: string) => {
    const priorityTypes = ['reminder', 'live-session', 'achievement'];
    return priorityTypes.includes(type);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            Stay updated with your learning progress and course announcements
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge className="bg-red-500">{unreadCount} unread</Badge>
          )}
          {todayNotifications.length > 0 && (
            <Badge variant="outline">{todayNotifications.length} today</Badge>
          )}
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
                <div className="text-sm text-gray-600">Unread</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{todayNotifications.length}</div>
                <div className="text-sm text-gray-600">Today</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{notifications.filter(n => n.type === 'course').length}</div>
                <div className="text-sm text-gray-600">Course Updates</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{notifications.filter(n => n.type === 'achievement').length}</div>
                <div className="text-sm text-gray-600">Achievements</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Notifications
                {notifications.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearAllNotifications}>
                    Clear All
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No notifications</h3>
                  <p className="text-gray-500">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    return (
                      <div 
                        key={notification.id} 
                        className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors cursor-pointer hover:bg-gray-50 ${
                          notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                        }`}
                        onClick={() => notification.actionUrl && console.log('Navigate to:', notification.actionUrl)}
                      >
                        <div className={`p-2 rounded-full bg-white ${getNotificationColor(notification.type)} relative`}>
                          <IconComponent className="w-5 h-5" />
                          {getPriorityBadge(notification.type) && !notification.read && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-sm">{notification.title}</h4>
                                {getPriorityBadge(notification.type) && (
                                  <Badge variant="destructive" className="text-xs">Priority</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                              <p className="text-xs text-gray-500">{notification.time}</p>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              {!notification.read && (
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Course Updates</h4>
                    <p className="text-sm text-gray-600">New lectures, course announcements, and content updates</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.courseUpdates}
                    onCheckedChange={(checked) => updateSetting('courseUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Q&A Updates</h4>
                    <p className="text-sm text-gray-600">Responses to your questions and new discussions</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.qaUpdates}
                    onCheckedChange={(checked) => updateSetting('qaUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Review Replies</h4>
                    <p className="text-sm text-gray-600">When instructors respond to your course reviews</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.reviewReplies}
                    onCheckedChange={(checked) => updateSetting('reviewReplies', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Live Sessions</h4>
                    <p className="text-sm text-gray-600">Office hours, webinars, and live Q&A sessions</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.liveSessions}
                    onCheckedChange={(checked) => updateSetting('liveSessions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Social Activity</h4>
                    <p className="text-sm text-gray-600">Discussion forums, community interactions, and peer activity</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.socialActivity}
                    onCheckedChange={(checked) => updateSetting('socialActivity', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Achievements & Badges</h4>
                    <p className="text-sm text-gray-600">Learning milestones and accomplishments</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.achievements}
                    onCheckedChange={(checked) => updateSetting('achievements', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Learning Reminders</h4>
                    <p className="text-sm text-gray-600">Assignment deadlines and study reminders</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.reminders}
                    onCheckedChange={(checked) => updateSetting('reminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Promotions & Offers</h4>
                    <p className="text-sm text-gray-600">Special deals, discounts, and promotional content</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.promotions}
                    onCheckedChange={(checked) => updateSetting('promotions', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-gray-600">Browser and mobile push notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Instant Email Alerts</h4>
                      <p className="text-sm text-gray-600">Immediate email for high-priority notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.instantEmail}
                    onCheckedChange={(checked) => updateSetting('instantEmail', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Daily Summary</h4>
                      <p className="text-sm text-gray-600">Daily digest of your activity and notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.dailySummary}
                    onCheckedChange={(checked) => updateSetting('dailySummary', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h4 className="font-medium">Weekly Digest</h4>
                      <p className="text-sm text-gray-600">Weekly summary of your learning progress</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.weeklyDigest}
                    onCheckedChange={(checked) => updateSetting('weeklyDigest', checked)}
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
