
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Edit, 
  Eye, 
  BarChart3, 
  Settings, 
  Copy, 
  Trash2, 
  Plus,
  Users,
  DollarSign,
  Star,
  TrendingUp,
  Megaphone,
  Tag
} from 'lucide-react';

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "The Complete JavaScript Course 2024",
      status: "Published",
      students: 756,
      revenue: 15240.50,
      rating: 4.7,
      reviews: 89,
      lastUpdated: "2024-01-15",
      category: "Development",
      level: "Beginner",
      price: 89.99,
      discountPrice: 49.99,
      hasDiscount: true
    },
    {
      id: 2,
      title: "React for Beginners",
      status: "Draft",
      students: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      lastUpdated: "2024-01-10",
      category: "Development",
      level: "Beginner",
      price: 79.99,
      discountPrice: null,
      hasDiscount: false
    },
    {
      id: 3,
      title: "Advanced Node.js Development",
      status: "Published",
      students: 423,
      revenue: 8460.00,
      rating: 4.5,
      reviews: 67,
      lastUpdated: "2024-01-12",
      category: "Development",
      level: "Advanced",
      price: 99.99,
      discountPrice: 69.99,
      hasDiscount: true
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);

  const handlePublishToggle = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, status: course.status === 'Published' ? 'Draft' : 'Published' }
        : course
    ));
  };

  const handleDuplicate = (course) => {
    const newCourse = {
      ...course,
      id: Math.max(...courses.map(c => c.id)) + 1,
      title: `${course.title} (Copy)`,
      status: 'Draft',
      students: 0,
      revenue: 0,
      rating: 0,
      reviews: 0
    };
    setCourses([...courses, newCourse]);
  };

  const handleDelete = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Course Overview</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Promotions</TabsTrigger>
          <TabsTrigger value="reviews">Reviews & Ratings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{course.title}</h3>
                      <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                        {course.status}
                      </Badge>
                      {course.hasDiscount && (
                        <Badge variant="destructive">
                          <Tag className="w-3 h-3 mr-1" />
                          Sale
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <span>{course.category}</span>
                      <span>{course.level}</span>
                      <span>Updated: {course.lastUpdated}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">
                          <span className="font-medium">{course.students}</span> students
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm">
                          <span className="font-medium">${course.revenue.toLocaleString()}</span> revenue
                        </span>
                      </div>
                      
                      {course.rating > 0 && (
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm">
                            <span className="font-medium">{course.rating}</span> ({course.reviews} reviews)
                          </span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <span className="text-sm">
                          {course.hasDiscount ? (
                            <>
                              <span className="line-through text-gray-500">${course.price}</span>
                              <span className="font-medium text-red-600 ml-1">${course.discountPrice}</span>
                            </>
                          ) : (
                            <span className="font-medium">${course.price}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analytics
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Course Actions</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Published Status</Label>
                            <Switch
                              checked={course.status === 'Published'}
                              onCheckedChange={() => handlePublishToggle(course.id)}
                            />
                          </div>
                          
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleDuplicate(course)}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate Course
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setIsPromotionDialogOpen(true)}
                          >
                            <Megaphone className="w-4 h-4 mr-2" />
                            Create Promotion
                          </Button>
                          
                          <Button 
                            variant="destructive" 
                            className="w-full"
                            onClick={() => handleDelete(course.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Course
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{course.title}</h3>
                      <Badge variant={course.hasDiscount ? 'destructive' : 'outline'}>
                        {course.hasDiscount ? 'On Sale' : 'Regular Price'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Base Price</Label>
                        <Input type="number" value={course.price} className="mt-1" />
                      </div>
                      
                      <div>
                        <Label>Sale Price</Label>
                        <Input 
                          type="number" 
                          value={course.discountPrice || ''} 
                          placeholder="Optional"
                          className="mt-1" 
                        />
                      </div>
                      
                      <div className="flex items-end">
                        <Button variant="outline" size="sm">
                          Update Pricing
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews & Ratings Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.filter(course => course.reviews > 0).map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{course.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-gray-600">({course.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      Recent feedback shows positive reception with students praising the clear explanations and practical examples.
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View All Reviews
                      </Button>
                      <Button variant="outline" size="sm">
                        Respond to Reviews
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Promotion Dialog */}
      <Dialog open={isPromotionDialogOpen} onOpenChange={setIsPromotionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Promotion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Discount Percentage</Label>
              <Input type="number" placeholder="25" className="mt-1" />
            </div>
            
            <div>
              <Label>Promotion Message</Label>
              <Textarea 
                placeholder="Limited time offer - Save 25% on this course!"
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input type="date" className="mt-1" />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" className="mt-1" />
              </div>
            </div>
            
            <Button className="w-full">
              Create Promotion
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseManagement;
