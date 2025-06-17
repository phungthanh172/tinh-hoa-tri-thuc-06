
import React, { useState } from 'react';
import { Plus, GripVertical, Edit2, Trash2, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionCard from './curriculum/SectionCard';
import { Section, Lecture } from './curriculum/types';

const CurriculumBuilder = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      title: 'Introduction',
      description: 'Getting started with the course',
      lectures: [],
      isExpanded: true
    }
  ]);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: 'New Section',
      description: '',
      lectures: [],
      isExpanded: true
    };
    setSections([...sections, newSection]);
  };

  const duplicateSection = (sectionId: string) => {
    const sectionToDuplicate = sections.find(s => s.id === sectionId);
    if (!sectionToDuplicate) return;

    const duplicatedSection: Section = {
      ...sectionToDuplicate,
      id: Date.now().toString(),
      title: `${sectionToDuplicate.title} (Copy)`,
      lectures: sectionToDuplicate.lectures.map(lecture => ({
        ...lecture,
        id: `${Date.now()}-${Math.random()}`,
        title: `${lecture.title} (Copy)`
      }))
    };

    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    const newSections = [...sections];
    newSections.splice(sectionIndex + 1, 0, duplicatedSection);
    setSections(newSections);
  };

  const reorderSections = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    setSections(newSections);
  };

  const updateSection = (sectionId: string, field: string, value: string | boolean) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, [field]: value } : section
    ));
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const addLecture = (sectionId: string, type: string = 'video') => {
    const newLecture: Lecture = {
      id: Date.now().toString(),
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type: type as 'video' | 'text' | 'quiz' | 'assignment' | 'resource',
      duration: type === 'video' ? '0:00' : undefined,
      content: '',
      isPreview: false
    };
    
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, lectures: [...section.lectures, newLecture] }
        : section
    ));
  };

  const updateLecture = (sectionId: string, lectureId: string, field: string, value: string | File | boolean) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            lectures: section.lectures.map(lecture =>
              lecture.id === lectureId ? { ...lecture, [field]: value } : lecture
            )
          }
        : section
    ));
  };

  const deleteLecture = (sectionId: string, lectureId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, lectures: section.lectures.filter(lecture => lecture.id !== lectureId) }
        : section
    ));
  };

  const duplicateLecture = (sectionId: string, lectureId: string) => {
    const section = sections.find(s => s.id === sectionId);
    const lecture = section?.lectures.find(l => l.id === lectureId);
    if (!lecture) return;

    const duplicatedLecture: Lecture = {
      ...lecture,
      id: Date.now().toString(),
      title: `${lecture.title} (Copy)`
    };

    setSections(sections.map(s => 
      s.id === sectionId 
        ? {
            ...s,
            lectures: [...s.lectures, duplicatedLecture]
          }
        : s
    ));
  };

  const reorderLectures = (sectionId: string, fromIndex: number, toIndex: number) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newLectures = [...section.lectures];
        const [movedLecture] = newLectures.splice(fromIndex, 1);
        newLectures.splice(toIndex, 0, movedLecture);
        return { ...section, lectures: newLectures };
      }
      return section;
    }));
  };

  const getTotalDuration = () => {
    let totalMinutes = 0;
    sections.forEach(section => {
      section.lectures.forEach(lecture => {
        if (lecture.duration && lecture.type === 'video') {
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
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Course Curriculum</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {sections.length} sections • {getTotalLectures()} lectures • {getTotalDuration()} total length
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={addSection} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <div key={section.id} className="border border-gray-200 rounded-lg">
              {/* Section Header */}
              <div className="p-4 bg-gray-50 border-b flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                <Collapsible 
                  open={section.isExpanded} 
                  onOpenChange={(isOpen) => updateSection(section.id, 'isExpanded', isOpen)}
                  className="flex-1"
                >
                  <div className="flex items-center gap-3">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {section.isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronUp className="w-4 h-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">
                          Section {sectionIndex + 1}:
                        </span>
                        <Input
                          value={section.title}
                          onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                          className="font-semibold border-none p-0 h-auto bg-transparent"
                          placeholder="Section title"
                        />
                      </div>
                      <Input
                        value={section.description}
                        onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                        className="text-sm text-gray-600 border-none p-0 h-auto bg-transparent"
                        placeholder="Section description (optional)"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {section.lectures.length} lectures
                      </span>
                      <Select onValueChange={(type) => addLecture(section.id, type)}>
                        <SelectTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Lecture
                          </Button>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video Lecture</SelectItem>
                          <SelectItem value="text">Text Lecture</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="resource">Resource/Download</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => duplicateSection(section.id)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteSection(section.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Lectures */}
                  <CollapsibleContent>
                    <div className="mt-4 space-y-2">
                      {section.lectures.map((lecture, lectureIndex) => (
                        <SectionCard
                          key={lecture.id}
                          section={section}
                          sectionIndex={sectionIndex}
                          onUpdateSection={updateSection}
                          onDeleteSection={deleteSection}
                          onAddLecture={addLecture}
                          onUpdateLecture={updateLecture}
                          onDeleteLecture={deleteLecture}
                        />
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurriculumBuilder;
