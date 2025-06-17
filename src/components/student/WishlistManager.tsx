
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Users, Clock, ShoppingCart, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const WishlistManager = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
      instructor: "Jonas Schmedtmann",
      rating: 4.6,
      reviewCount: 234567,
      students: 850000,
      price: 84.99,
      originalPrice: 199.99,
      duration: "42 hours",
      lectures: 227,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
      level: "All Levels",
      bestseller: true,
      addedDate: "2024-12-15"
    },
    {
      id: 2,
      title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
      instructor: "Jonas Schmedtmann",
      rating: 4.7,
      reviewCount: 156789,
      students: 456123,
      price: 79.99,
      originalPrice: 179.99,
      duration: "28 hours",
      lectures: 125,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      level: "Intermediate",
      bestseller: false,
      addedDate: "2024-12-10"
    },
    {
      id: 3,
      title: "Python for Data Science and Machine Learning Bootcamp",
      instructor: "Jose Portilla",
      rating: 4.5,
      reviewCount: 98432,
      students: 321654,
      price: 74.99,
      originalPrice: 149.99,
      duration: "25 hours",
      lectures: 165,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
      level: "Beginner",
      bestseller: true,
      addedDate: "2024-12-08"
    }
  ]);

  const removeFromWishlist = (courseId: number) => {
    setWishlistItems(items => items.filter(item => item.id !== courseId));
  };

  const addToCart = (courseId: number) => {
    // In a real app, this would add the course to cart
    console.log(`Added course ${courseId} to cart`);
  };

  const moveAllToCart = () => {
    // In a real app, this would add all wishlist items to cart
    console.log('Added all wishlist items to cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">{wishlistItems.length} courses saved for later</p>
        </div>
        {wishlistItems.length > 0 && (
          <Button onClick={moveAllToCart} className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add All to Cart
          </Button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Browse courses and add them to your wishlist to save for later</p>
            <Button asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <button 
                  onClick={() => removeFromWishlist(course.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                {course.bestseller && (
                  <Badge className="absolute top-3 left-3 bg-yellow-400 text-yellow-900">
                    Bestseller
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <Link to={`/course/${course.id}`}>
                  <h3 className="font-semibold mb-2 hover:text-purple-600 line-clamp-2">
                    {course.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-2">By {course.instructor}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500 font-semibold text-sm">{course.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({course.reviewCount.toLocaleString()})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-purple-600">${course.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {course.level}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => addToCart(course.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/course/${course.id}`}>Preview</Link>
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Added on {new Date(course.addedDate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistManager;
