
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPreviewProps {
  formData: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    featuredImage: string | null;
  };
  onBackToEditor: () => void;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ formData, onBackToEditor }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={onBackToEditor}
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
};

export default BlogPreview;
