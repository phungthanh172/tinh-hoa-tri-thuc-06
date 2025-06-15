
import React, { useState, useEffect } from 'react';
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
import { ScrollArea } from '@/components/ui/scroll-area';

const BlogPost = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('');

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
      
      {/* Floating Table of Contents */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden xl:block">
        <Card className="w-64 shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 text-sm">Table of Contents</h3>
            <ScrollArea className="h-96">
              <nav className="space-y-2">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block text-sm transition-colors ${
                      activeSection === heading.id
                        ? 'text-purple-600 font-medium'
                        : 'text-gray-600 hover:text-purple-500'
                    } ${heading.level === 3 ? 'ml-4' : ''}`}
                  >
                    {heading.title}
                  </a>
                ))}
              </nav>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Featured News Poster */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden xl:block">
        <Card className="w-80 shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 text-sm">Featured News</h3>
            <div className="space-y-4">
              {featuredNews.map((news) => (
                <div key={news.id} className="group cursor-pointer">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-32 object-cover rounded-lg mb-2 group-hover:opacity-90 transition-opacity"
                  />
                  <h4 className="font-medium text-sm group-hover:text-purple-600 transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{news.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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

            {/* Article Content with heading IDs */}
            <div className="prose prose-lg max-w-none">
              <div id="introduction">
                <h1>Introduction</h1>
                <p>This is a comprehensive guide to the most important skills for developers in 2024.</p>
              </div>
              
              <div id="javascript-typescript">
                <h2>1. JavaScript and TypeScript</h2>
                <p>JavaScript remains the backbone of web development, while TypeScript adds type safety:</p>
                <SyntaxHighlighter
                  language="javascript"
                  style={tomorrow}
                  PreTag="div"
                >
                  {`const greeting = (name: string): string => {
  return \`Hello, \${name}!\`;
};`}
                </SyntaxHighlighter>
              </div>

              <div id="react-frameworks">
                <h2>2. React and Modern Frameworks</h2>
                <p>Modern frameworks like React, Vue, and Angular are essential:</p>
                <ul>
                  <li><strong>React</strong>: Component-based architecture</li>
                  <li><strong>Next.js</strong>: Full-stack React framework</li>
                  <li><strong>Vue</strong>: Progressive framework</li>
                </ul>
              </div>

              <div id="backend-technologies">
                <h2>3. Backend Technologies</h2>
                <p>Understanding backend development is crucial:</p>
                <ol>
                  <li>Node.js and Express</li>
                  <li>Database management (SQL/NoSQL)</li>
                  <li>API design principles</li>
                </ol>
                <blockquote>
                  <p>"The best developers understand both frontend and backend technologies."</p>
                </blockquote>
              </div>

              <div id="cloud-devops">
                <h2>4. Cloud Computing and DevOps</h2>
                <p>Modern developers need to understand cloud platforms and deployment:</p>
                <ul>
                  <li>AWS, Azure, Google Cloud</li>
                  <li>Docker and containerization</li>
                  <li>CI/CD pipelines</li>
                  <li>Infrastructure as Code</li>
                </ul>
              </div>

              <div id="database-management">
                <h2>5. Database Management</h2>
                <p>Both SQL and NoSQL databases are important:</p>
                <ul>
                  <li>PostgreSQL, MySQL</li>
                  <li>MongoDB, Redis</li>
                  <li>Database design principles</li>
                  <li>Query optimization</li>
                </ul>
              </div>

              <div id="key-takeaways">
                <h3>Key Takeaways</h3>
                <ul>
                  <li>Stay updated with latest technologies</li>
                  <li>Practice regularly</li>
                  <li>Build real projects</li>
                  <li>Contribute to open source</li>
                </ul>
              </div>
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
