
import React from 'react';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import LectureCard from './LectureCard';

interface Lecture {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration?: string;
  description?: string;
  content?: string;
  videoFile?: File;
}

interface Section {
  id: string;
  title: string;
  description: string;
  lectures: Lecture[];
}

interface SectionCardProps {
  section: Section;
  sectionIndex: number;
  onUpdateSection: (sectionId: string, field: string, value: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onAddLecture: (sectionId: string) => void;
  onUpdateLecture: (sectionId: string, lectureId: string, field: string, value: string | File) => void;
  onDeleteLecture: (sectionId: string, lectureId: string) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  sectionIndex,
  onUpdateSection,
  onDeleteSection,
  onAddLecture,
  onUpdateLecture,
  onDeleteLecture,
}) => {
  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Section {sectionIndex + 1}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteSection(section.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <Input
            value={section.title}
            onChange={(e) => onUpdateSection(section.id, 'title', e.target.value)}
            placeholder="Section title"
            className="font-semibold"
          />
          <Input
            value={section.description}
            onChange={(e) => onUpdateSection(section.id, 'description', e.target.value)}
            placeholder="Section description"
            className="text-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {section.lectures.map((lecture, lectureIndex) => (
            <LectureCard
              key={lecture.id}
              lecture={lecture}
              lectureIndex={lectureIndex}
              sectionId={section.id}
              onUpdateLecture={onUpdateLecture}
              onDeleteLecture={onDeleteLecture}
            />
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddLecture(section.id)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lecture
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
