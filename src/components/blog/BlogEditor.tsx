
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from './RichTextEditor';

interface BlogEditorProps {
  formData: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    focusKeyword: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ formData, onInputChange }) => {
  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    onInputChange('title', value);
    // Auto-generate slug if it's empty or matches the previous title's slug
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      onInputChange('slug', generateSlug(value));
    }
  };

  return (
    <div className="space-y-6">
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
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-lg"
            />
          </div>

          <div>
            <Label htmlFor="slug">Permalink (Slug)</Label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">/blog/</span>
              <Input
                id="slug"
                placeholder="post-url-slug"
                value={formData.slug}
                onChange={(e) => onInputChange('slug', e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              URL-friendly version of the title, usually lowercase with hyphens
            </p>
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
            <p className="text-xs text-gray-500 mt-1">
              Brief description shown in post previews and search results
            </p>
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

      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              placeholder="SEO title for search engines..."
              value={formData.metaTitle}
              onChange={(e) => onInputChange('metaTitle', e.target.value)}
              maxLength={60}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaTitle.length}/60 characters. Title that appears in search engine results.
            </p>
          </div>

          <div>
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              placeholder="Brief description for search engines..."
              value={formData.metaDescription}
              onChange={(e) => onInputChange('metaDescription', e.target.value)}
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaDescription.length}/160 characters. Description shown in search results.
            </p>
          </div>

          <div>
            <Label htmlFor="focusKeyword">Focus Keyword</Label>
            <Input
              id="focusKeyword"
              placeholder="Main keyword for this post..."
              value={formData.focusKeyword}
              onChange={(e) => onInputChange('focusKeyword', e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Primary keyword you want this post to rank for in search engines.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogEditor;
