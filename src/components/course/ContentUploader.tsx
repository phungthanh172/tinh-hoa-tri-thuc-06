
import React, { useState } from 'react';
import { Upload, File, Video, Image, FileText, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface UploadedFile {
  id: string;
  name: string;
  type: 'video' | 'document' | 'image' | 'audio';
  size: string;
  duration?: string;
  url: string;
  uploadProgress: number;
}

const ContentUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Introduction_to_JavaScript.mp4',
      type: 'video',
      size: '125 MB',
      duration: '15:30',
      url: '/placeholder-video.mp4',
      uploadProgress: 100
    },
    {
      id: '2',
      name: 'Course_Slides.pdf',
      type: 'document',
      size: '2.5 MB',
      url: '/placeholder-slides.pdf',
      uploadProgress: 100
    }
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: getFileType(file.type),
        size: formatFileSize(file.size),
        url: URL.createObjectURL(file),
        uploadProgress: 0
      };

      setUploadedFiles(prev => [...prev, newFile]);
      
      // Simulate upload progress
      simulateUpload(newFile.id);
    });
  };

  const getFileType = (mimeType: string): 'video' | 'document' | 'image' | 'audio' => {
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId ? { ...file, uploadProgress: progress } : file
        )
      );
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'audio': return <Play className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Course Content</h3>
          <p className="text-gray-600 mb-4">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supported formats: MP4, MOV, PDF, DOCX, PPTX, JPG, PNG (Max 500MB)
          </p>
          
          <input
            type="file"
            multiple
            accept="video/*,image/*,audio/*,.pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <Label htmlFor="file-upload">
            <Button variant="outline" asChild>
              <span>
                <File className="w-4 h-4 mr-2" />
                Choose Files
              </span>
            </Button>
          </Label>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Uploaded Files</h4>
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="flex items-center space-x-3 flex-1">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Badge variant="outline">{file.type}</Badge>
                      <span>{file.size}</span>
                      {file.duration && <span>{file.duration}</span>}
                    </div>
                    {file.uploadProgress < 100 && (
                      <Progress value={file.uploadProgress} className="mt-2" />
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Settings */}
        <div className="space-y-4">
          <h4 className="font-medium">Upload Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="video-quality">Video Quality</Label>
              <select 
                id="video-quality"
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="auto">Auto (Recommended)</option>
                <option value="720p">720p HD</option>
                <option value="1080p">1080p Full HD</option>
                <option value="4k">4K Ultra HD</option>
              </select>
            </div>
            <div>
              <Label htmlFor="auto-captions">Auto-generate Captions</Label>
              <select 
                id="auto-captions"
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentUploader;
