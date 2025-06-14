
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, Clock, Users, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { coursesApi } from '@/services/coursesApi';

const Courses = () => {
  const [sortBy, setSortBy] = useState('Most Popular');
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    rating: 0,
    duration: '',
    language: '',
    price: ''
  });

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['courses', filters],
    queryFn: () => coursesApi.fetchCourses(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType as keyof typeof prev] === value ? '' : value
    }));
  };

  const CourseCard = ({ course }: { course: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
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
                <p className="text-gray-600 text-sm mb-2">{course.description}</p>
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

              <div className="text-right ml-4">
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
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Error Loading Courses</h1>
          <p className="text-red-600">Failed to load courses. Please try again later.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter
                </h3>
                
                <Accordion type="multiple" className="space-y-2">
                  <AccordionItem value="rating">
                    <AccordionTrigger className="text-sm font-medium">Rating</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="rating-4.5" 
                          checked={filters.rating === 4.5}
                          onCheckedChange={() => handleFilterChange('rating', '4.5')}
                        />
                        <label htmlFor="rating-4.5" className="text-sm flex items-center">
                          <span className="flex text-yellow-400 mr-1">
                            {[...Array(4)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                            <Star className="w-3 h-3 fill-current" />
                          </span>
                          4.5 & up
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="rating-4.0"
                          checked={filters.rating === 4.0}
                          onCheckedChange={() => handleFilterChange('rating', '4.0')}
                        />
                        <label htmlFor="rating-4.0" className="text-sm flex items-center">
                          <span className="flex text-yellow-400 mr-1">
                            {[...Array(4)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                          </span>
                          4.0 & up
                        </label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="level">
                    <AccordionTrigger className="text-sm font-medium">Level</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="beginner"
                          checked={filters.level === 'Beginner'}
                          onCheckedChange={() => handleFilterChange('level', 'Beginner')}
                        />
                        <label htmlFor="beginner" className="text-sm">Beginner</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="intermediate"
                          checked={filters.level === 'Intermediate'}
                          onCheckedChange={() => handleFilterChange('level', 'Intermediate')}
                        />
                        <label htmlFor="intermediate" className="text-sm">Intermediate</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="expert"
                          checked={filters.level === 'Expert'}
                          onCheckedChange={() => handleFilterChange('level', 'Expert')}
                        />
                        <label htmlFor="expert" className="text-sm">Expert</label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="language">
                    <AccordionTrigger className="text-sm font-medium">Language</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="english"
                          checked={filters.language === 'English'}
                          onCheckedChange={() => handleFilterChange('language', 'English')}
                        />
                        <label htmlFor="english" className="text-sm">English</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="spanish"
                          checked={filters.language === 'Spanish'}
                          onCheckedChange={() => handleFilterChange('language', 'Spanish')}
                        />
                        <label htmlFor="spanish" className="text-sm">Español</label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Development Courses</h1>
              <p className="text-gray-600">Choose from {courses?.length || 0} online video courses with new additions published every month</p>
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{courses?.length || 0} results</p>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <span>Sort by: {sortBy}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuItem onClick={() => setSortBy('Most Popular')}>
                    Most Popular
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('Highest Rated')}>
                    Highest Rated
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('Newest')}>
                    Newest
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('Price: Low to High')}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('Price: High to Low')}>
                    Price: High to Low
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="flex p-4">
                      <div className="w-64 h-36 mr-4 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {courses?.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button size="sm" className="bg-purple-600">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
