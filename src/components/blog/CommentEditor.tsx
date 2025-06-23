
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/ui/rich-text-editor';

interface CommentEditorProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  submitButtonText?: string;
  isReply?: boolean;
}

const CommentEditor = ({ 
  onSubmit, 
  placeholder = "Write your comment...",
  submitButtonText = "Post Comment",
  isReply = false
}: CommentEditorProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <div className="space-y-4">
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder={placeholder}
        height={isReply ? 150 : 200}
        simple={true}
      />
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Send className="w-4 h-4 mr-2" />
          {submitButtonText}
        </Button>
      </div>
    </div>
  );
};

export default CommentEditor;
