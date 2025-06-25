
import React, { useState, useEffect, useRef } from 'react';
import { Search, MessageSquare, Users, Tag, Edit, Send, Settings, UserPlus, Hash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useChatSocket } from '@/hooks/useChatSocket';

interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  nickname?: string;
  tags: string[];
  isOnline: boolean;
  lastSeen: Date;
  role: 'student' | 'instructor';
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  recipientId?: string;
  content: string;
  timestamp: Date;
  isPrivate: boolean;
  type: 'text' | 'announcement' | 'system';
}

const ChatManagement = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [message, setMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ChatUser | null>(null);
  const [newNickname, setNewNickname] = useState('');
  const [newTag, setNewTag] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket, isConnected } = useChatSocket();

  // Sample data - in real app this would come from your backend
  useEffect(() => {
    const sampleUsers: ChatUser[] = [
      {
        id: '1',
        name: 'John Student',
        email: 'student@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        nickname: 'Johnny',
        tags: ['beginner', 'web-dev'],
        isOnline: true,
        lastSeen: new Date(),
        role: 'student'
      },
      {
        id: '2',
        name: 'Sarah Instructor',
        email: 'instructor@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
        nickname: 'Prof Sarah',
        tags: ['advanced', 'mentor'],
        isOnline: false,
        lastSeen: new Date(Date.now() - 30000),
        role: 'instructor'
      },
      {
        id: '4',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        nickname: 'Alice_JS',
        tags: ['javascript', 'react'],
        isOnline: true,
        lastSeen: new Date(),
        role: 'student'
      },
      {
        id: '5',
        name: 'Bob Wilson',
        email: 'bob@example.com',
        tags: ['python', 'beginner'],
        isOnline: true,
        lastSeen: new Date(),
        role: 'student'
      }
    ];
    setChatUsers(sampleUsers);

    const sampleMessages: ChatMessage[] = [
      {
        id: '1',
        senderId: '1',
        senderName: 'John Student',
        content: 'Hello Professor! I have a question about React hooks.',
        timestamp: new Date(Date.now() - 60000),
        isPrivate: false,
        type: 'text'
      },
      {
        id: '2',
        senderId: '3',
        senderName: 'Mike Admin',
        content: 'Hi everyone! Welcome to our study group.',
        timestamp: new Date(Date.now() - 30000),
        isPrivate: false,
        type: 'announcement'
      }
    ];
    setMessages(sampleMessages);
  }, []);

  // Real-time message handling
  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (newMessage: ChatMessage) => {
        setMessages(prev => [...prev, newMessage]);
        toast.success(`New message from ${newMessage.senderName}`);
      });

      socket.on('userJoined', (user: ChatUser) => {
        setChatUsers(prev => prev.map(u => 
          u.id === user.id ? { ...u, isOnline: true } : u
        ));
        toast.info(`${user.name} joined the chat`);
      });

      socket.on('userLeft', (userId: string) => {
        setChatUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, isOnline: false, lastSeen: new Date() } : u
        ));
      });

      return () => {
        socket.off('newMessage');
        socket.off('userJoined');
        socket.off('userLeft');
      };
    }
  }, [socket]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredUsers = chatUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.nickname && user.nickname.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         user.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === 'all' || user.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(chatUsers.flatMap(user => user.tags)));

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: user?.id || '3',
      senderName: user?.name || 'Professor',
      recipientId: selectedUser?.id,
      content: message.trim(),
      timestamp: new Date(),
      isPrivate: !!selectedUser,
      type: 'text'
    };

    // Send via socket
    if (socket) {
      socket.emit('sendMessage', newMessage);
    }

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    toast.success(selectedUser ? `Private message sent to ${selectedUser.name}` : 'Message sent to chat');
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;

    const updatedUser: ChatUser = {
      ...editingUser,
      nickname: newNickname || editingUser.nickname,
      tags: newTag ? [...editingUser.tags, newTag] : editingUser.tags
    };

    setChatUsers(prev => prev.map(u => u.id === editingUser.id ? updatedUser : u));
    setIsUserDialogOpen(false);
    setEditingUser(null);
    setNewNickname('');
    setNewTag('');
    toast.success('User updated successfully');
  };

  const removeTag = (userId: string, tagToRemove: string) => {
    setChatUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, tags: u.tags.filter(tag => tag !== tagToRemove) }
        : u
    ));
  };

  const sendAnnouncement = () => {
    if (!message.trim()) return;

    const announcement: ChatMessage = {
      id: Date.now().toString(),
      senderId: user?.id || '3',
      senderName: 'Professor',
      content: message.trim(),
      timestamp: new Date(),
      isPrivate: false,
      type: 'announcement'
    };

    if (socket) {
      socket.emit('sendMessage', announcement);
    }

    setMessages(prev => [...prev, announcement]);
    setMessage('');
    toast.success('Announcement sent to all users');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Users List */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Chat Users ({filteredUsers.length})
            </div>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-gray-500">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </CardTitle>
          
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <div className="space-y-2 p-4">
              {filteredUsers.map(chatUser => (
                <div
                  key={chatUser.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedUser?.id === chatUser.id ? 'bg-purple-50 border-purple-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedUser(selectedUser?.id === chatUser.id ? null : chatUser)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={chatUser.avatar} />
                          <AvatarFallback>{chatUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          chatUser.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {chatUser.nickname || chatUser.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{chatUser.email}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {chatUser.role}
                        </Badge>
                      </div>
                    </div>
                    
                    <Dialog open={isUserDialogOpen && editingUser?.id === chatUser.id} onOpenChange={setIsUserDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingUser(chatUser);
                            setNewNickname(chatUser.nickname || '');
                            setIsUserDialogOpen(true);
                          }}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit User: {chatUser.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Nickname</Label>
                            <Input
                              value={newNickname}
                              onChange={(e) => setNewNickname(e.target.value)}
                              placeholder="Enter nickname"
                            />
                          </div>
                          <div>
                            <Label>Add Tag</Label>
                            <Input
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              placeholder="Enter new tag"
                            />
                          </div>
                          <div>
                            <Label>Current Tags</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {chatUser.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="cursor-pointer">
                                  {tag}
                                  <button
                                    onClick={() => removeTag(chatUser.id, tag)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                  >
                                    ×
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button onClick={handleUpdateUser} className="w-full">
                            Update User
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {chatUser.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {chatUser.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Hash className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {chatUser.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{chatUser.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              {selectedUser ? `Private Chat with ${selectedUser.nickname || selectedUser.name}` : 'General Chat'}
            </div>
            {selectedUser && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedUser(null)}
              >
                Back to General
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Messages */}
          <ScrollArea className="h-[350px] border rounded-lg p-4">
            <div className="space-y-4">
              {messages
                .filter(msg => selectedUser ? 
                  (msg.isPrivate && (msg.senderId === selectedUser.id || msg.recipientId === selectedUser.id)) :
                  !msg.isPrivate
                )
                .map(msg => (
                <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.type === 'announcement' 
                      ? 'bg-yellow-100 border border-yellow-200' 
                      : msg.senderId === user?.id 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100'
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium">
                        {msg.senderId === user?.id ? 'Professor (You)' : msg.senderName}
                      </span>
                      {msg.type === 'announcement' && (
                        <Badge variant="outline" className="text-xs">Announcement</Badge>
                      )}
                      <span className="text-xs opacity-70">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Textarea
                placeholder={selectedUser ? `Message ${selectedUser.nickname || selectedUser.name}...` : "Type your message..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1 min-h-[60px]"
              />
              <div className="flex flex-col space-y-2">
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
                {!selectedUser && (
                  <Button onClick={sendAnnouncement} variant="outline" disabled={!message.trim()}>
                    📢
                  </Button>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {selectedUser 
                ? `Sending private message to ${selectedUser.nickname || selectedUser.name}` 
                : 'Sending to general chat • Press Enter to send'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatManagement;
