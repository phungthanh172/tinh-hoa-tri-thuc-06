
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FileUploadZone from './upload/FileUploadZone';
import UploadedFilesList from './upload/UploadedFilesList';
import UploadSettings from './upload/UploadSettings';

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FileUploadZone
          dragActive={dragActive}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onFileInput={handleFileInput}
        />

        <UploadedFilesList
          files={uploadedFiles}
          onRemoveFile={removeFile}
        />

        <UploadSettings />
      </CardContent>
    </Card>
  );
};

export default ContentUploader;
