
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from './RichTextEditor';

interface BlogEditorProps {
  formData: {
    title: string;
    excerpt: string;
    content: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ formData, onInputChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            placeholder="Enter your blog post title..."
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            className="text-lg"
          />
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            placeholder="Write a brief summary of your post..."
            value={formData.excerpt}
            onChange={(e) => onInputChange('excerpt', e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="content">Content * (Markdown Supported)</Label>
          <RichTextEditor
            value={formData.content}
            onChange={(value) => onInputChange('content', value)}
            placeholder="Write your blog post content here using Markdown..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogEditor;
