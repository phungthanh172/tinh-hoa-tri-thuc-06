
import React, { useState } from 'react';
import { MessageSquare, Send, Bell, Users, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const StudentInteraction = () => {
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [replyText, setReplyText] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const questions = [
    {
      id: '1',
      student: 'Alice Johnson',
      avatar: '/placeholder.svg',
      course: 'JavaScript Fundamentals',
      question: 'Can you explain the difference between let and var in JavaScript?',
      timestamp: '2 hours ago',
      status: 'unanswered',
      replies: 0
    },
    {
      id: '2',
      student: 'Bob Smith',
      avatar: '/placeholder.svg',
      course: 'React for Beginners',
      question: 'How do I handle form validation in React?',
      timestamp: '1 day ago',
      status: 'answered',
      replies: 2
    }
  ];

  const announcements = [
    {
      id: '1',
      title: 'New Course Section Added',
      content: 'I\'ve added a new section on advanced JavaScript concepts. Check it out!',
      timestamp: '3 days ago',
      course: 'JavaScript Fundamentals'
    }
  ];

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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="questions">Q&A</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Student Questions</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search questions..." className="pl-10 w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((question) => (
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
                            <Badge variant={question.status === 'unanswered' ? 'destructive' : 'default'}>
                              {question.status}
                            </Badge>
                          </div>
                          <p className="text-gray-700 mb-2">{question.question}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{question.timestamp}</span>
                            <span>{question.replies} replies</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedQuestion(question.id === selectedQuestion ? null : question.id)}
                      >
                        Reply
                      </Button>
                    </div>
                    
                    {selectedQuestion === question.id && (
                      <div className="mt-4 ml-13 space-y-2">
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply..."
                          className="min-h-[80px]"
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

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Send Announcement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                placeholder="Write an announcement for your students..."
                className="min-h-[100px]"
              />
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
                    <h4 className="font-medium">{announcement.title}</h4>
                    <p className="text-gray-700 mt-1">{announcement.content}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <Badge variant="outline">{announcement.course}</Badge>
                      <span>{announcement.timestamp}</span>
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

export default StudentInteraction;
