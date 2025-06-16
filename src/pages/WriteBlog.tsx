
import React, { useState } from 'react';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import BlogEditor from '@/components/blog/BlogEditor';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogPreview from '@/components/blog/BlogPreview';

const WriteBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
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
    if (!formData.title || !formData.content || !formData.category || !formData.slug) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (title, slug, content, category) before publishing.",
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
      <BlogPreview 
        formData={formData}
        onBackToEditor={() => setPreviewMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
            <div className="lg:col-span-2 space-y-6">
              <BlogEditor 
                formData={formData}
                onInputChange={handleInputChange}
              />
            </div>

            <BlogSidebar
              formData={formData}
              newTag={newTag}
              categories={categories}
              onInputChange={handleInputChange}
              onNewTagChange={setNewTag}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              onImageUpload={handleImageUpload}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WriteBlog;
