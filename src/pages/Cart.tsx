
import React, { useState } from 'react';
import { Trash2, Heart, Star, Clock, Users, Tag, CreditCard, Shield, ArrowLeft, Package, Percent, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Complete JavaScript Course 2024: From Zero to Expert!",
      instructor: "Jonas Schmedtmann",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      rating: 4.7,
      reviewCount: 289456,
      studentsCount: 756843,
      duration: "69 total hours",
      lectures: 320,
      price: 84.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=200&h=120&fit=crop",
      bestseller: true,
      lastUpdated: "11/2023"
    },
    {
      id: 2,
      title: "React - The Complete Guide 2024 (incl. Next.js, Redux)",
      instructor: "Maximilian Schwarzmüller",
      instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      rating: 4.6,
      reviewCount: 152341,
      studentsCount: 434567,
      duration: "48.5 total hours",
      lectures: 835,
      price: 89.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=120&fit=crop",
      bestseller: true,
      lastUpdated: "12/2023"
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

  const currencies = {
    USD: { symbol: '$', rate: 1, name: 'US Dollar' },
    EUR: { symbol: '€', rate: 0.85, name: 'Euro' },
    GBP: { symbol: '£', rate: 0.73, name: 'British Pound' },
    CAD: { symbol: 'C$', rate: 1.25, name: 'Canadian Dollar' },
    AUD: { symbol: 'A$', rate: 1.35, name: 'Australian Dollar' },
    JPY: { symbol: '¥', rate: 110, name: 'Japanese Yen' }
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: CreditCard },
    { id: 'apple-pay', name: 'Apple Pay', icon: CreditCard },
    { id: 'google-pay', name: 'Google Pay', icon: CreditCard }
  ];

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const moveToWishlist = (id) => {
    console.log('Moving to wishlist:', id);
    removeFromCart(id);
  };

  const convertCurrency = (amount) => {
    const rate = currencies[selectedCurrency].rate;
    return (amount * rate).toFixed(2);
  };

  const formatPrice = (amount) => {
    const converted = convertCurrency(amount);
    const symbol = currencies[selectedCurrency].symbol;
    return `${symbol}${converted}`;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice, 0);
  const savings = originalTotal - subtotal;
  const promoDiscount = appliedPromo ? subtotal * (appliedPromo.discount / 100) : 0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal - promoDiscount + tax;

  const applyPromoCode = () => {
    const validPromoCodes = {
      'save10': { discount: 10, type: 'percentage' },
      'save20': { discount: 20, type: 'percentage' },
      'flat50': { discount: 50, type: 'fixed' },
      'flash25': { discount: 25, type: 'percentage' }
    };

    const promo = validPromoCodes[promoCode.toLowerCase()];
    if (promo) {
      setAppliedPromo({ code: promoCode.toUpperCase(), ...promo });
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link to="/courses" className="hover:text-purple-600 flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <p className="text-gray-600">{cartItems.length} Course{cartItems.length !== 1 ? 's' : ''} in Cart</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-600" />
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currencies).map(([code, currency]) => (
                      <SelectItem key={code} value={code}>
                        {currency.symbol} {code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-400 border-dashed rounded-full"></div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Keep shopping to find a course!</p>
            <Button asChild>
              <Link to="/courses">Keep Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Bundle Suggestion */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Package className="w-6 h-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-purple-900">Complete JavaScript Bundle Available!</h3>
                      <p className="text-sm text-purple-700">Get both courses + bonus content for 30% off</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto border-purple-300 text-purple-700 hover:bg-purple-100">
                      View Bundle
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {cartItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <div className="flex p-4">
                    <div className="w-32 h-20 mr-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Link to={`/course/${item.id}`}>
                            <h3 className="font-semibold text-lg mb-1 hover:text-purple-600 line-clamp-2">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 text-sm mb-2">By {item.instructor}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-500 font-semibold">{item.rating}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span>({item.reviewCount.toLocaleString()})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{item.studentsCount.toLocaleString()} students</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{item.duration}</span>
                            </div>
                            <span>{item.lectures} lectures</span>
                            {item.bestseller && (
                              <Badge className="bg-yellow-400 text-yellow-900 text-xs">
                                Bestseller
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-4">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center space-x-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Remove</span>
                            </button>
                            <button 
                              onClick={() => moveToWishlist(item.id)}
                              className="text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center space-x-1"
                            >
                              <Heart className="w-4 h-4" />
                              <span>Save for Later</span>
                            </button>
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {formatPrice(item.price)}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(item.originalPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Original Price:</span>
                      <span className="line-through text-gray-500">{formatPrice(originalTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discounts:</span>
                      <span className="text-green-600">-{formatPrice(savings)}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between items-center">
                        <span>Promo ({appliedPromo.code}):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600">-{formatPrice(promoDiscount)}</span>
                          <button 
                            onClick={removePromoCode}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                      />
                      <Button onClick={applyPromoCode} variant="outline" size="sm">
                        Apply
                      </Button>
                    </div>
                    {appliedPromo && (
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <Tag className="w-4 h-4" />
                        <span>Promo code applied!</span>
                      </div>
                    )}
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Payment Method</h4>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={method.id}
                            checked={selectedPaymentMethod === method.id}
                            onCheckedChange={() => setSelectedPaymentMethod(method.id)}
                          />
                          <label htmlFor={method.id} className="flex items-center space-x-2 text-sm cursor-pointer">
                            <method.icon className="w-4 h-4" />
                            <span>{method.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Secure Checkout
                  </Button>

                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>30-Day Money-Back Guarantee</span>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="space-y-2 text-xs text-gray-600 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 text-green-600">🔒</div>
                      <span>PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 text-green-600">🛡️</div>
                      <span>Fraud Protection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 text-green-600">🔐</div>
                      <span>256-bit SSL Encryption</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 text-sm text-gray-600 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 text-green-600">✓</div>
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 text-green-600">✓</div>
                      <span>Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 text-green-600">✓</div>
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
