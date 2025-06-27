
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConversationsList from './messages/ConversationsList';
import MessageThread from './messages/MessageThread';
import ForumsList from './messages/ForumsList';
import ComposeMessage from './messages/ComposeMessage';

const MessageCenter = () => {
  const [activeTab, setActiveTab] = useState('conversations');

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
            <div className="lg:col-span-1">
              <ConversationsList conversations={conversations} />
            </div>
            <div className="lg:col-span-2">
              <MessageThread 
                conversation={conversations[0]} 
                messages={messages} 
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forums" className="mt-6">
          <ForumsList forums={forums} />
        </TabsContent>

        <TabsContent value="compose" className="mt-6">
          <ComposeMessage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessageCenter;
