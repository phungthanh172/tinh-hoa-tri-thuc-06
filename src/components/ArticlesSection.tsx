
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { sampleArticles } from '@/data/sampleData';

const ArticlesSection = () => {
  // Temporarily commented out the real data query and using static sample data
  // const { data: articles, isLoading, error } = useQuery({
  //   queryKey: ['articles'],
  //   queryFn: appwriteApi.fetchAllArticles,
  //   staleTime: 5 * 60 * 1000, // 5 minutes
  // });

  // Using static sample data for rapid development
  const articles = sampleArticles;
  const isLoading = false;
  const error = null;

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest insights and trends in technology and education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="p-0">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
          <p className="text-red-600">Failed to load articles. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest insights and trends in technology and education.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.slice(0, 6).map((article) => (
            <Card key={article.$id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader className="p-0">
                <img 
                  src={article.image_url || `https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop`}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{article.summary}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{format(new Date(article.published_at), 'MMM dd, yyyy')}</span>
                  </div>
                  {article.author_name && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{article.author_name}</span>
                    </div>
                  )}
                </div>
                
                <Link to={`/blog/${article.slug}`}>
                  <Button variant="outline" className="w-full group">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {articles && articles.length > 6 && (
          <div className="text-center mt-12">
            <Link to="/blog">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
