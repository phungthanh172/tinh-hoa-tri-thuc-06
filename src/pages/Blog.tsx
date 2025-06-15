
import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Skills Every Developer Should Master in 2024",
      excerpt: "Discover the most in-demand programming skills that will boost your career in the rapidly evolving tech landscape.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "The Future of Online Learning: Trends to Watch",
      excerpt: "Explore how AI, VR, and personalized learning are transforming the educational landscape.",
      author: "Mike Chen",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "Education",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Building Your First Web Application: A Complete Guide",
      excerpt: "Step-by-step tutorial for beginners to create their first web application using modern technologies.",
      author: "Alex Rodriguez",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Tutorial",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "How to Stay Motivated While Learning Online",
      excerpt: "Practical tips and strategies to maintain focus and enthusiasm throughout your online learning journey.",
      author: "Emma Thompson",
      date: "2024-01-08",
      readTime: "5 min read",
      category: "Motivation",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Data Science vs Machine Learning: Understanding the Difference",
      excerpt: "Clear explanation of the distinctions between these related but different fields in tech.",
      author: "David Kim",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Remote Work Best Practices for Online Learners",
      excerpt: "Tips for creating an effective learning environment and maintaining productivity while working from home.",
      author: "Lisa Wang",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
    }
  ];

  const categories = ["All", "Development", "Education", "Tutorial", "Motivation", "Data Science", "Productivity"];

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn, Grow, and Stay Inspired
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Discover insights, tips, and stories from our community of learners and instructors
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              className="cursor-pointer hover:bg-purple-100 px-4 py-2"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {category !== "All" && (
                <span className="ml-2 text-xs">
                  ({blogPosts.filter(post => post.category === category).length})
                </span>
              )}
            </Badge>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center text-gray-600">
          Showing {filteredPosts.length} {selectedCategory !== "All" ? selectedCategory : ""} posts
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4">{filteredPosts[0].category}</Badge>
                  <h2 className="text-2xl font-bold mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-4">{filteredPosts[0].author}</span>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{filteredPosts[0].date}</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{filteredPosts[0].readTime}</span>
                  </div>
                  <Link to={`/blog/${filteredPosts[0].id}`}>
                    <Button className="group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="w-4 h-4 mr-1" />
                    <span className="mr-3">{post.author}</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="outline" className="w-full group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">No blog posts found in the "{selectedCategory}" category.</p>
            <Button variant="outline" onClick={() => setSelectedCategory("All")}>
              View All Posts
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
