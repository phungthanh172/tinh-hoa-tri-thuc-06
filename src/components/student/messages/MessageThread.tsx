
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  instructor: string;
  course: string;
  avatar: string;
}

interface MessageThreadProps {
  conversation: Conversation;
  messages: Message[];
}

const MessageThread = ({ conversation, messages }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState('');

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={conversation.avatar} />
            <AvatarFallback>{conversation.instructor[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{conversation.instructor}</h3>
            <p className="text-sm text-gray-600">{conversation.course}</p>
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
  );
};

export default MessageThread;
