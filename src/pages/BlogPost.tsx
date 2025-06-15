
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const BlogPost = () => {
  const { id } = useParams();
  
  // Mock blog post data - in a real app, this would come from an API
  const blogPost = {
    id: 1,
    title: "10 Essential Skills Every Developer Should Master in 2024",
    content: `# Introduction

This is a comprehensive guide to the most important skills for developers in 2024.

## 1. JavaScript and TypeScript

JavaScript remains the backbone of web development, while TypeScript adds type safety:

\`\`\`javascript
const greeting = (name: string): string => {
  return \`Hello, \${name}!\`;
};
\`\`\`

## 2. React and Modern Frameworks

Modern frameworks like React, Vue, and Angular are essential:

- **React**: Component-based architecture
- **Next.js**: Full-stack React framework
- **Vue**: Progressive framework

## 3. Backend Technologies

Understanding backend development is crucial:

1. Node.js and Express
2. Database management (SQL/NoSQL)
3. API design principles

> "The best developers understand both frontend and backend technologies."

### Key Takeaways

- Stay updated with latest technologies
- Practice regularly
- Build real projects
- Contribute to open source`,
    excerpt: "Discover the most in-demand programming skills that will boost your career in the rapidly evolving tech landscape.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Development",
    tags: ["JavaScript", "React", "Career", "Programming"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
  };

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog" className="inline-block mb-8">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <article className="mb-8">
            {blogPost.image && (
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
              />
            )}
            
            <div className="mb-6">
              <Badge className="mb-4">{blogPost.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{blogPost.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{blogPost.excerpt}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{blogPost.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
              
              {blogPost.tags && blogPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {blogPost.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {blogPost.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Related Posts */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Related Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/blog/2" className="group">
                  <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <img 
                      src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=100&h=100&fit=crop"
                      alt="Related post"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold group-hover:text-purple-600 transition-colors">
                        The Future of Online Learning
                      </h4>
                      <p className="text-sm text-gray-600">6 min read</p>
                    </div>
                  </div>
                </Link>
                <Link to="/blog/3" className="group">
                  <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <img 
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop"
                      alt="Related post"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold group-hover:text-purple-600 transition-colors">
                        Building Your First Web Application
                      </h4>
                      <p className="text-sm text-gray-600">12 min read</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
