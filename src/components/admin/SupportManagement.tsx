
import React, { useState } from 'react';
import { MessageSquare, Send, Users, Megaphone, Mail, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SupportManagement = () => {
  const [supportTickets] = useState([
    {
      id: 1,
      user: 'Alice Johnson',
      userType: 'Student',
      subject: 'Cannot access purchased course',
      priority: 'High',
      status: 'Open',
      created: '2024-01-20',
      lastUpdate: '2024-01-20',
      category: 'Technical'
    },
    {
      id: 2,
      user: 'Bob Smith',
      userType: 'Instructor',
      subject: 'Payout not received',
      priority: 'Medium',
      status: 'In Progress',
      created: '2024-01-18',
      lastUpdate: '2024-01-19',
      category: 'Financial'
    },
    {
      id: 3,
      user: 'Carol Davis',
      userType: 'Student',
      subject: 'Refund request',
      priority: 'Low',
      status: 'Resolved',
      created: '2024-01-15',
      lastUpdate: '2024-01-16',
      category: 'Billing'
    }
  ]);

  const [announcements] = useState([
    {
      id: 1,
      title: 'Platform Maintenance Scheduled',
      audience: 'All Users',
      status: 'Published',
      date: '2024-01-20',
      recipients: 12450
    },
    {
      id: 2,
      title: 'New Course Submission Guidelines',
      audience: 'Instructors',
      status: 'Draft',
      date: '2024-01-19',
      recipients: 325
    }
  ]);

  const handleTicketAction = (ticketId: number, action: string) => {
    console.log(`Performing ${action} on ticket ${ticketId}`);
  };

  const handleSendAnnouncement = () => {
    console.log('Sending announcement...');
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open':
        return <Badge variant="destructive">Open</Badge>;
      case 'In Progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'Resolved':
        return <Badge variant="default">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="communication">Direct Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Support Tickets
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Clock className="w-4 h-4 mr-2" />
                    Auto-assign
                  </Button>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Bulk Actions
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Update</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ticket.user}</div>
                            <div className="text-sm text-gray-500">{ticket.userType}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                        <TableCell>{ticket.category}</TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell className="text-sm">{ticket.lastUpdate}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Support Ticket #{ticket.id} - {ticket.subject}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">User</label>
                                    <Input value={ticket.user} readOnly />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Priority</label>
                                    <Select defaultValue={ticket.priority}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                
                                <div>
                                  <label className="text-sm font-medium">Response</label>
                                  <Textarea 
                                    placeholder="Type your response to the user..."
                                    className="mt-1 min-h-32"
                                  />
                                </div>
                                
                                <div className="flex space-x-2">
                                  <Button 
                                    className="flex-1"
                                    onClick={() => handleTicketAction(ticket.id, 'respond')}
                                  >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Response
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    onClick={() => handleTicketAction(ticket.id, 'escalate')}
                                  >
                                    Escalate
                                  </Button>
                                  <Button 
                                    variant="outline"
                                    onClick={() => handleTicketAction(ticket.id, 'close')}
                                  >
                                    Close
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Megaphone className="w-5 h-5 mr-2" />
                    Create Announcement
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input placeholder="Announcement title..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Audience</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="students">Students Only</SelectItem>
                          <SelectItem value="instructors">Instructors Only</SelectItem>
                          <SelectItem value="premium">Premium Users</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea 
                      placeholder="Type your announcement message..."
                      className="mt-1 min-h-32"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={handleSendAnnouncement}>
                      <Send className="w-4 h-4 mr-2" />
                      Send Announcement
                    </Button>
                    <Button variant="outline">
                      Save as Draft
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Previous Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Audience</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {announcements.map((announcement) => (
                        <TableRow key={announcement.id}>
                          <TableCell className="font-medium">{announcement.title}</TableCell>
                          <TableCell>{announcement.audience}</TableCell>
                          <TableCell>{announcement.recipients.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={announcement.status === 'Published' ? 'default' : 'secondary'}>
                              {announcement.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{announcement.date}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Direct Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Recipient Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Specific User</SelectItem>
                        <SelectItem value="instructor">All Instructors</SelectItem>
                        <SelectItem value="students">All Students</SelectItem>
                        <SelectItem value="active">Active Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">User Search</label>
                    <Input placeholder="Search for specific user..." />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Message subject..." />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Type your message..."
                    className="mt-1 min-h-32"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Schedule Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportManagement;
