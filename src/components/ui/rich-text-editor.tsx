
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  simple?: boolean;
  className?: string;
}

const RichTextEditor = ({ 
  value, 
  onChange, 
  placeholder = "Start typing...",
  height = 200,
  simple = false,
  className = ""
}: RichTextEditorProps) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  const simpleToolbar = 'undo redo | bold italic | bullist numlist | link';
  const fullToolbar = 'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | link image | help';

  return (
    <div className={className}>
      <Editor
        apiKey="kmcedy9ul404vlmhecvhrq3vw9pwr9izf5ajsp71leoew9zc"
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height,
          width: '100%',
          menubar: false,
          resize: 'vertical',
          placeholder,
          plugins: simple ? [
            'advlist', 'autolink', 'lists', 'link', 'help', 'wordcount'
          ] : [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: simple ? simpleToolbar : fullToolbar,
          content_style: `
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              font-size: 16px;
              line-height: 1.6;
              color: #374151;
              max-width: none;
              margin: 16px;
              padding: 0;
              box-sizing: border-box;
            }
          `,
          skin: 'oxide',
          content_css: 'default',
          branding: false
        }}
      />
    </div>
  );
};

export default RichTextEditor;
