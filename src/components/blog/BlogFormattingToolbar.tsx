
import React from 'react';
import { Bold, Italic, List, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface BlogFormattingToolbarProps {
  onInsertFormat: (format: string, wrapper?: string) => void;
}

const BlogFormattingToolbar = ({ onInsertFormat }: BlogFormattingToolbarProps) => {
  const formatButtons = [
    { icon: Bold, action: () => onInsertFormat('**', '**'), title: 'Bold' },
    { icon: Italic, action: () => onInsertFormat('*', '*'), title: 'Italic' },
    { icon: Quote, action: () => onInsertFormat('> '), title: 'Quote' },
    { icon: List, action: () => onInsertFormat('- '), title: 'List' },
  ];

  return (
    <div className="flex items-center space-x-2 p-2 border-b bg-gray-50">
      <span className="text-sm font-medium text-gray-600">Quick Format:</span>
      <Separator orientation="vertical" className="h-6" />
      {formatButtons.map((button, index) => (
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
  );
};

export default BlogFormattingToolbar;
