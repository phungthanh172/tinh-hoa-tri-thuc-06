
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
      <div className="p-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold border-none p-0 focus:ring-0 bg-transparent"
                placeholder="Note title..."
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{note.title}</h1>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              <span>Updated {note.updatedAt.toLocaleDateString()}</span>
            </div>
            
            {isEditing ? (
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {isEditing ? (
          <div className="h-full p-6">
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
                content_style: `
                  body { 
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                    font-size: 16px;
                    line-height: 1.6;
                    color: #374151;
                    max-width: none;
                    margin: 0;
                    padding: 0;
                  }
                `,
                skin: 'oxide',
                content_css: 'default'
              }}
            />
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <article className="max-w-4xl mx-auto px-6 py-8">
              <div 
                className="prose prose-lg prose-gray max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0
                  prose-h2:text-2xl prose-h2:mb-5 prose-h2:mt-8
                  prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6
                  prose-p:text-gray-700 prose-p:leading-7 prose-p:mb-4
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:mb-4 prose-ol:mb-4
                  prose-li:mb-1 prose-li:text-gray-700
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-200 
                  prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
                  prose-img:rounded-lg prose-img:shadow-md
                  prose-table:border-collapse prose-table:border prose-table:border-gray-300
                  prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:p-2
                  prose-td:border prose-td:border-gray-300 prose-td:p-2"
                dangerouslySetInnerHTML={{ __html: note.content }} 
              />
            </article>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
