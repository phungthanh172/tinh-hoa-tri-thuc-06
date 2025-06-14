
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap, Package, Gift, Percent } from 'lucide-react';

const PricingModels = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      icon: Star,
      price: { monthly: 9.99, annual: 99.99 },
      description: 'Perfect for beginners',
      features: [
        'Access to 100+ courses',
        'Standard video quality',
        'Basic quizzes',
        'Email support',
        'Mobile app access'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: Crown,
      price: { monthly: 19.99, annual: 199.99 },
      description: 'Most popular choice',
      features: [
        'Access to 500+ courses',
        'HD video quality',
        'Advanced quizzes & assignments',
        'Priority support',
        'Offline downloads',
        'Certificates of completion',
        'Learning paths'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Zap,
      price: { monthly: 39.99, annual: 399.99 },
      description: 'For serious learners',
      features: [
        'Access to all courses',
        '4K video quality',
        'Advanced assessments',
        '24/7 priority support',
        'Offline downloads',
        'Verified certificates',
        'Personal learning coach',
        'Group study sessions',
        'Early access to new courses'
      ],
      popular: false
    }
  ];

  const courseBundles = [
    {
      id: 'web-dev',
      name: 'Complete Web Development',
      courses: ['HTML/CSS Mastery', 'JavaScript Expert', 'React Professional', 'Node.js Backend'],
      originalPrice: 299.99,
      bundlePrice: 199.99,
      savings: 33,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop'
    },
    {
      id: 'data-science',
      name: 'Data Science Specialist',
      courses: ['Python Fundamentals', 'Data Analysis', 'Machine Learning', 'Deep Learning'],
      originalPrice: 399.99,
      bundlePrice: 249.99,
      savings: 38,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
    },
    {
      id: 'business',
      name: 'Business Mastery',
      courses: ['Digital Marketing', 'Project Management', 'Leadership', 'Finance'],
      originalPrice: 349.99,
      bundlePrice: 219.99,
      savings: 37,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
    }
  ];

  const promotions = [
    {
      id: 'flash-sale',
      title: 'Flash Sale - 50% Off',
      description: 'Limited time offer on selected courses',
      code: 'FLASH50',
      discount: 50,
      type: 'percentage',
      expiresIn: '2 days',
      courses: 15
    },
    {
      id: 'new-year',
      title: 'New Year Special',
      description: 'Start learning with our best deal',
      code: 'NEWYEAR25',
      discount: 25,
      type: 'percentage',
      expiresIn: '1 week',
      courses: 50
    }
  ];

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const getAnnualSavings = (plan) => {
    const monthlyCost = plan.price.monthly * 12;
    const annualCost = plan.price.annual;
    const savings = ((monthlyCost - annualCost) / monthlyCost * 100).toFixed(0);
    return savings;
  };

  return (
    <div className="space-y-12">
      {/* Subscription Plans */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Choose Your Learning Plan</h2>
          <p className="text-gray-600 mb-6">Get unlimited access to thousands of courses</p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={billingCycle === 'monthly' ? 'font-semibold' : 'text-gray-600'}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-14 h-7 bg-gray-200 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${billingCycle === 'annual' ? 'translate-x-7' : ''}`} />
            </button>
            <span className={billingCycle === 'annual' ? 'font-semibold' : 'text-gray-600'}>
              Annual <Badge className="ml-2 bg-green-100 text-green-800">Save 20%</Badge>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan) => {
            const PlanIcon = plan.icon;
            return (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-purple-500 shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <PlanIcon className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  <div className="mt-4">
                    <div className="text-4xl font-bold">
                      {formatPrice(plan.price[billingCycle])}
                    </div>
                    <div className="text-gray-600">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </div>
                    {billingCycle === 'annual' && (
                      <div className="text-sm text-green-600 mt-2">
                        Save {getAnnualSavings(plan)}% annually
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-800 hover:bg-gray-900'}`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Course Bundles */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Course Bundles</h2>
          <p className="text-gray-600">Save more with curated learning paths</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courseBundles.map((bundle) => (
            <Card key={bundle.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={bundle.image} 
                  alt={bundle.name}
                  className="w-full h-48 object-cover rounded-t"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white">
                    <Package className="w-3 h-3 mr-1" />
                    Bundle
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{bundle.name}</h3>
                <div className="space-y-2 mb-4">
                  {bundle.courses.map((course, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {formatPrice(bundle.bundlePrice)}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(bundle.originalPrice)}
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Save {bundle.savings}%
                  </Badge>
                </div>
                <Button className="w-full">Add Bundle to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Active Promotions */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Limited Time Offers</h2>
          <p className="text-gray-600">Don't miss out on these amazing deals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promotions.map((promo) => (
            <Card key={promo.id} className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-orange-900 mb-2">{promo.title}</h3>
                    <p className="text-orange-700 mb-3">{promo.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-orange-600">
                      <div className="flex items-center space-x-1">
                        <Percent className="w-4 h-4" />
                        <span>{promo.discount}% off</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Gift className="w-4 h-4" />
                        <span>{promo.courses} courses</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-orange-500 text-white">
                    {promo.expiresIn} left
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-orange-200 rounded p-2 text-center font-mono text-orange-900">
                    {promo.code}
                  </div>
                  <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                    Apply Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Free Content */}
      <section className="bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Try Before You Buy</h2>
          <p className="text-gray-600">Explore our free courses and preview lectures</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            'Introduction to Programming',
            'Basic Web Design',
            'Digital Marketing Basics',
            'Project Management 101'
          ].map((course, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">{course}</h3>
                <Badge className="bg-green-100 text-green-800 mb-3">FREE</Badge>
                <Button variant="outline" size="sm" className="w-full">
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingModels;
