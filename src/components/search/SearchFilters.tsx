
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, Filter } from 'lucide-react';

const SearchFilters = ({ filters, onFilterChange }) => {
  const categories = [
    'Development', 'Business', 'Finance & Accounting', 'IT & Software',
    'Office Productivity', 'Personal Development', 'Design', 'Marketing',
    'Lifestyle', 'Photography & Video', 'Health & Fitness', 'Music',
    'Teaching & Academics'
  ];

  const levels = ['Beginner', 'Intermediate', 'Expert', 'All Levels'];
  const durations = ['0-2 Hours', '3-6 Hours', '6-17 Hours', '17+ Hours'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];
  const priceRanges = ['Free', 'Paid', '$0-$50', '$50-$100', '$100-$200', '$200+'];

  const handleFilterChange = (filterType, value, checked) => {
    const newFilters = { ...filters };
    
    if (filterType === 'category') {
      newFilters.category = checked ? value : '';
    } else {
      if (checked) {
        newFilters[filterType] = [...newFilters[filterType], value];
      } else {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      }
    }
    
    onFilterChange(newFilters);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="space-y-2">
          <AccordionItem value="category">
            <AccordionTrigger className="text-sm font-medium">Category</AccordionTrigger>
            <AccordionContent className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`}
                    checked={filters.category === category}
                    onCheckedChange={(checked) => handleFilterChange('category', category, checked)}
                  />
                  <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                    {category}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rating">
            <AccordionTrigger className="text-sm font-medium">Rating</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`rating-${rating}`}
                    checked={filters.rating.includes(rating)}
                    onCheckedChange={(checked) => handleFilterChange('rating', rating, checked)}
                  />
                  <label htmlFor={`rating-${rating}`} className="text-sm flex items-center cursor-pointer">
                    <span className="flex text-yellow-400 mr-1">
                      {[...Array(Math.floor(rating))].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      {rating % 1 !== 0 && <Star className="w-3 h-3 fill-current opacity-50" />}
                    </span>
                    {rating} & up
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="level">
            <AccordionTrigger className="text-sm font-medium">Level</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {levels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`level-${level}`}
                    checked={filters.level.includes(level)}
                    onCheckedChange={(checked) => handleFilterChange('level', level, checked)}
                  />
                  <label htmlFor={`level-${level}`} className="text-sm cursor-pointer">
                    {level}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="duration">
            <AccordionTrigger className="text-sm font-medium">Duration</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {durations.map((duration) => (
                <div key={duration} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`duration-${duration}`}
                    checked={filters.duration.includes(duration)}
                    onCheckedChange={(checked) => handleFilterChange('duration', duration, checked)}
                  />
                  <label htmlFor={`duration-${duration}`} className="text-sm cursor-pointer">
                    {duration}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger className="text-sm font-medium">Price</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {priceRanges.map((price) => (
                <div key={price} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`price-${price}`}
                    checked={filters.price.includes(price)}
                    onCheckedChange={(checked) => handleFilterChange('price', price, checked)}
                  />
                  <label htmlFor={`price-${price}`} className="text-sm cursor-pointer">
                    {price}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="language">
            <AccordionTrigger className="text-sm font-medium">Language</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {languages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`language-${language}`}
                    checked={filters.language.includes(language)}
                    onCheckedChange={(checked) => handleFilterChange('language', language, checked)}
                  />
                  <label htmlFor={`language-${language}`} className="text-sm cursor-pointer">
                    {language}
                  </label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
