
import React from 'react';
import { Upload, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FileUploadZoneProps {
  dragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadZone = ({
  dragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileInput
}: FileUploadZoneProps) => {
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'
      }`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
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
        onChange={onFileInput}
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
  );
};

export default FileUploadZone;
