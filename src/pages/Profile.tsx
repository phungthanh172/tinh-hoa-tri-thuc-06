
import React, { useState } from 'react';
import { User, Settings, BookOpen, Award, Star, Clock, Users, Camera, Edit3, Mail, Phone, MapPin, Calendar, Heart, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    joinDate: "January 2022",
    location: "San Francisco, CA",
    totalCourses: 12,
    completedCourses: 8,
    certificatesEarned: 6,
    totalHours: 156,
    bio: "Passionate web developer and lifelong learner. Love exploring new technologies and building amazing projects."
  };

  const enrolledCourses = [
    {
      id: 1,
      title: "The Complete JavaScript Course 2024",
      instructor: "Jonas Schmedtmann",
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop",
      progress: 75,
      totalHours: 69,
      completedHours: 52,
      rating: 4.7,
      lastWatched: "2 hours ago",
      status: "In Progress"
    },
    {
      id: 2,
      title: "React - The Complete Guide 2024",
      instructor: "Maximilian Schwarzmüller",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      progress: 100,
      totalHours: 48,
      completedHours: 48,
      rating: 4.6,
      lastWatched: "1 week ago",
      status: "Completed",
      certificate: true
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Jose Portilla",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
      progress: 45,
      totalHours: 25,
      completedHours: 11,
      rating: 4.5,
      lastWatched: "3 days ago",
      status: "In Progress"
    }
  ];

  const certificates = [
    {
      id: 1,
      courseName: "React - The Complete Guide 2024",
      instructor: "Maximilian Schwarzmüller",
      completedDate: "March 2024",
      certificateId: "UC-12345678"
    },
    {
      id: 2,
      courseName: "JavaScript Algorithms and Data Structures",
      instructor: "Colt Steele",
      completedDate: "February 2024",
      certificateId: "UC-87654321"
    }
  ];

  const wishlist = [
    {
      id: 1,
      title: "Node.js, Express, MongoDB & More",
      instructor: "Jonas Schmedtmann",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
      price: 84.99,
      originalPrice: 199.99,
      rating: 4.6,
      students: 234567
    },
    {
      id: 2,
      title: "Advanced CSS and Sass",
      instructor: "Jonas Schmedtmann",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      price: 79.99,
      originalPrice: 179.99,
      rating: 4.7,
      students: 156789
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{user.bio}</p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mb-4">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{user.totalCourses}</div>
                    <div className="text-xs text-gray-600">Total Courses</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{user.completedCourses}</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{user.certificatesEarned}</div>
                    <div className="text-xs text-gray-600">Certificates</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{user.totalHours}</div>
                    <div className="text-xs text-gray-600">Hours Learned</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full mb-8">
                <TabsTrigger value="courses" className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>My Courses</span>
                </TabsTrigger>
                <TabsTrigger value="certificates" className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Certificates</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>

              {/* My Courses Tab */}
              <TabsContent value="courses">
                <div className="space-y-6">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <div className="flex">
                        <div className="w-48 h-32">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover rounded-l-lg"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <Link to={`/course/${course.id}`}>
                                <h3 className="text-lg font-semibold mb-2 hover:text-purple-600">
                                  {course.title}
                                </h3>
                              </Link>
                              <p className="text-gray-600 text-sm mb-2">By {course.instructor}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span>{course.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{course.completedHours}/{course.totalHours} hours</span>
                                </div>
                                <span>Last watched {course.lastWatched}</span>
                              </div>
                              
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-2" />
                              </div>

                              <div className="flex items-center space-x-4">
                                <Badge 
                                  variant={course.status === 'Completed' ? 'default' : 'secondary'}
                                  className={course.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                                >
                                  {course.status}
                                </Badge>
                                {course.certificate && (
                                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                                    <Award className="w-3 h-3 mr-1" />
                                    Certificate Earned
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="ml-4 flex flex-col space-y-2">
                              <Button size="sm">
                                {course.status === 'Completed' ? 'Review' : 'Continue'}
                              </Button>
                              {course.certificate && (
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4 mr-1" />
                                  Certificate
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Certificates Tab */}
              <TabsContent value="certificates">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map((cert) => (
                    <Card key={cert.id} className="border-2 border-dashed border-gray-300 hover:border-purple-300 transition-colors">
                      <CardContent className="p-6 text-center">
                        <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">{cert.courseName}</h3>
                        <p className="text-gray-600 text-sm mb-2">Instructor: {cert.instructor}</p>
                        <p className="text-gray-600 text-sm mb-4">Completed: {cert.completedDate}</p>
                        <p className="text-xs text-gray-500 mb-4">Certificate ID: {cert.certificateId}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlist.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        </button>
                      </div>
                      <CardContent className="p-4">
                        <Link to={`/course/${course.id}`}>
                          <h3 className="font-semibold mb-2 hover:text-purple-600 line-clamp-2">
                            {course.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-semibold">{course.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{course.students.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold">${course.price}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
                          </div>
                          <Button size="sm">Add to Cart</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Full Name</label>
                          <input type="text" defaultValue={user.name} className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input type="email" defaultValue={user.email} className="w-full p-2 border rounded-md" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Email notifications</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>SMS notifications</span>
                          <input type="checkbox" className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Marketing emails</span>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
