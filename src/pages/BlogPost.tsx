import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, MessageSquare, Reply } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';

const BlogPost = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('');
  const [newComment, setNewComment] = useState('');
  const [replyToComment, setReplyToComment] = useState(null);
  const [replyText, setReplyText] = useState('');

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

  const handleAddComment = () => {
    if (newComment.trim() && isLoggedIn) {
      const comment = {
        id: comments.length + 1,
        author: currentUser.name,
        avatar: currentUser.avatar,
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        replies: []
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId) => {
    if (replyText.trim() && isLoggedIn) {
      const reply = {
        id: Date.now(),
        author: currentUser.name,
        avatar: currentUser.avatar,
        content: replyText,
        date: new Date().toISOString().split('T')[0]
      };
      
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
      setReplyText('');
      setReplyToComment(null);
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
            <div className="sticky top-8">
              <Card className="shadow-lg border-0">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 text-sm text-gray-900">Table of Contents</h3>
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
                {/* Article Header */}
                {blogPost.image && (
                  <img 
                    src={blogPost.image} 
                    alt={blogPost.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md"
                  />
                )}
                
                <div className="mb-8">
                  <Badge className="mb-4">{blogPost.category}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{blogPost.title}</h1>
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

                {/* Article Content with Enhanced Markdown Styling */}
                <div className="prose prose-lg prose-gray max-w-none 
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
                  prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-purple-800
                  prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-purple-700
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-purple-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-code:bg-gray-100 prose-code:text-purple-600 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                  prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                  prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:p-4 prose-blockquote:italic prose-blockquote:text-purple-800 prose-blockquote:rounded-r-lg
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                  prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
                  prose-li:mb-2 prose-li:text-gray-700
                  prose-table:border-collapse prose-table:w-full
                  prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                  prose-td:border prose-td:border-gray-300 prose-td:p-3
                  prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto">
                  
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code(props) {
                        const { children, className, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <SyntaxHighlighter
                            style={tomorrow}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-lg shadow-lg"
                            {...rest}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...rest}>
                            {children}
                          </code>
                        );
                      },
                      h1: ({ children }) => (
                        <h1 id={children.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}>
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 id={children.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}>
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 id={children.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}>
                          {children}
                        </h3>
                      )
                    }}
                  >
                    {blogPost.content}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="w-5 h-5" />
                  <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
                </div>

                {/* Add Comment Form */}
                {isLoggedIn ? (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3 mb-4">
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <Textarea
                          placeholder="Write a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="mb-3"
                          rows={3}
                        />
                        <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-gray-600 mb-3">Please log in to leave a comment</p>
                    <Button>Log In</Button>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <img 
                          src={comment.avatar} 
                          alt={comment.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{comment.author}</span>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{comment.content}</p>
                          
                          {isLoggedIn && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyToComment(comment.id)}
                            >
                              <Reply className="w-3 h-3 mr-1" />
                              Reply
                            </Button>
                          )}

                          {/* Reply Form */}
                          {replyToComment === comment.id && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-start gap-3">
                                <img 
                                  src={currentUser.avatar} 
                                  alt={currentUser.name}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1">
                                  <Textarea
                                    placeholder="Write a reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="mb-3"
                                    rows={2}
                                  />
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleAddReply(comment.id)}
                                      disabled={!replyText.trim()}
                                    >
                                      Reply
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => setReplyToComment(null)}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="mt-4 ml-6 space-y-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start gap-3">
                                  <img 
                                    src={reply.avatar} 
                                    alt={reply.author}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-semibold text-sm">{reply.author}</span>
                                      <span className="text-xs text-gray-500">{reply.date}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured News - Right Sidebar */}
          <div className="xl:col-span-2">
            <div className="sticky top-8">
              <Card className="shadow-lg border-0">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 text-sm text-gray-900">Featured News</h3>
                  <div className="space-y-4">
                    {featuredNews.map((news) => (
                      <div key={news.id} className="group cursor-pointer">
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="w-full h-32 object-cover rounded-lg mb-2 group-hover:opacity-90 transition-opacity shadow-sm"
                        />
                        <h4 className="font-medium text-sm group-hover:text-purple-600 transition-colors leading-tight">
                          {news.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{news.date}</p>
                      </div>
                    ))}
                  </div>
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

export default BlogPost;
