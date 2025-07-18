
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Heart, Bookmark } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BlogPostContent from '@/components/blog/BlogPostContent';
import TableOfContents from '@/components/blog/TableOfContents';
import CommentsSection from '@/components/blog/CommentsSection';
import RelatedPosts from '@/components/blog/RelatedPosts';
import BlogActions from '@/components/blog/BlogActions';
import { Badge } from '@/components/ui/badge';

const BlogPost = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('');

  // Mock authentication state - replace with actual auth
  const isLoggedIn = true;
  const currentUser = { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' };

  // Mock comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Alice Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c6?w=40&h=40&fit=crop&crop=face',
      content: 'Great article! Really helpful for understanding modern JavaScript concepts.',
      date: '2024-01-20',
      replies: [
        {
          id: 11,
          author: 'Bob Johnson',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face',
          content: 'I agree! The examples are very clear.',
          date: '2024-01-20'
        }
      ]
    },
    {
      id: 2,
      author: 'Charlie Brown',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      content: 'Could you elaborate more on the TypeScript section?',
      date: '2024-01-19',
      replies: []
    }
  ]);

  // Mock blog post data
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

## 4. Cloud Computing and DevOps

Modern developers need to understand cloud platforms and deployment:

- AWS, Azure, Google Cloud
- Docker and containerization
- CI/CD pipelines
- Infrastructure as Code

## 5. Database Management

Both SQL and NoSQL databases are important:

- PostgreSQL, MySQL
- MongoDB, Redis
- Database design principles
- Query optimization

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

  // Enhanced related posts data with more variety
  const relatedPosts = [
    {
      id: 2,
      title: "Building Scalable React Applications with TypeScript",
      excerpt: "Learn how to structure large React applications using TypeScript for better maintainability and developer experience.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "React"
    },
    {
      id: 3,
      title: "The Complete Guide to Modern CSS Grid and Flexbox",
      excerpt: "Master CSS Grid and Flexbox to create responsive layouts that work across all devices and browsers.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "CSS"
    },
    {
      id: 4,
      title: "API Design Best Practices for Modern Web Applications",
      excerpt: "Learn how to design RESTful APIs that are scalable, secure, and easy to maintain for your web applications.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Backend"
    },
    {
      id: 5,
      title: "Mastering Git Workflows for Team Collaboration",
      excerpt: "Discover advanced Git techniques and workflows that will make your team more productive and reduce merge conflicts.",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=200&fit=crop",
      date: "2024-01-03",
      readTime: "5 min read",
      category: "DevOps"
    }
  ];

  // Extract headings for table of contents
  const headings = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'javascript-typescript', title: '1. JavaScript and TypeScript', level: 2 },
    { id: 'react-frameworks', title: '2. React and Modern Frameworks', level: 2 },
    { id: 'backend-technologies', title: '3. Backend Technologies', level: 2 },
    { id: 'cloud-devops', title: '4. Cloud Computing and DevOps', level: 2 },
    { id: 'database-management', title: '5. Database Management', level: 2 },
    { id: 'key-takeaways', title: 'Key Takeaways', level: 3 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = headings.map(heading => {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: heading.id,
            top: rect.top,
            inView: rect.top >= 0 && rect.top <= window.innerHeight / 2
          };
        }
        return null;
      }).filter(Boolean);

      const activeSection = sections.find(section => section.inView);
      if (activeSection) {
        setActiveSection(activeSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddComment = (content: string) => {
    if (content.trim() && isLoggedIn && currentUser) {
      const comment = {
        id: comments.length + 1,
        author: currentUser.name,
        avatar: currentUser.avatar,
        content,
        date: new Date().toISOString().split('T')[0],
        replies: []
      };
      setComments([...comments, comment]);
    }
  };

  const handleAddReply = (commentId: number, content: string) => {
    if (content.trim() && isLoggedIn && currentUser) {
      const reply = {
        id: Date.now(),
        author: currentUser.name,
        avatar: currentUser.avatar,
        content,
        date: new Date().toISOString().split('T')[0]
      };
      
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />
      
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-block mb-6">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="mb-6">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
                {blogPost.category}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed max-w-3xl">
              {blogPost.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-purple-200">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{blogPost.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Left Sidebar */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="sticky top-8">
                <TableOfContents headings={headings} activeSection={activeSection} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              {/* Hero Image */}
              {blogPost.image && (
                <div className="mb-8 -mt-20 relative z-10">
                  <img 
                    src={blogPost.image} 
                    alt={blogPost.title}
                    className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white"
                  />
                </div>
              )}

              {/* Article Actions */}
              <div className="mb-8">
                <BlogActions title={blogPost.title} />
              </div>
              
              {/* Article Content */}
              <Card className="shadow-xl border-0 mb-8 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 lg:p-12">
                  <BlogPostContent content={blogPost.content} />
                </CardContent>
              </Card>

              {/* Article Tags */}
              {blogPost.tags && blogPost.tags.length > 0 && (
                <Card className="shadow-lg border-0 mb-8 bg-white/60 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Related Topics</h3>
                    <div className="flex flex-wrap gap-3">
                      {blogPost.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="hover:bg-purple-50 hover:border-purple-300 transition-colors cursor-pointer px-4 py-2"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Comments Section */}
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <CommentsSection
                    comments={comments}
                    onAddComment={handleAddComment}
                    onAddReply={handleAddReply}
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Related Posts - Right Sidebar */}
            <div className="lg:col-span-3 order-3">
              <div className="sticky top-8 space-y-6">
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <RelatedPosts posts={relatedPosts} />
                  </CardContent>
                </Card>
                
                {/* Newsletter Signup */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-indigo-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Stay Updated</h3>
                    <p className="text-sm text-gray-600 mb-4">Get the latest articles delivered to your inbox</p>
                    <div className="space-y-3">
                      <input 
                        type="email" 
                        placeholder="Your email address"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
