import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, BookmarkPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchResults = ({ searchQuery, filters, sortBy }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // Mock course data - in a real app, this would come from an API
  const mockCourses = [
    {
      id: 1,
      title: "The Complete JavaScript Course 2024: From Zero to Expert!",
      instructor: "Jonas Schmedtmann",
      rating: 4.7,
      reviewCount: 289456,
      studentsCount: 756843,
      duration: "69 total hours",
      lectures: 320,
      price: 84.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop",
      bestseller: true,
      level: "All Levels",
      category: "Development",
      language: "English",
      description: "Learn modern JavaScript from scratch! Master JavaScript with projects, challenges and theory."
    },
    {
      id: 2,
      title: "React - The Complete Guide 2024 (incl. Next.js, Redux)",
      instructor: "Maximilian Schwarzmüller",
      rating: 4.6,
      reviewCount: 152341,
      studentsCount: 434567,
      duration: "48.5 total hours",
      lectures: 835,
      price: 89.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      bestseller: true,
      level: "Intermediate",
      category: "Development",
      language: "English",
      description: "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!"
    },
    {
      id: 3,
      title: "Python for Data Science and Machine Learning Bootcamp",
      instructor: "Jose Portilla",
      rating: 4.5,
      reviewCount: 98432,
      studentsCount: 321654,
      duration: "25 total hours",
      lectures: 165,
      price: 74.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
      bestseller: false,
      level: "Beginner",
      category: "Development",
      language: "English",
      description: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more!"
    }
  ];

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredResults = mockCourses;
      
      // Apply search query filter
      if (searchQuery) {
        filteredResults = filteredResults.filter(course =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply category filter
      if (filters.category) {
        filteredResults = filteredResults.filter(course =>
          course.category === filters.category
        );
      }
      
      // Apply level filter
      if (filters.level.length > 0) {
        filteredResults = filteredResults.filter(course =>
          filters.level.includes(course.level)
        );
      }
      
      // Apply rating filter
      if (filters.rating.length > 0) {
        filteredResults = filteredResults.filter(course =>
          filters.rating.some(rating => course.rating >= rating)
        );
      }
      
      // Apply language filter
      if (filters.language.length > 0) {
        filteredResults = filteredResults.filter(course =>
          filters.language.includes(course.language)
        );
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'popularity':
          filteredResults.sort((a, b) => b.studentsCount - a.studentsCount);
          break;
        case 'rating':
          filteredResults.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Would sort by creation date in real implementation
          break;
        case 'price-low':
          filteredResults.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredResults.sort((a, b) => b.price - a.price);
          break;
        default:
          // Keep relevance order
          break;
      }
      
      setResults(filteredResults);
      setTotalResults(filteredResults.length);
      setLoading(false);
    }, 500);
  }, [searchQuery, filters, sortBy]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="flex p-4">
              <div className="w-64 h-36 bg-gray-200 rounded mr-4"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Search Results</h2>
        <p className="text-gray-600">
          {totalResults} results {searchQuery && `for "${searchQuery}"`}
        </p>
      </div>

      {results.length === 0 ? (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {results.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <Link to={`/course/${course.id}`}>
                <div className="flex p-4">
                  <div className="w-64 h-36 mr-4 flex-shrink-0">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 hover:text-purple-600 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{course.description}</p>
                        <p className="text-gray-600 text-sm mb-2">By {course.instructor}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500 font-semibold">{course.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span>({course.reviewCount.toLocaleString()})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{course.studentsCount.toLocaleString()} students</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <span>{course.lectures} lectures</span>
                          <span>{course.level}</span>
                          {course.bestseller && (
                            <Badge className="bg-yellow-400 text-yellow-900 text-xs">
                              Bestseller
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="text-right ml-4 flex flex-col items-end">
                        <Button variant="ghost" size="sm" className="mb-2">
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          ${course.price}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ${course.originalPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
