
import React, { useState } from 'react';
import { Search, ShoppingCart, Globe, Menu, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo và Menu */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded"></div>
              <span className="text-2xl font-bold text-gray-900">Udemy</span>
            </Link>
            
            <button className="hidden lg:flex items-center space-x-1 text-gray-600 hover:text-purple-600">
              <Menu className="w-4 h-4" />
              <span>Categories</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search for anything" 
                className="pl-10 h-12 border-gray-900 focus:border-purple-600"
              />
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/courses" className="hidden lg:block text-gray-600 hover:text-purple-600">
              Udemy Business
            </Link>
            <Link to="/courses" className="hidden lg:block text-gray-600 hover:text-purple-600">
              Teach on Udemy
            </Link>
            
            <Link to="/courses" className="hidden lg:block text-gray-600 hover:text-purple-600">
              My learning
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
