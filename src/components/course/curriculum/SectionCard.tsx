
import React from 'react';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import LectureCard from './LectureCard';
import { Section, Lecture } from './types';

interface SectionCardProps {
  section: Section;
  sectionIndex: number;
  onUpdate: (updates: Partial<Section>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onAddLecture: () => void;
  onUpdateLecture: (lectureId: string, updates: Partial<Lecture>) => void;
  onDeleteLecture: (lectureId: string) => void;
  onDuplicateLecture: (lecture: Lecture) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({
  section,
  sectionIndex,
  onUpdate,
  onDelete,
  onDuplicate,
  onAddLecture,
  onUpdateLecture,
  onDeleteLecture,
  onDuplicateLecture,
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
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <Input
            value={section.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Section title"
            className="font-semibold"
          />
          <Input
            value={section.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
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
              onUpdateLecture={(sectionId, lectureId, field, value) => {
                if (typeof field === 'string' && typeof value === 'string') {
                  onUpdateLecture(lectureId, { [field]: value });
                }
              }}
              onDeleteLecture={(sectionId, lectureId) => onDeleteLecture(lectureId)}
            />
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={onAddLecture}
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
