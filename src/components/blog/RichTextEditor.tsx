
import React, { useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link, Image, Code, Quote, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Write your content here..." 
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**'), title: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), title: 'Italic' },
    { icon: Code, action: () => insertMarkdown('`', '`'), title: 'Inline Code' },
    { icon: Quote, action: () => insertMarkdown('\n> ', ''), title: 'Quote' },
    { icon: List, action: () => insertMarkdown('\n- ', ''), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('\n1. ', ''), title: 'Numbered List' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), title: 'Link' },
    { icon: Image, action: () => insertMarkdown('![alt text](', ')'), title: 'Image' },
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex flex-wrap gap-1">
          {toolbarButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={button.action}
              title={button.title}
              className="h-8 w-8 p-0"
            >
              <button.icon className="w-4 h-4" />
            </Button>
          ))}
        </div>
        
        <Button
          variant={showPreview ? "default" : "outline"}
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          <Eye className="w-4 h-4 mr-2" />
          {showPreview ? 'Edit' : 'Preview'}
        </Button>
      </div>

      {/* Editor/Preview */}
      <div className="grid grid-cols-1 gap-4">
        {showPreview ? (
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {value || '*No content to preview*'}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={20}
            className="font-mono resize-y"
          />
        )}
      </div>

      {/* Markdown Tips */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2">Markdown Tips:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div><code># Header 1</code> - Large heading</div>
            <div><code>## Header 2</code> - Medium heading</div>
            <div><code>**bold**</code> - Bold text</div>
            <div><code>*italic*</code> - Italic text</div>
            <div><code>`code`</code> - Inline code</div>
            <div><code>```javascript</code> - Code block</div>
            <div><code>[link](url)</code> - Link</div>
            <div><code>![alt](image-url)</code> - Image</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RichTextEditor;
