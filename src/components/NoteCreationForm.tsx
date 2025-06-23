
import React, { useState } from 'react';
import { X, Save, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface NoteCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

const NoteCreationForm = ({ isOpen, onClose, onSave }: NoteCreationFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your note');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please enter some content for your note');
      return;
    }

    onSave(title.trim(), content.trim());
    setTitle('');
    setContent('');
    onClose();
    toast.success('Note saved successfully!');
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] shadow-xl border-blue-200 flex flex-col">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6" />
              <CardTitle className="text-lg">Create Note</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="text-white hover:bg-blue-700 p-2 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="note-title" className="text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              id="note-title"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2 flex-1 flex flex-col">
            <label htmlFor="note-content" className="text-sm font-medium text-gray-700">
              Content
            </label>
            <Textarea
              id="note-content"
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 resize-none"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCreationForm;
