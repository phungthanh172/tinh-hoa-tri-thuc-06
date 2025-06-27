
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';

interface RelatedPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">You Might Also Like</h2>
        </div>
        <Link to="/blog" className="text-purple-600 hover:text-purple-700 flex items-center space-x-1 text-sm font-medium group">
          <span>View all</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {posts.slice(0, 4).map((post, index) => (
          <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Link to={`/blog/${post.id}`}>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200"
                    >
                      {post.category}
                    </Badge>
                    {index === 0 && (
                      <Badge className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 text-sm leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center text-xs text-gray-500 space-x-3">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Popular Categories */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Topics</h3>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'React', 'TypeScript', 'CSS', 'DevOps', 'Backend'].map(category => (
            <Badge 
              key={category}
              variant="outline" 
              className="text-xs hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;
