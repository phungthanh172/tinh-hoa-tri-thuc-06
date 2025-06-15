
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import TableOfContents from '@/components/blog/TableOfContents';
import FeaturedNews from '@/components/blog/FeaturedNews';
import CommentsSection from '@/components/blog/CommentsSection';

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

  const featuredNews = [
    {
      id: 1,
      title: "New JavaScript Framework Released",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop",
      date: "2024-01-20"
    },
    {
      id: 2,
      title: "AI Tools for Developers",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
      date: "2024-01-18"
    },
    {
      id: 3,
      title: "Web Development Trends 2024",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
      date: "2024-01-16"
    }
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Table of Contents - Left Sidebar */}
          <div className="xl:col-span-2">
            <TableOfContents headings={headings} activeSection={activeSection} />
          </div>

          {/* Main Content */}
          <div className="xl:col-span-8">
            {/* Back Button */}
            <Link to="/blog" className="inline-block mb-6">
              <Button variant="outline" className="shadow-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            {/* Blog Content Card */}
            <Card className="shadow-lg border-0 mb-8">
              <CardContent className="p-8">
                <BlogPostHeader
                  title={blogPost.title}
                  excerpt={blogPost.excerpt}
                  author={blogPost.author}
                  date={blogPost.date}
                  readTime={blogPost.readTime}
                  category={blogPost.category}
                  tags={blogPost.tags}
                  image={blogPost.image}
                />
                <BlogPostContent content={blogPost.content} />
              </CardContent>
            </Card>

            {/* Comments Section */}
            <CommentsSection
              comments={comments}
              onAddComment={handleAddComment}
              onAddReply={handleAddReply}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          </div>

          {/* Featured News - Right Sidebar */}
          <div className="xl:col-span-2">
            <FeaturedNews news={featuredNews} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
