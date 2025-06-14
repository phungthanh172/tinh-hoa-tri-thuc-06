
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
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <span>Notes</span>
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create note
            </Button>
          </CardTitle>
        </CardHeader>
        
        {isCreating && (
          <CardContent className="border-t border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Note will be created at current video time: 08:45</span>
              </div>
              <Textarea
                placeholder="Write your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
              <div className="flex space-x-2">
                <Button onClick={handleCreateNote} className="bg-purple-600 hover:bg-purple-700">
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
          <Card key={note.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    {note.timestamp}
                  </Badge>
                  <span className="text-sm text-gray-400">{note.lectureTitle}</span>
                </div>
                <div className="flex space-x-1">
                  <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-gray-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-300 mb-2">{note.content}</p>
              
              <div className="text-xs text-gray-500">
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
