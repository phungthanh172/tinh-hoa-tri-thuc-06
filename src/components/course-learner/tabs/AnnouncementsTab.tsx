
import React from 'react';
import { Bell, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AnnouncementsTab: React.FC = () => {
  const announcements = [
    {
      id: '1',
      title: 'New Course Content Added!',
      content: 'I\'ve just added 3 new lectures covering advanced JavaScript concepts. Check out the "Async Programming" section.',
      author: 'Jonas Schmedtmann',
      date: '2024-01-15',
      isNew: true
    },
    {
      id: '2',
      title: 'Course Resources Updated',
      content: 'All downloadable resources have been updated with the latest examples and practice files.',
      author: 'Jonas Schmedtmann',
      date: '2024-01-10',
      isNew: false
    },
    {
      id: '3',
      title: 'Live Q&A Session This Friday',
      content: 'Join me for a live Q&A session this Friday at 3 PM EST. I\'ll be answering questions about the course content and JavaScript in general.',
      author: 'Jonas Schmedtmann',
      date: '2024-01-08',
      isNew: false
    }
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto w-full">
      <Card className="bg-white border-gray-200 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900">
            <Bell className="w-5 h-5" />
            <span>Announcements</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="bg-white border-gray-200 shadow rounded-lg">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h3 className="text-gray-900 font-semibold">{announcement.title}</h3>
                  {announcement.isNew && (
                    <Badge className="bg-red-600 text-white">New</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-gray-400 text-sm mt-2 md:mt-0">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(announcement.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <p className="text-gray-800 mb-3">{announcement.content}</p>
              
              <div className="text-sm text-gray-500">
                By {announcement.author}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsTab;
