
import React from 'react';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogPostHeaderProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
}

const BlogPostHeader = ({ 
  title, 
  excerpt, 
  author, 
  date, 
  readTime, 
  category, 
  tags, 
  image 
}: BlogPostHeaderProps) => {
  return (
    <div className="mb-8">
      {image && (
        <img 
          src={image} 
          alt={title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md"
        />
      )}
      
      <div>
        <Badge className="mb-4">{category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{title}</h1>
        <p className="text-xl text-gray-600 mb-6">{excerpt}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map(tag => (
              <Badge key={tag} variant="outline">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostHeader;
