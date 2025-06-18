
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Video, FileText, Link, Play, Trash2, Edit, Eye, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ContentUploadStepProps {
  courseData: any;
  setCourseData: (data: any) => void;
  isEditing: boolean;
}

const ContentUploadStep = ({ courseData, setCourseData }: ContentUploadStepProps) => {
  const [uploadedContent, setUploadedContent] = useState([
    { id: '1', name: 'Introduction Video.mp4', type: 'video', size: '25.6 MB', uploadDate: '2024-01-15', status: 'completed' },
    { id: '2', name: 'Course Overview.pdf', type: 'document', size: '2.1 MB', uploadDate: '2024-01-14', status: 'completed' },
    { id: '3', name: 'Welcome Audio.mp3', type: 'audio', size: '8.3 MB', uploadDate: '2024-01-13', status: 'completed' },
  ]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    setIsUploading(true);
    Array.from(files).forEach(file => {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadProgress(0);
          
          const newContent = {
            id: Date.now().toString(),
            name: file.name,
            type: file.type.startsWith('video/') ? 'video' : file.type.startsWith('audio/') ? 'audio' : 'document',
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'completed'
          };
          setUploadedContent(prev => [...prev, newContent]);
        }
      }, 200);
    });
  };

  const handleDeleteResource = (resourceId: string) => {
    setUploadedContent(prev => prev.filter(item => item.id !== resourceId));
  };

  const handleEditResource = (resource: any) => {
    setEditingResource(resource);
  };

  const handleSaveEdit = (updatedResource: any) => {
    setUploadedContent(prev => 
      prev.map(item => item.id === updatedResource.id ? updatedResource : item)
    );
    setEditingResource(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Play className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Upload & Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="direct-upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="direct-upload">Direct Upload</TabsTrigger>
            <TabsTrigger value="external-video">External Video</TabsTrigger>
            <TabsTrigger value="text-editor">Text Content</TabsTrigger>
            <TabsTrigger value="resource-management">Resource Management</TabsTrigger>
          </TabsList>

          <TabsContent value="direct-upload" className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Course Content</h3>
              <p className="text-gray-600 mb-4">
                Upload videos, documents, images, and other resources
              </p>
              <input
                type="file"
                multiple
                accept="video/*,audio/*,image/*,.pdf,.doc,.docx,.ppt,.pptx,.zip"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="content-upload"
              />
              <Label htmlFor="content-upload">
                <Button variant="outline" asChild>
                  <span>
                    <Video className="w-4 h-4 mr-2" />
                    Choose Files
                  </span>
                </Button>
              </Label>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading content...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="external-video" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">External Video Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="video-url">Video URL</Label>
                  <Input
                    id="video-url"
                    placeholder="https://vimeo.com/... or https://youtube.com/..."
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Supports Vimeo, YouTube private links, and other video hosting platforms
                  </p>
                </div>
                <div>
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input
                    id="video-title"
                    placeholder="Enter video title"
                  />
                </div>
                <div>
                  <Label htmlFor="video-description">Description</Label>
                  <Textarea
                    id="video-description"
                    placeholder="Brief description of the video content"
                    className="min-h-[80px]"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Link className="w-4 h-4 mr-2" />
                  Add External Video
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="text-editor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rich Text Editor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="lecture-title">Lecture Title</Label>
                  <Input
                    id="lecture-title"
                    placeholder="Enter lecture title"
                  />
                </div>
                <div>
                  <Label htmlFor="text-content">Content</Label>
                  <Textarea
                    id="text-content"
                    placeholder="Write your lecture content here..."
                    className="min-h-[300px]"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Rich text formatting, code blocks, and media embedding coming soon
                  </p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Save Text Lecture
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resource-management" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Resource Management</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Resource
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedContent.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(resource.type)}
                            <span className="font-medium">{resource.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeBadgeColor(resource.type)}>
                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{resource.size}</TableCell>
                        <TableCell>{resource.uploadDate}</TableCell>
                        <TableCell>
                          <Badge variant={resource.status === 'completed' ? 'default' : 'secondary'}>
                            {resource.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditResource(resource)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteResource(resource.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {editingResource && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Edit Resource</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name">Resource Name</Label>
                        <Input
                          id="edit-name"
                          value={editingResource.name}
                          onChange={(e) => setEditingResource({...editingResource, name: e.target.value})}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleSaveEdit(editingResource)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          Save Changes
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setEditingResource(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentUploadStep;
