
import React, { useState } from 'react';
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const WriteBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    featuredImage: null,
    isPublished: false,
    isDraft: true
  });
  
  const [newTag, setNewTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const categories = [
    "Development", "Education", "Tutorial", "Motivation", 
    "Data Science", "Productivity", "Business", "Design"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your blog post has been saved as a draft.",
    });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before publishing.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Blog Published",
      description: "Your blog post has been published successfully!",
    });
    navigate('/blog');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          featuredImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(false)}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Editor
            </Button>
            
            <article className="prose prose-lg max-w-none">
              {formData.featuredImage && (
                <img 
                  src={formData.featuredImage} 
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-8"
                />
              )}
              
              <div className="mb-6">
                {formData.category && (
                  <Badge className="mb-4">{formData.category}</Badge>
                )}
                <h1 className="text-4xl font-bold mb-4">{formData.title || 'Untitled Post'}</h1>
                {formData.excerpt && (
                  <p className="text-xl text-gray-600 mb-6">{formData.excerpt}</p>
                )}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {formData.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="whitespace-pre-wrap">
                {formData.content || 'No content yet...'}
              </div>
            </article>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/instructor/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Write New Blog Post</h1>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setPreviewMode(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish}>
                Publish
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
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
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Write a brief summary of your post..."
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your blog post content here..."
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      rows={20}
                      className="font-mono"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
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
                        handleInputChange('isPublished', checked);
                        handleInputChange('isDraft', !checked);
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
                        onClick={() => handleInputChange('featuredImage', null)}
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
                        onChange={handleImageUpload}
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
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
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
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <Button size="sm" onClick={handleAddTag}>
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
                            onClick={() => handleRemoveTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WriteBlog;
