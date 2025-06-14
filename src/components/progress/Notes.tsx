
import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  lectureId?: string;
  lectureName?: string;
}

interface NotesProps {
  courseId: string;
  courseName: string;
}

const Notes: React.FC<NotesProps> = ({ courseId, courseName }) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'JavaScript Variables',
      content: 'Variables can be declared using var, let, or const. Let and const are block-scoped while var is function-scoped.',
      timestamp: new Date('2024-01-20'),
      lectureId: '1',
      lectureName: 'JavaScript Fundamentals'
    },
    {
      id: '2',
      title: 'Important Concepts',
      content: 'Remember to practice the exercises and review the quiz questions regularly.',
      timestamp: new Date('2024-01-22')
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      timestamp: new Date()
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: '', content: '' });
    setIsAdding(false);
  };

  const handleEditNote = (id: string, title: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, title, content, timestamp: new Date() }
        : note
    ));
    setEditingId(null);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);
    const isEditing = editingId === note.id;

    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Note title..."
              />
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Write your note here..."
                rows={4}
              />
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => handleEditNote(note.id, editTitle, editContent)}
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setEditingId(null)}
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <div className="flex space-x-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setEditingId(note.id)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3 whitespace-pre-wrap">{note.content}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{note.timestamp.toLocaleDateString()}</span>
                {note.lectureName && (
                  <Badge variant="outline">{note.lectureName}</Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Course Notes</span>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </CardTitle>
        </CardHeader>
        {isAdding && (
          <CardContent>
            <div className="space-y-3">
              <Input
                value={newNote.title}
                onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Note title..."
              />
              <Textarea
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your note here..."
                rows={4}
              />
              <div className="flex space-x-2">
                <Button onClick={handleAddNote}>
                  <Save className="w-4 h-4 mr-1" />
                  Save Note
                </Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <div>
        {notes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No notes yet. Start taking notes to track your learning!</p>
            </CardContent>
          </Card>
        ) : (
          notes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
