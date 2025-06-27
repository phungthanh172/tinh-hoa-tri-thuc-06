
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, User, Clock } from 'lucide-react';

interface Forum {
  id: number;
  title: string;
  course: string;
  lastActivity: string;
  replies: number;
  participants: number;
}

interface ForumsListProps {
  forums: Forum[];
}

const ForumsList = ({ forums }: ForumsListProps) => {
  return (
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
  );
};

export default ForumsList;
