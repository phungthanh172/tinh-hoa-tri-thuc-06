
import React, { useState, useRef } from 'react';
import { X, Save, FileText, RefreshCw, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface EnhancedNoteCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

const EnhancedNoteCreationForm = ({ isOpen, onClose, onSave }: EnhancedNoteCreationFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isRerolling, setIsRerolling] = useState(false);
  const editorRef = useRef<any>(null);

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

  const handleRerollNote = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title to generate content');
      return;
    }

    setIsRerolling(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const generatedContent = `
        <h2>${title}</h2>
        <p>This is AI-generated content based on your title: <strong>${title}</strong></p>
        <ul>
          <li>Key insight about ${title}</li>
          <li>Important considerations</li>
          <li>Next steps and action items</li>
        </ul>
        <blockquote>
          <p>Remember to review and customize this content to match your specific needs.</p>
        </blockquote>
      `;
      
      setContent(generatedContent);
      setIsRerolling(false);
      toast.success('Content generated successfully!');
    }, 2000);
  };

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-[450px] h-[700px] shadow-xl border-blue-200 flex flex-col">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6" />
              <CardTitle className="text-lg">Enhanced Note Creator</CardTitle>
              <Badge variant="secondary" className="bg-blue-800 text-blue-100">
                <Sparkles className="w-3 h-3 mr-1" />
                AI
              </Badge>
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
            <div className="flex space-x-2">
              <Input
                id="note-title"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleRerollNote}
                disabled={!title.trim() || isRerolling}
                className="bg-purple-600 hover:bg-purple-700"
                title="Generate AI content"
              >
                {isRerolling ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 flex-1 flex flex-col">
            <label htmlFor="note-content" className="text-sm font-medium text-gray-700">
              Content
            </label>
            <div className="flex-1">
              <Editor
                apiKey="kmcedy9ul404vlmhecvhrq3vw9pwr9izf5ajsp71leoew9zc"
                onInit={(evt, editor) => editorRef.current = editor}
                value={content}
                onEditorChange={handleEditorChange}
                init={{
                  height: 350,
                  width: '100%',
                  menubar: false,
                  resize: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright | bullist numlist | ' +
                    'link | help',
                  content_style: `
                    body { 
                      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                      font-size: 14px;
                      line-height: 1.4;
                      color: #374151;
                      margin: 8px;
                    }
                  `,
                  skin: 'oxide',
                  content_css: 'default',
                  placeholder: 'Write your note or click the AI button to generate content...'
                }}
              />
            </div>
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

export default EnhancedNoteCreationForm;
