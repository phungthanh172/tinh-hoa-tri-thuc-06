
import React, { useState, useEffect, useRef } from 'react';
import { Save, Clock, FileText, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Editor } from '@tinymce/tinymce-react';
import { Note } from '@/types/note';
import { toast } from 'sonner';

interface NoteEditorProps {
  note: Note;
  onUpdate: (noteId: string, updates: Partial<Note>) => void;
}

const NoteEditor = ({ note, onUpdate }: NoteEditorProps) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleSave = () => {
    onUpdate(note.id, {
      title,
      content,
      path: title // Update path to match title
    });
    setIsEditing(false);
    toast.success('Note saved');
  };

  const handleCancel = () => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-bold border-none p-0 focus:ring-0"
                placeholder="Note title..."
              />
            ) : (
              <h1 className="text-xl font-bold text-gray-900">{note.title}</h1>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>Updated {note.updatedAt.toLocaleDateString()}</span>
            </div>
            
            {isEditing ? (
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {isEditing ? (
          <Editor
            apiKey="no-api-key"
            onInit={(evt, editor) => editorRef.current = editor}
            value={content}
            onEditorChange={handleEditorChange}
            init={{
              height: '100%',
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        ) : (
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
