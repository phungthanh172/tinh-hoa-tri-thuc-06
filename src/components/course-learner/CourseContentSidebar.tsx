
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Check, FileText, Presentation, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';

interface Lecture {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  isCurrentlyPlaying: boolean;
  type?: string;
}

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

interface CourseContentSidebarProps {
  course: {
    sections: Section[];
  };
  currentLectureId: string;
  onLectureSelect: (lectureId: string) => void;
}

const CourseContentSidebar: React.FC<CourseContentSidebarProps> = ({
  course,
  currentLectureId,
  onLectureSelect
}) => {
  const [openSections, setOpenSections] = useState<string[]>(['1']); // First section open by default

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleLectureComplete = (lectureId: string) => {
    // This would typically update the course state
    console.log('Toggle complete for lecture:', lectureId);
  };

  const getContentIcon = (type: string = 'video') => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'slide':
        return <Presentation className="w-4 h-4 text-blue-500" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4 text-orange-500" />;
      case 'video':
      default:
        return <Play className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="w-1/4 bg-white border-l border-gray-200 h-screen overflow-y-auto">
      <Card className="bg-white border-gray-200 rounded-none">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-gray-800 text-lg">Course content</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {course.sections.map((section) => (
              <Collapsible
                key={section.id}
                open={openSections.includes(section.id)}
                onOpenChange={() => toggleSection(section.id)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-800">{section.title}</span>
                  {openSections.includes(section.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  )}
                </CollapsibleTrigger>
                
                <CollapsibleContent className="bg-gray-50">
                  {section.lectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      className={`flex items-center space-x-3 p-3 cursor-pointer transition-colors ${
                        lecture.id === currentLectureId 
                          ? 'bg-purple-100 border-l-4 border-purple-500' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => onLectureSelect(lecture.id)}
                    >
                      <Checkbox
                        checked={lecture.completed}
                        onCheckedChange={() => toggleLectureComplete(lecture.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="border-gray-400"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          {lecture.id === currentLectureId ? (
                            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
                          ) : lecture.completed ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            getContentIcon(lecture.type)
                          )}
                          <span className={`text-sm truncate ${
                            lecture.id === currentLectureId ? 'text-gray-900 font-medium' : 'text-gray-700'
                          }`}>
                            {lecture.title}
                          </span>
                        </div>
                      </div>
                      
                      <span className="text-xs text-gray-500 ml-auto">
                        {lecture.duration}
                      </span>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseContentSidebar;
