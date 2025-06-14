
import React from 'react';
import { Video, Image, Play, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface UploadedFilesListProps {
  files: UploadedFile[];
  onRemoveFile: (fileId: string) => void;
}

const UploadedFilesList = ({ files, onRemoveFile }: UploadedFilesListProps) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'audio': return <Play className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="font-medium">Uploaded Files</h4>
      {files.map((file) => (
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
            onClick={() => onRemoveFile(file.id)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UploadedFilesList;
