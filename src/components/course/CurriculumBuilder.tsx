
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  Copy, 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  Download,
  ChevronDown,
  ChevronUp,
  Edit
} from 'lucide-react';
import SectionCard from './curriculum/SectionCard';
import LectureCard from './curriculum/LectureCard';
import { Section, Lecture } from './curriculum/types';

interface CurriculumBuilderProps {
  sections: Section[];
  onSectionsChange: (sections: Section[]) => void;
}

const CurriculumBuilder = ({ sections, onSectionsChange }: CurriculumBuilderProps) => {
  const [draggedItem, setDraggedItem] = useState<any>(null);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: `Section ${sections.length + 1}`,
      description: '',
      lectures: [],
      isExpanded: true,
      learningObjectives: []
    };
    onSectionsChange([...sections, newSection]);
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    );
    onSectionsChange(updatedSections);
  };

  const deleteSection = (sectionId: string) => {
    const updatedSections = sections.filter(section => section.id !== sectionId);
    onSectionsChange(updatedSections);
  };

  const addLecture = (sectionId: string) => {
    const newLecture: Lecture = {
      id: Date.now().toString(),
      title: 'New Lecture',
      type: 'video',
      duration: '10:00',
      isPreview: false,
      description: ''
    };

    const updatedSections = sections.map(section =>
      section.id === sectionId
        ? { ...section, lectures: [...section.lectures, newLecture] }
        : section
    );
    onSectionsChange(updatedSections);
  };

  const updateLecture = (sectionId: string, lectureId: string, updates: Partial<Lecture>) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            lectures: section.lectures.map(lecture =>
              lecture.id === lectureId ? { ...lecture, ...updates } : lecture
            )
          }
        : section
    );
    onSectionsChange(updatedSections);
  };

  const deleteLecture = (sectionId: string, lectureId: string) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            lectures: section.lectures.filter(lecture => lecture.id !== lectureId)
          }
        : section
    );
    onSectionsChange(updatedSections);
  };

  const duplicateSection = (section: Section) => {
    const duplicatedSection: Section = {
      ...section,
      id: Date.now().toString(),
      title: `${section.title} (Copy)`,
      lectures: section.lectures.map(lecture => ({
        ...lecture,
        id: Date.now().toString() + Math.random()
      }))
    };
    onSectionsChange([...sections, duplicatedSection]);
  };

  const duplicateLecture = (sectionId: string, lecture: Lecture) => {
    const duplicatedLecture: Lecture = {
      ...lecture,
      id: Date.now().toString(),
      title: `${lecture.title} (Copy)`
    };

    const updatedSections = sections.map(section =>
      section.id === sectionId
        ? { ...section, lectures: [...section.lectures, duplicatedLecture] }
        : section
    );
    onSectionsChange(updatedSections);
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    onSectionsChange(newSections);
  };

  const moveLecture = (fromSectionId: string, toLectionId: string, fromIndex: number, toIndex: number) => {
    const updatedSections = sections.map(section => {
      if (section.id === fromSectionId) {
        const newLectures = [...section.lectures];
        const [movedLecture] = newLectures.splice(fromIndex, 1);
        newLectures.splice(toIndex, 0, movedLecture);
        return { ...section, lectures: newLectures };
      }
      return section;
    });
    onSectionsChange(updatedSections);
  };

  const getTotalDuration = () => {
    let totalMinutes = 0;
    sections.forEach(section => {
      section.lectures.forEach(lecture => {
        if (lecture.duration) {
          const [minutes, seconds] = lecture.duration.split(':').map(Number);
          totalMinutes += minutes + (seconds / 60);
        }
      });
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
  };

  const getTotalLectures = () => {
    return sections.reduce((total, section) => total + section.lectures.length, 0);
  };

  return (
    <div className="space-y-6">
      {/* Curriculum Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Curriculum Overview</span>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>{sections.length} sections</span>
              <span>{getTotalLectures()} lectures</span>
              <span>{getTotalDuration()} total length</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button onClick={addSection} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Section
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, sectionIndex) => (
          <SectionCard
            key={section.id}
            section={section}
            sectionIndex={sectionIndex}
            onUpdate={(updates) => updateSection(section.id, updates)}
            onDelete={() => deleteSection(section.id)}
            onDuplicate={() => duplicateSection(section)}
            onAddLecture={() => addLecture(section.id)}
            onUpdateLecture={(lectureId, updates) => updateLecture(section.id, lectureId, updates)}
            onDeleteLecture={(lectureId) => deleteLecture(section.id, lectureId)}
            onDuplicateLecture={(lecture) => duplicateLecture(section.id, lecture)}
          />
        ))}
      </div>

      {sections.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-500 mb-4">
              <FileText className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-lg font-medium">No sections yet</h3>
              <p className="text-sm">Start building your course by adding your first section.</p>
            </div>
            <Button onClick={addSection} className="flex items-center gap-2 mx-auto">
              <Plus className="w-4 h-4" />
              Add Your First Section
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CurriculumBuilder;
