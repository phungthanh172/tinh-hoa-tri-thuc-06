
import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, User, Share2, BookmarkPlus, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FeaturesPanel from '@/components/blog/FeaturesPanel';
import FeaturedNews from '@/components/blog/FeaturedNews';
import RelatedPosts from '@/components/blog/RelatedPosts';

const BlogDetail = () => {
  const { id } = useParams();

  // Mock blog post data
  const blogPost = {
    id: parseInt(id || '1'),
    title: "10 Essential Skills Every Developer Should Master in 2024",
    content: `
      <p>The technology landscape is evolving at an unprecedented pace, and as developers, we must continuously adapt and grow our skill sets to remain competitive and effective. As we progress through 2024, certain skills have emerged as particularly crucial for success in our field.</p>

      <h2>1. Cloud Computing and DevOps</h2>
      <p>Understanding cloud platforms like AWS, Azure, or Google Cloud is no longer optional. Modern applications are built with cloud-first architectures, and developers who understand how to deploy, scale, and maintain applications in the cloud have a significant advantage.</p>

      <h2>2. Modern JavaScript and TypeScript</h2>
      <p>JavaScript continues to dominate the web development landscape. TypeScript adds type safety and better tooling support, making it essential for large-scale applications. Stay current with ES6+ features and understand async/await patterns.</p>

      <h2>3. API Design and Integration</h2>
      <p>RESTful APIs and GraphQL are fundamental to modern application architecture. Understanding how to design, implement, and consume APIs effectively is crucial for creating scalable, maintainable applications.</p>

      <h2>4. Version Control with Git</h2>
      <p>Git is the backbone of collaborative development. Master branching strategies, understand merge vs. rebase, and learn how to resolve conflicts efficiently. GitHub Actions and GitLab CI/CD pipelines are also valuable skills.</p>

      <h2>5. Database Management</h2>
      <p>Whether it's SQL databases like PostgreSQL and MySQL, or NoSQL solutions like MongoDB and Redis, understanding data persistence and querying is essential. Learn about database optimization and indexing strategies.</p>

      <h2>Conclusion</h2>
      <p>These skills form the foundation of modern development practices. Focus on mastering them systematically, and don't try to learn everything at once. Pick one area and dive deep before moving to the next.</p>
    `,
    excerpt: "Discover the most in-demand programming skills that will boost your career in the rapidly evolving tech landscape.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    tags: ["Development", "Skills", "Career", "2024"]
  };

  const featuredNews = [
    {
      id: 1,
      title: "New AI-Powered Course Recommendations Now Available",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
      date: "2024-01-20"
    },
    {
      id: 2,
      title: "Interactive Coding Labs Beta Testing Begins",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      date: "2024-01-18"
    },
    {
      id: 3,
      title: "New Partnership with Industry Leaders Announced",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
      date: "2024-01-16"
    }
  ];

  const relatedPosts = [
    {
      id: 7,
      title: "Advanced React Patterns for Professional Development",
      excerpt: "Learn advanced React patterns that will make you a more effective developer.",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=200&fit=crop",
      date: "2024-01-14",
      readTime: "10 min read",
      category: "Development"
    },
    {
      id: 8,
      title: "Building Scalable Applications with Microservices",
      excerpt: "A comprehensive guide to designing and implementing microservice architectures.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
      date: "2024-01-12",
      readTime: "12 min read",
      category: "Architecture"
    },
    {
      id: 9,
      title: "The Future of Web Development: Trends for 2024",
      excerpt: "Explore the emerging trends that will shape web development in the coming year.",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Trends"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white">
              {/* Hero Image */}
              <div className="aspect-video mb-8 rounded-lg overflow-hidden">
                <img
                  src={blogPost.image}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className="bg-purple-100 text-purple-700">
                    {blogPost.category}
                  </Badge>
                  {blogPost.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {blogPost.title}
                </h1>
                
                <div className="flex items-center justify-between text-gray-600 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>{blogPost.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{blogPost.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{blogPost.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">Share this article:</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Twitter</Button>
                      <Button variant="outline" size="sm">LinkedIn</Button>
                      <Button variant="outline" size="sm">Facebook</Button>
                    </div>
                  </div>
                </div>
              </footer>
            </article>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <FeaturesPanel />
          </div>
        </div>

        {/* Related Content Section */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RelatedPosts posts={relatedPosts} />
            </div>
            <div>
              <FeaturedNews news={featuredNews} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
