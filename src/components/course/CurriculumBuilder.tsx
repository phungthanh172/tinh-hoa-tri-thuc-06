import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Video, FileText, HelpCircle, Upload, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
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
            <Card key={section.id} className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Section {sectionIndex + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSection(section.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Input
                    value={section.title}
                    onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                    placeholder="Section title"
                    className="font-semibold"
                  />
                  <Input
                    value={section.description}
                    onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                    placeholder="Section description"
                    className="text-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.lectures.map((lecture, lectureIndex) => (
                    <Card key={lecture.id} className="bg-gray-50">
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
                            onClick={() => deleteLecture(section.id, lecture.id)}
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
                                onChange={(e) => updateLecture(section.id, lecture.id, 'title', e.target.value)}
                                placeholder="Lecture title"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-xs">Type</Label>
                                <Select
                                  value={lecture.type}
                                  onValueChange={(value) => updateLecture(section.id, lecture.id, 'type', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="quiz">Quiz</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label className="text-xs">Duration</Label>
                                <Input
                                  value={lecture.duration || ''}
                                  onChange={(e) => updateLecture(section.id, lecture.id, 'duration', e.target.value)}
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
                                    onChange={(e) => e.target.files?.[0] && updateLecture(section.id, lecture.id, 'videoFile', e.target.files[0])}
                                    className="hidden"
                                    id={`video-${lecture.id}`}
                                  />
                                  <Label htmlFor={`video-${lecture.id}`}>
                                    <Button variant="outline" size="sm" asChild>
                                      <span className="text-xs">Upload Video</span>
                                    </Button>
                                  </Label>
                                  {lecture.videoFile && (
                                    <p className="text-xs text-green-600 mt-1">
                                      {lecture.videoFile.name}
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
                                  onChange={(e) => updateLecture(section.id, lecture.id, 'content', e.target.value)}
                                  placeholder="Enter lecture content..."
                                  className="min-h-[80px] text-sm"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addLecture(section.id)}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Lecture
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurriculumBuilder;
