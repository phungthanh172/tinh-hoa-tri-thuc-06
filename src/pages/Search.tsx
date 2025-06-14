
import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/search/SearchFilters';
import SearchResults from '@/components/search/SearchResults';
import PersonalizedRecommendations from '@/components/search/PersonalizedRecommendations';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    level: [],
    duration: [],
    rating: [],
    price: [],
    language: []
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (filters.category) params.set('category', filters.category);
    setSearchParams(params);
  }, [searchQuery, filters.category, setSearchParams]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      level: [],
      duration: [],
      rating: [],
      price: [],
      language: []
    });
  };

  const activeFiltersCount = Object.values(filters).flat().filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search for courses, skills, instructors..." 
              className="pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge className="ml-1">{activeFiltersCount}</Badge>
                )}
              </Button>
              
              {activeFiltersCount > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="text-purple-600">
                  Clear all filters
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
              >
                <option value="relevance">Most Relevant</option>
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <SearchFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {!searchQuery && !filters.category ? (
              <PersonalizedRecommendations />
            ) : (
              <SearchResults 
                searchQuery={searchQuery}
                filters={filters}
                sortBy={sortBy}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
