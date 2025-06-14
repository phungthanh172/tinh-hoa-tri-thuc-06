
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Edit2, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CurriculumStepProps {
  courseData: any;
  setCourseData: (data: any) => void;
  isEditing: boolean;
}

const CurriculumStep = ({ courseData, setCourseData }: CurriculumStepProps) => {
  const [sections, setSections] = useState([
    {
      id: '1',
      title: 'Getting Started',
      description: 'Introduction to the course',
      isOpen: true,
      lectures: [
        {
          id: '1-1',
          title: 'Welcome to the Course',
          type: 'video',
          duration: '5:30',
          description: ''
        }
      ]
    }
  ]);

  const addSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: 'New Section',
      description: '',
      isOpen: true,
      lectures: []
    };
    setSections([...sections, newSection]);
  };

  const addLecture = (sectionId: string) => {
    const newLecture = {
      id: `${sectionId}-${Date.now()}`,
      title: 'New Lecture',
      type: 'video',
      duration: '0:00',
      description: ''
    };
    
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, lectures: [...section.lectures, newLecture] }
        : section
    ));
  };

  const updateSection = (sectionId: string, field: string, value: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, [field]: value } : section
    ));
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
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
            <Card key={section.id} className="border-l-4 border-purple-500">
              <CardContent className="p-4">
                <Collapsible open={section.isOpen} onOpenChange={() => toggleSection(section.id)}>
                  <div className="space-y-4">
                    {/* Section Header */}
                    <div className="flex items-center space-x-3">
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {section.isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </Button>
                      </CollapsibleTrigger>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={section.title}
                          onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                          placeholder="Section title"
                          className="font-semibold"
                        />
                        <Textarea
                          value={section.description}
                          onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                          placeholder="Section description (optional)"
                          className="min-h-[60px]"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addLecture(section.id)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Lecture
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
                      <div className="ml-12 space-y-3">
                        {section.lectures.map((lecture, lectureIndex) => (
                          <div key={lecture.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                            <div className="flex-1 grid grid-cols-3 gap-3">
                              <Input
                                value={lecture.title}
                                onChange={(e) => {
                                  const updatedSections = sections.map(s => 
                                    s.id === section.id 
                                      ? {
                                          ...s,
                                          lectures: s.lectures.map(l => 
                                            l.id === lecture.id ? { ...l, title: e.target.value } : l
                                          )
                                        }
                                      : s
                                  );
                                  setSections(updatedSections);
                                }}
                                placeholder="Lecture title"
                              />
                              <Select
                                value={lecture.type}
                                onValueChange={(value) => {
                                  const updatedSections = sections.map(s => 
                                    s.id === section.id 
                                      ? {
                                          ...s,
                                          lectures: s.lectures.map(l => 
                                            l.id === lecture.id ? { ...l, type: value } : l
                                          )
                                        }
                                      : s
                                  );
                                  setSections(updatedSections);
                                }}
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
                              <Input
                                value={lecture.duration}
                                onChange={(e) => {
                                  const updatedSections = sections.map(s => 
                                    s.id === section.id 
                                      ? {
                                          ...s,
                                          lectures: s.lectures.map(l => 
                                            l.id === lecture.id ? { ...l, duration: e.target.value } : l
                                          )
                                        }
                                      : s
                                  );
                                  setSections(updatedSections);
                                }}
                                placeholder="Duration (e.g., 10:30)"
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updatedSections = sections.map(s => 
                                  s.id === section.id 
                                    ? {
                                        ...s,
                                        lectures: s.lectures.filter(l => l.id !== lecture.id)
                                      }
                                    : s
                                );
                                setSections(updatedSections);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurriculumStep;
