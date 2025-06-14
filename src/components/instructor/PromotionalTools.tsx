
import React, { useState } from 'react';
import { Megaphone, Users, Gift, Share2, Copy, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PromotionalTools = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [promoText, setPromoText] = useState('');

  const activeCoupons = [
    {
      id: '1',
      code: 'WELCOME20',
      discount: '20%',
      usage: 45,
      limit: 100,
      expires: '2024-02-15',
      status: 'active'
    },
    {
      id: '2',
      code: 'EARLY50',
      discount: '50%',
      usage: 12,
      limit: 50,
      expires: '2024-01-30',
      status: 'active'
    }
  ];

  const shareableLinks = [
    {
      course: 'JavaScript Fundamentals',
      url: 'https://mysite.com/course/js-fundamentals',
      clicks: 256,
      conversions: 23
    },
    {
      course: 'React for Beginners',
      url: 'https://mysite.com/course/react-beginners',
      clicks: 189,
      conversions: 18
    }
  ];

  const handleCreateCoupon = () => {
    if (couponCode && discount) {
      console.log('Creating coupon:', { code: couponCode, discount });
      setCouponCode('');
      setDiscount('');
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    console.log('Link copied:', url);
  };

  const handleShare = (platform: string, url: string) => {
    console.log(`Sharing on ${platform}:`, url);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="coupons" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="coupons">Coupons & Discounts</TabsTrigger>
          <TabsTrigger value="sharing">Course Sharing</TabsTrigger>
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="coupons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="w-5 h-5" />
                <span>Create New Coupon</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coupon-code">Coupon Code</Label>
                  <Input
                    id="coupon-code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g., WELCOME25"
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Discount</Label>
                  <Select value={discount} onValueChange={setDiscount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select discount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10%">10% Off</SelectItem>
                      <SelectItem value="20%">20% Off</SelectItem>
                      <SelectItem value="30%">30% Off</SelectItem>
                      <SelectItem value="50%">50% Off</SelectItem>
                      <SelectItem value="$10">$10 Off</SelectItem>
                      <SelectItem value="$25">$25 Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleCreateCoupon}>
                <Gift className="w-4 h-4 mr-2" />
                Create Coupon
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCoupons.map((coupon) => (
                  <div key={coupon.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium">{coupon.code}</h4>
                        <Badge variant="outline">{coupon.discount}</Badge>
                        <Badge variant={coupon.status === 'active' ? 'default' : 'secondary'}>
                          {coupon.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span>Used: {coupon.usage}/{coupon.limit}</span>
                        <span>Expires: {coupon.expires}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Deactivate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sharing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Shareable Course Links</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shareableLinks.map((link, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{link.course}</h4>
                    <div className="flex items-center space-x-2 mb-3">
                      <Input value={link.url} readOnly className="flex-1" />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCopyLink(link.url)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4 text-sm text-gray-600">
                        <span>Clicks: {link.clicks}</span>
                        <span>Conversions: {link.conversions}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShare('facebook', link.url)}
                        >
                          <Facebook className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShare('twitter', link.url)}
                        >
                          <Twitter className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShare('linkedin', link.url)}
                        >
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Email Campaigns</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="promo-text">Promotional Message</Label>
                <Textarea
                  id="promo-text"
                  value={promoText}
                  onChange={(e) => setPromoText(e.target.value)}
                  placeholder="Write a promotional message for your students..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex space-x-2">
                <Button>
                  <Mail className="w-4 h-4 mr-2" />
                  Send to All Students
                </Button>
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Send to Course Students
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Course Launch</h4>
                  <p className="text-sm text-gray-600 mb-3">Announce your new course to existing students</p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Special Discount</h4>
                  <p className="text-sm text-gray-600 mb-3">Promote special offers and discounts</p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Course Update</h4>
                  <p className="text-sm text-gray-600 mb-3">Notify students about course updates</p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Welcome Message</h4>
                  <p className="text-sm text-gray-600 mb-3">Welcome new students to your course</p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionalTools;
