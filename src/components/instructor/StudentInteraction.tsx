import React, { useState } from 'react';
import { MessageSquare, Send, Bell, Users, Filter, Search, Calendar, Video, Pin, Archive, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const StudentInteraction = () => {
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [replyText, setReplyText] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState('all');
  const [showOfficeHours, setShowOfficeHours] = useState(false);
  const [newOfficeHour, setNewOfficeHour] = useState({ title: '', date: '', time: '', duration: '' });

  const questions = [
    {
      id: '1',
      student: 'Alice Johnson',
      avatar: '/placeholder.svg',
      course: 'JavaScript Fundamentals',
      question: 'Can you explain the difference between let and var in JavaScript?',
      timestamp: '2 hours ago',
      status: 'unanswered',
      priority: 'high',
      upvotes: 15,
      replies: 0,
      tags: ['variables', 'fundamentals']
    },
    {
      id: '2',
      student: 'Bob Smith',
      avatar: '/placeholder.svg',
      course: 'React for Beginners',
      question: 'How do I handle form validation in React? I\'ve tried several approaches but none seem to work properly.',
      timestamp: '1 day ago',
      status: 'answered',
      priority: 'medium',
      upvotes: 8,
      replies: 2,
      tags: ['forms', 'validation', 'react']
    },
    {
      id: '3',
      student: 'Charlie Brown',
      avatar: '/placeholder.svg',
      course: 'JavaScript Fundamentals',
      question: 'My async function is not working as expected. Can you help debug this?',
      timestamp: '2 days ago',
      status: 'pending',
      priority: 'high',
      upvotes: 12,
      replies: 1,
      tags: ['async', 'debugging']
    }
  ];

  const announcements = [
    {
      id: '1',
      title: 'New Course Section Added',
      content: 'I\'ve added a new section on advanced JavaScript concepts. Check it out! This includes ES6+ features and modern JavaScript patterns.',
      timestamp: '3 days ago',
      course: 'JavaScript Fundamentals',
      type: 'course-update',
      recipients: 156,
      readCount: 89
    },
    {
      id: '2',
      title: 'Live Q&A Session Scheduled',
      content: 'Join me for a live Q&A session this Friday at 3 PM EST. We\'ll cover common questions and advanced topics.',
      timestamp: '1 week ago',
      course: 'All Courses',
      type: 'live-session',
      recipients: 324,
      readCount: 267
    }
  ];

  const officeHours = [
    {
      id: '1',
      title: 'JavaScript Fundamentals Q&A',
      date: '2024-02-15',
      time: '15:00',
      duration: '60 minutes',
      attendees: 23,
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'React Best Practices',
      date: '2024-02-10',
      time: '14:00',
      duration: '45 minutes',
      attendees: 18,
      status: 'completed'
    }
  ];

  const directMessages = [
    {
      id: '1',
      student: 'Emma Wilson',
      avatar: '/placeholder.svg',
      lastMessage: 'Thank you for the detailed explanation about closures!',
      timestamp: '1 hour ago',
      unread: false,
      course: 'JavaScript Fundamentals'
    },
    {
      id: '2',
      student: 'David Lee',
      avatar: '/placeholder.svg',
      lastMessage: 'Could you review my final project when you have time?',
      timestamp: '3 hours ago',
      unread: true,
      course: 'React for Beginners'
    }
  ];

  const filteredQuestions = questions.filter(q => {
    if (filterBy === 'unanswered') return q.status === 'unanswered';
    if (filterBy === 'high-priority') return q.priority === 'high';
    if (filterBy === 'recent') return new Date().getTime() - new Date(q.timestamp).getTime() < 86400000;
    return true;
  });

  const handleSendAnnouncement = () => {
    if (newAnnouncement.trim()) {
      console.log('Sending announcement:', newAnnouncement);
      setNewAnnouncement('');
    }
  };

  const handleReply = (questionId: string) => {
    if (replyText.trim()) {
      console.log('Replying to question:', questionId, replyText);
      setReplyText('');
      setSelectedQuestion(null);
    }
  };

  const handleScheduleOfficeHours = () => {
    if (newOfficeHour.title && newOfficeHour.date && newOfficeHour.time) {
      console.log('Scheduling office hours:', newOfficeHour);
      setNewOfficeHour({ title: '', date: '', time: '', duration: '' });
      setShowOfficeHours(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="questions">Q&A Management</TabsTrigger>
          <TabsTrigger value="messages">Direct Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="office-hours">Office Hours</TabsTrigger>
          <TabsTrigger value="reviews">Review Responses</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Student Questions</span>
                  <Badge variant="destructive">{questions.filter(q => q.status === 'unanswered').length} unanswered</Badge>
                </CardTitle>
                <div className="flex space-x-2">
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All questions</SelectItem>
                      <SelectItem value="unanswered">Unanswered</SelectItem>
                      <SelectItem value="high-priority">High priority</SelectItem>
                      <SelectItem value="recent">Recent (24h)</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search questions..." className="pl-10 w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredQuestions.map((question) => (
                  <div key={question.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-3 flex-1">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={question.avatar} />
                          <AvatarFallback>{question.student[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{question.student}</h4>
                            <Badge variant="outline">{question.course}</Badge>
                            <Badge variant={
                              question.status === 'unanswered' ? 'destructive' : 
                              question.status === 'answered' ? 'default' : 'secondary'
                            }>
                              {question.status}
                            </Badge>
                            {question.priority === 'high' && (
                              <Badge className="bg-red-600 text-white">High Priority</Badge>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{question.question}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{question.timestamp}</span>
                            <span>{question.upvotes} upvotes</span>
                            <span>{question.replies} replies</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Pin className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedQuestion(question.id === selectedQuestion ? null : question.id)}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                    
                    {selectedQuestion === question.id && (
                      <div className="mt-4 ml-13 space-y-2">
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your detailed response..."
                          className="min-h-[120px]"
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleReply(question.id)}>
                            <Send className="w-4 h-4 mr-2" />
                            Send Reply
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setSelectedQuestion(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Direct Messages</span>
                <Badge>{directMessages.filter(m => m.unread).length} unread</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {directMessages.map((message) => (
                  <div key={message.id} className={`flex items-center space-x-3 p-3 rounded-lg border ${message.unread ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.student[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{message.student}</h4>
                        <span className="text-sm text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600">{message.course}</p>
                      <p className="text-gray-700">{message.lastMessage}</p>
                    </div>
                    {message.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Send Announcement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Announcement title..." />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course(s)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="js">JavaScript Fundamentals</SelectItem>
                    <SelectItem value="react">React for Beginners</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                placeholder="Write an announcement for your students..."
                className="min-h-[120px]"
              />
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <span className="text-sm">Send email notification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <span className="text-sm">Pin announcement</span>
                </div>
              </div>
              <Button onClick={handleSendAnnouncement}>
                <Send className="w-4 h-4 mr-2" />
                Send Announcement
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <Badge variant={announcement.type === 'live-session' ? 'default' : 'secondary'}>
                        {announcement.type}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-2">{announcement.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Badge variant="outline">{announcement.course}</Badge>
                      <span>{announcement.timestamp}</span>
                      <span>{announcement.recipients} recipients</span>
                      <span>{announcement.readCount} read</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="office-hours" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Office Hours & Live Sessions</span>
                </CardTitle>
                <Button onClick={() => setShowOfficeHours(!showOfficeHours)}>
                  <Video className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {showOfficeHours && (
                <div className="border rounded-lg p-4 bg-blue-50 space-y-4">
                  <h4 className="font-medium">Schedule New Office Hours</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Session title..."
                      value={newOfficeHour.title}
                      onChange={(e) => setNewOfficeHour({...newOfficeHour, title: e.target.value})}
                    />
                    <Input 
                      type="date"
                      value={newOfficeHour.date}
                      onChange={(e) => setNewOfficeHour({...newOfficeHour, date: e.target.value})}
                    />
                    <Input 
                      type="time"
                      value={newOfficeHour.time}
                      onChange={(e) => setNewOfficeHour({...newOfficeHour, time: e.target.value})}
                    />
                    <Select value={newOfficeHour.duration} onValueChange={(value) => setNewOfficeHour({...newOfficeHour, duration: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleScheduleOfficeHours}>Schedule</Button>
                    <Button variant="outline" onClick={() => setShowOfficeHours(false)}>Cancel</Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                {officeHours.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{session.title}</h4>
                      <p className="text-sm text-gray-600">
                        {session.date} at {session.time} • {session.duration}
                      </p>
                      <p className="text-sm text-gray-500">{session.attendees} registered</p>
                    </div>
                    <Badge variant={session.status === 'scheduled' ? 'default' : 'secondary'}>
                      {session.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Course Reviews to Respond</span>
                <Badge>3 pending</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">John Doe</span>
                        <div className="flex text-yellow-400">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">Amazing course! Really helped me understand JavaScript concepts.</p>
                      <Textarea placeholder="Reply to this review..." className="mb-2" />
                      <Button size="sm">Send Response</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentInteraction;
