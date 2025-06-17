
import React from 'react';
import { GripVertical, Trash2, Video, FileText, HelpCircle, Upload, FileDown, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lecture } from './types';

interface LectureCardProps {
  lecture: Lecture;
  lectureIndex: number;
  sectionId: string;
  onUpdateLecture: (sectionId: string, lectureId: string, field: string, value: string | File) => void;
  onDeleteLecture: (sectionId: string, lectureId: string) => void;
}

const LectureCard: React.FC<LectureCardProps> = ({
  lecture,
  lectureIndex,
  sectionId,
  onUpdateLecture,
  onDeleteLecture,
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      case 'assignment': return <Clipboard className="w-4 h-4" />;
      case 'resource': return <FileDown className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-gray-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <GripVertical className="w-4 h-4 text-gray-400" />
            {getTypeIcon(lecture.type)}
            <span className="text-sm text-gray-600">Lecture {lectureIndex + 1}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteLecture(sectionId, lecture.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Lecture Title</Label>
              <Input
                value={lecture.title}
                onChange={(e) => onUpdateLecture(sectionId, lecture.id, 'title', e.target.value)}
                placeholder="Lecture title"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Type</Label>
                <Select
                  value={lecture.type}
                  onValueChange={(value) => onUpdateLecture(sectionId, lecture.id, 'type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="resource">Resource</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-xs">Duration</Label>
                <Input
                  value={lecture.duration || ''}
                  onChange={(e) => onUpdateLecture(sectionId, lecture.id, 'duration', e.target.value)}
                  placeholder="00:00"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {lecture.type === 'video' && (
              <div>
                <Label className="text-xs">Video Upload</Label>
                <div className="border-2 border-dashed border-gray-300 rounded p-3 text-center">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => e.target.files?.[0] && onUpdateLecture(sectionId, lecture.id, 'file', e.target.files[0])}
                    className="hidden"
                    id={`video-${lecture.id}`}
                  />
                  <Label htmlFor={`video-${lecture.id}`}>
                    <Button variant="outline" size="sm" asChild>
                      <span className="text-xs">Upload Video</span>
                    </Button>
                  </Label>
                  {lecture.file && (
                    <p className="text-xs text-green-600 mt-1">
                      {lecture.file.name}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {lecture.type === 'text' && (
              <div>
                <Label className="text-xs">Content</Label>
                <Textarea
                  value={lecture.content || ''}
                  onChange={(e) => onUpdateLecture(sectionId, lecture.id, 'content', e.target.value)}
                  placeholder="Enter lecture content..."
                  className="min-h-[80px] text-sm"
                />
              </div>
            )}

            {lecture.type === 'resource' && (
              <div>
                <Label className="text-xs">Resource Upload</Label>
                <div className="border-2 border-dashed border-gray-300 rounded p-3 text-center">
                  <FileDown className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  <input
                    type="file"
                    onChange={(e) => e.target.files?.[0] && onUpdateLecture(sectionId, lecture.id, 'file', e.target.files[0])}
                    className="hidden"
                    id={`resource-${lecture.id}`}
                  />
                  <Label htmlFor={`resource-${lecture.id}`}>
                    <Button variant="outline" size="sm" asChild>
                      <span className="text-xs">Upload Resource</span>
                    </Button>
                  </Label>
                  {lecture.file && (
                    <p className="text-xs text-green-600 mt-1">
                      {lecture.file.name}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureCard;
