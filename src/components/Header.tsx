
import React, { useState } from 'react';
import { Search, ShoppingCart, Globe, Menu, User, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const categories = [
    {
      title: "Development",
      subcategories: ["Web Development", "Mobile Development", "Programming Languages", "Game Development", "Database Design", "Software Testing", "Software Engineering", "Development Tools"]
    },
    {
      title: "Business",
      subcategories: ["Entrepreneurship", "Communications", "Management", "Sales", "Business Strategy", "Operations", "Project Management", "Business Law"]
    },
    {
      title: "Finance & Accounting",
      subcategories: ["Accounting & Bookkeeping", "Compliance", "Cryptocurrency & Blockchain", "Economics", "Finance", "Finance Cert & Exam Prep", "Financial Modeling & Analysis", "Investing & Trading"]
    },
    {
      title: "IT & Software",
      subcategories: ["IT Certifications", "Network & Security", "Hardware", "Operating Systems", "Other IT & Software"]
    },
    {
      title: "Office Productivity",
      subcategories: ["Microsoft", "Apple", "Google", "SAP", "Oracle", "Other Office Productivity"]
    },
    {
      title: "Personal Development",
      subcategories: ["Personal Transformation", "Personal Productivity", "Leadership", "Career Development", "Parenting & Relationships", "Happiness"]
    },
    {
      title: "Design",
      subcategories: ["Web Design", "Graphic Design & Illustration", "Design Tools", "User Experience Design", "Game Design", "3D & Animation", "Fashion Design", "Architectural Design"]
    },
    {
      title: "Marketing",
      subcategories: ["Digital Marketing", "Search Engine Optimization", "Social Media Marketing", "Branding", "Marketing Fundamentals", "Analytics & Automation", "Public Relations", "Advertising"]
    }
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo và Categories */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded"></div>
              <span className="text-2xl font-bold text-gray-900">Udemy</span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden lg:flex items-center space-x-1 text-gray-600 hover:text-purple-600">
                  <Menu className="w-4 h-4" />
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 max-h-96 overflow-y-auto bg-white">
                <div className="grid grid-cols-1 gap-1">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.title} className="cursor-pointer">
                      <div className="w-full">
                        <div className="font-semibold text-purple-600 mb-1">{category.title}</div>
                        <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                          {category.subcategories.slice(0, 4).map((sub) => (
                            <Link 
                              key={sub} 
                              to={`/search?category=${encodeURIComponent(sub.toLowerCase())}`}
                              className="hover:text-purple-600"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search for anything" 
                className="pl-10 h-12 border-gray-900 focus:border-purple-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/courses" className="hidden lg:block text-gray-600 hover:text-purple-600">
              Udemy Business
            </Link>
            <Link to="/instructor/dashboard" className="hidden lg:block text-gray-600 hover:text-purple-600">
              Teach on Udemy
            </Link>
            
            <Link to="/courses" className="hidden lg:block text-gray-600 hover:text-purple-600">
              My learning
            </Link>

            <Link to="/blog" className="hidden lg:block text-gray-600 hover:text-purple-600">
              Blog
            </Link>

            <button className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                3
              </Badge>
            </button>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                2
              </Badge>
            </Link>

            <Link to="/profile">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>

            <Button variant="outline" size="sm" asChild>
              <Link to="/auth">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/auth">Sign up</Link>
            </Button>

            <button className="text-gray-600">
              <Globe className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
