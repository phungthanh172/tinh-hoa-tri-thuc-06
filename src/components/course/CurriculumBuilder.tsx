
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionCard from './curriculum/SectionCard';
import { Section, Lecture } from './curriculum/types';

const CurriculumBuilder = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: '1',
      title: 'Introduction',
      description: 'Getting started with the course',
      lectures: []
    }
  ]);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: 'New Section',
      description: '',
      lectures: []
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (sectionId: string, field: string, value: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, [field]: value } : section
    ));
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const addLecture = (sectionId: string) => {
    const newLecture: Lecture = {
      id: Date.now().toString(),
      title: 'New Lecture',
      type: 'video',
      duration: '0:00'
    };
    
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, lectures: [...section.lectures, newLecture] }
        : section
    ));
  };

  const updateLecture = (sectionId: string, lectureId: string, field: string, value: string | File) => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Course Curriculum</CardTitle>
          <Button onClick={addSection} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <SectionCard
              key={section.id}
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
      </CardContent>
    </Card>
  );
};

export default CurriculumBuilder;
