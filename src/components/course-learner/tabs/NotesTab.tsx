
import React, { useState } from 'react';
import { Plus, Clock, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface NotesTabProps {
  courseId: string;
}

const NotesTab: React.FC<NotesTabProps> = ({ courseId }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState('');

  const notes = [
    {
      id: '1',
      content: 'Variables in JavaScript can be declared using var, let, or const. Let and const are block-scoped.',
      timestamp: '05:30',
      lectureTitle: 'JavaScript Variables',
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      content: 'Remember: functions are first-class objects in JavaScript. They can be assigned to variables.',
      timestamp: '12:15',
      lectureTitle: 'Functions Deep Dive',
      createdAt: '1 day ago'
    }
  ];

  const handleCreateNote = () => {
    if (newNote.trim()) {
      // Create note with current video timestamp
      console.log('Creating note:', newNote);
      setNewNote('');
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto w-full">
      <Card className="bg-white border-gray-200 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gray-900">
            <span>Notes</span>
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create note
            </Button>
          </CardTitle>
        </CardHeader>
        
        {isCreating && (
          <CardContent className="border-t border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Note will be created at current video time: 08:45</span>
              </div>
              <Textarea
                placeholder="Write your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="bg-gray-100 border-gray-300 text-gray-900"
                rows={3}
              />
              <div className="flex space-x-2">
                <Button onClick={handleCreateNote} className="bg-purple-600 hover:bg-purple-700 text-white">
                  Save note
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="bg-white border-gray-200 shadow rounded-lg">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-purple-700 border-purple-400 bg-purple-50">
                    {note.timestamp}
                  </Badge>
                  <span className="text-sm text-gray-500">{note.lectureTitle}</span>
                </div>
                <div className="flex space-x-1 mt-2 md:mt-0">
                  <Button size="icon" variant="ghost" className="text-gray-500 hover:text-purple-700">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-gray-500 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-800 mb-2">{note.content}</p>
              
              <div className="text-xs text-gray-400">
                Created {note.createdAt}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotesTab;
