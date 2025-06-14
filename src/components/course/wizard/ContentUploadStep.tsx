
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Video, FileText, Link, Play, Trash2 } from 'lucide-react';

interface ContentUploadStepProps {
  courseData: any;
  setCourseData: (data: any) => void;
  isEditing: boolean;
}

const ContentUploadStep = ({ courseData, setCourseData }: ContentUploadStepProps) => {
  const [uploadedContent, setUploadedContent] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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
            type: file.type.startsWith('video/') ? 'video' : 'file',
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            url: URL.createObjectURL(file)
          };
          setUploadedContent(prev => [...prev, newContent]);
        }
      }, 200);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Upload & Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="direct-upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="direct-upload">Direct Upload</TabsTrigger>
            <TabsTrigger value="external-video">External Video</TabsTrigger>
            <TabsTrigger value="text-editor">Text Content</TabsTrigger>
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

            {/* Uploaded Content List */}
            {uploadedContent.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Uploaded Content</h4>
                {uploadedContent.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {content.type === 'video' ? (
                        <Video className="w-5 h-5 text-blue-500" />
                      ) : (
                        <FileText className="w-5 h-5 text-gray-500" />
                      )}
                      <div>
                        <p className="font-medium">{content.name}</p>
                        <p className="text-sm text-gray-600">{content.size}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
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
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentUploadStep;
