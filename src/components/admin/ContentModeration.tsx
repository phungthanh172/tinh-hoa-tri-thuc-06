
import React, { useState } from 'react';
import { MessageSquare, Flag, Eye, CheckCircle, XCircle, AlertTriangle, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ContentModeration = () => {
  const [reportedContent] = useState([
    {
      id: 1,
      type: 'Course Content',
      title: 'Inappropriate course material',
      reporter: 'Student123',
      reported: 'Advanced Programming Course',
      instructor: 'John Doe',
      reason: 'Contains offensive language',
      severity: 'Medium',
      status: 'Under Review',
      reportDate: '2024-01-20'
    },
    {
      id: 2,
      type: 'Forum Post',
      title: 'Spam in discussion',
      reporter: 'Teacher456',
      reported: 'Marketing discussion post',
      instructor: 'Jane Smith',
      reason: 'Promotional spam',
      severity: 'Low',
      status: 'Resolved',
      reportDate: '2024-01-18'
    }
  ]);

  const [forumPosts] = useState([
    {
      id: 1,
      course: 'JavaScript Fundamentals',
      author: 'Student A',
      content: 'Can anyone help me with async/await?',
      replies: 5,
      status: 'Active',
      flagged: false,
      date: '2024-01-20'
    },
    {
      id: 2,
      course: 'Python Basics',
      author: 'Student B',
      content: 'This is promotional spam content...',
      replies: 0,
      status: 'Flagged',
      flagged: true,
      date: '2024-01-19'
    }
  ]);

  const handleContentAction = (contentId: number, action: string) => {
    console.log(`Performing ${action} on content ${contentId}`);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Content Reports</TabsTrigger>
          <TabsTrigger value="forums">Forum Moderation</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Review</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Flag className="w-5 h-5 mr-2" />
                  Reported Content
                </span>
                <Button variant="outline" size="sm">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Priority Queue
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportedContent.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-gray-500">{report.type} • {report.instructor}</div>
                          </div>
                        </TableCell>
                        <TableCell>{report.reporter}</TableCell>
                        <TableCell className="text-sm">{report.reason}</TableCell>
                        <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === 'Resolved' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Moderate Content - {report.title}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <Button 
                                      variant="default"
                                      onClick={() => handleContentAction(report.id, 'approve')}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Approve Content
                                    </Button>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleContentAction(report.id, 'remove')}
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Remove Content
                                    </Button>
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    className="w-full"
                                    onClick={() => handleContentAction(report.id, 'warn-user')}
                                  >
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    Warn User
                                  </Button>
                                  <div>
                                    <label className="text-sm font-medium">Moderation Notes</label>
                                    <Textarea 
                                      placeholder="Add your moderation decision notes..."
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forums">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Forum & Discussion Moderation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Content Preview</TableHead>
                      <TableHead>Replies</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forumPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.course}</TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell className="text-sm max-w-xs truncate">{post.content}</TableCell>
                        <TableCell>{post.replies}</TableCell>
                        <TableCell>
                          <Badge variant={post.flagged ? 'destructive' : 'default'}>
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {post.flagged && (
                              <Button variant="destructive" size="sm">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Content Compliance Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Pending Review</h3>
                      <p className="text-3xl font-bold text-orange-600">12</p>
                      <p className="text-sm text-gray-500">Courses awaiting compliance check</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Approved Today</h3>
                      <p className="text-3xl font-bold text-green-600">8</p>
                      <p className="text-sm text-gray-500">Courses approved in last 24h</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Violations</h3>
                      <p className="text-3xl font-bold text-red-600">3</p>
                      <p className="text-sm text-gray-500">Policy violations this week</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Review Content Quality Standards
                </Button>
                <Button className="w-full" variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Update Community Guidelines
                </Button>
                <Button className="w-full" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Bulk Approve Verified Instructors
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentModeration;
