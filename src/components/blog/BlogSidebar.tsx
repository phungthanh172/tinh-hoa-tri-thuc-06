
import React from 'react';
import { Upload, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface BlogSidebarProps {
  formData: {
    isPublished: boolean;
    isDraft: boolean;
    featuredImage: string | null;
    category: string;
    tags: string[];
  };
  newTag: string;
  categories: string[];
  onInputChange: (field: string, value: any) => void;
  onNewTagChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  formData,
  newTag,
  categories,
  onInputChange,
  onNewTagChange,
  onAddTag,
  onRemoveTag,
  onImageUpload
}) => {
  return (
    <div className="space-y-6">
      {/* Publishing Options */}
      <Card>
        <CardHeader>
          <CardTitle>Publishing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="published">Published</Label>
            <Switch
              id="published"
              checked={formData.isPublished}
              onCheckedChange={(checked) => {
                onInputChange('isPublished', checked);
                onInputChange('isDraft', !checked);
              }}
            />
          </div>
          
          <div className="text-sm text-gray-600">
            {formData.isPublished ? 'This post is live' : 'This post is a draft'}
          </div>
        </CardContent>
      </Card>

      {/* Featured Image */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Image</CardTitle>
        </CardHeader>
        <CardContent>
          {formData.featuredImage ? (
            <div className="space-y-3">
              <img 
                src={formData.featuredImage} 
                alt="Featured" 
                className="w-full h-32 object-cover rounded"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onInputChange('featuredImage', null)}
              >
                Remove Image
              </Button>
            </div>
          ) : (
            <div>
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload featured image</p>
                </div>
              </Label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category */}
      <Card>
        <CardHeader>
          <CardTitle>Category *</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={formData.category} onValueChange={(value) => onInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Add a tag..."
              value={newTag}
              onChange={(e) => onNewTagChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onAddTag()}
            />
            <Button size="sm" onClick={onAddTag}>
              Add
            </Button>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="cursor-pointer">
                  {tag}
                  <X 
                    className="w-3 h-3 ml-1" 
                    onClick={() => onRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
