
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Star, 
  Clock, 
  User,
  MessageCircle
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const MessageCenter = () => {
  const [activeTab, setActiveTab] = useState('conversations');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      instructor: "Jonas Schmedtmann",
      course: "Complete JavaScript Course",
      lastMessage: "Great question about async/await! Let me explain...",
      timestamp: "2 hours ago",
      unread: 2,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      instructor: "Maximilian Schwarzmüller",
      course: "React Complete Guide",
      lastMessage: "Your solution to the exercise looks perfect!",
      timestamp: "1 day ago",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "student",
      content: "Hi Jonas, I'm having trouble understanding the difference between async/await and promises. Could you help explain?",
      timestamp: "3 hours ago"
    },
    {
      id: 2,
      sender: "instructor",
      content: "Great question! Async/await is actually built on top of promises and provides a cleaner syntax. Let me break it down for you...",
      timestamp: "2 hours ago"
    },
    {
      id: 3,
      sender: "instructor",
      content: "Think of async/await as syntactic sugar that makes promise-based code look more like synchronous code. Here's an example...",
      timestamp: "2 hours ago"
    }
  ];

  const forums = [
    {
      id: 1,
      title: "JavaScript Fundamentals Discussion",
      course: "Complete JavaScript Course",
      lastActivity: "5 minutes ago",
      replies: 24,
      participants: 156
    },
    {
      id: 2,
      title: "React Hooks Best Practices",
      course: "React Complete Guide",
      lastActivity: "1 hour ago",
      replies: 18,
      participants: 89
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages & Community</h1>
        <p className="text-gray-600">Connect with instructors and fellow students</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="conversations">Direct Messages</TabsTrigger>
          <TabsTrigger value="forums">Course Forums</TabsTrigger>
          <TabsTrigger value="compose">New Message</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Conversations</span>
                    <Badge variant="secondary">{conversations.length}</Badge>
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search conversations..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((conv) => (
                      <div key={conv.id} className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conv.avatar} />
                            <AvatarFallback>{conv.instructor[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-sm truncate">{conv.instructor}</h4>
                              {conv.unread > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {conv.unread}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mb-1">{conv.course}</p>
                            <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                            <p className="text-xs text-gray-500 mt-1">{conv.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message Thread */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={conversations[0].avatar} />
                      <AvatarFallback>{conversations[0].instructor[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{conversations[0].instructor}</h3>
                      <p className="text-sm text-gray-600">{conversations[0].course}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === 'student' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'student' ? 'text-purple-200' : 'text-gray-500'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forums" className="mt-6">
          <div className="space-y-4">
            {forums.map((forum) => (
              <Card key={forum.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{forum.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{forum.course}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{forum.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{forum.participants} participants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Last activity {forum.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">Join Discussion</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compose" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>New Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">To (Instructor)</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Select an instructor...</option>
                  <option>Jonas Schmedtmann</option>
                  <option>Maximilian Schwarzmüller</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input placeholder="Enter message subject..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  placeholder="Type your message here..."
                  className="min-h-[200px]"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Send Message</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessageCenter;
