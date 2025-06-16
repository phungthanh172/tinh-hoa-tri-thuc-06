
import React, { useState } from 'react';
import { Bold, Italic, Code, Quote, List, ListOrdered, Link, Image, Eye, Type, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    { icon: Type, action: () => insertMarkdown('**', '**'), title: 'Bold', shortcut: 'Ctrl+B' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), title: 'Italic', shortcut: 'Ctrl+I' },
    { icon: Hash, action: () => insertMarkdown('\n## ', ''), title: 'Heading 2' },
    { icon: Code, action: () => insertMarkdown('`', '`'), title: 'Inline Code' },
    { icon: Quote, action: () => insertMarkdown('\n> ', ''), title: 'Quote' },
    { icon: List, action: () => insertMarkdown('\n- ', ''), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('\n1. ', ''), title: 'Numbered List' },
    { icon: Link, action: () => insertMarkdown('[', '](https://example.com)'), title: 'Link' },
    { icon: Image, action: () => insertMarkdown('![alt text](', ')'), title: 'Image' },
  ];

  return (
    <div className="space-y-4">
      {/* Enhanced Toolbar */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex flex-wrap gap-1">
          {toolbarButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={button.action}
              title={`${button.title} ${button.shortcut ? `(${button.shortcut})` : ''}`}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <button.icon className="w-4 h-4" />
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {value.length} characters
          </span>
          <Button
            variant={showPreview ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>

      {/* Split View or Single View */}
      <div className={`grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {/* Editor */}
        <div className={showPreview ? '' : 'col-span-1'}>
          <Textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={20}
            className="font-mono resize-y text-sm leading-relaxed"
          />
        </div>

        {/* Preview */}
        {showPreview && (
          <Card className="h-fit">
            <CardContent className="p-6">
              <div className="prose prose-lg max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:border-b-2 prose-h1:border-purple-200 prose-h1:pb-4
                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:text-purple-800 prose-h2:border-l-4 prose-h2:border-purple-500 prose-h2:pl-4
                prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5 prose-h3:text-purple-700
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-purple-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-code:bg-gray-100 prose-code:text-purple-600 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:rounded-lg prose-pre:p-0
                prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:p-4 prose-blockquote:italic prose-blockquote:text-purple-800
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
                prose-li:mb-2 prose-li:text-gray-700
                prose-table:border-collapse prose-table:w-full
                prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left
                prose-td:border prose-td:border-gray-300 prose-td:p-3
                prose-img:rounded-lg prose-img:shadow-md">
                
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code(props) {
                      const { children, className, node, ...rest } = props;
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg shadow-sm"
                          {...rest}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...rest}>
                          {children}
                        </code>
                      );
                    },
                    h1: ({ children }) => (
                      <h1 id={children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}>
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 id={children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 id={children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}>
                        {children}
                      </h3>
                    )
                  }}
                >
                  {value || '*Start writing to see preview...*'}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Enhanced Markdown Guide */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3 text-sm">Markdown Quick Reference:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-gray-600">
            <div className="space-y-1">
              <div><code># Header 1</code> - Large heading</div>
              <div><code>## Header 2</code> - Medium heading</div>
              <div><code>### Header 3</code> - Small heading</div>
            </div>
            <div className="space-y-1">
              <div><code>**bold**</code> - Bold text</div>
              <div><code>*italic*</code> - Italic text</div>
              <div><code>`code`</code> - Inline code</div>
            </div>
            <div className="space-y-1">
              <div><code>[link](url)</code> - Link</div>
              <div><code>![alt](image-url)</code> - Image</div>
              <div><code>```js</code> - Code block</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RichTextEditor;
