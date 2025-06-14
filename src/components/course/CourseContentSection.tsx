
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import VideoPreviewDialog from './VideoPreviewDialog';

interface CourseContentSectionProps {
  courseContent: Array<{
    title: string;
    lectures: number;
    duration: string;
    lessons: Array<{
      title: string;
      duration: string;
      preview?: boolean;
    }>;
  }>;
}

const CourseContentSection: React.FC<CourseContentSectionProps> = ({ courseContent }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; url?: string } | null>(null);

  const handlePreviewClick = (lessonTitle: string) => {
    setSelectedVideo({ title: lessonTitle });
    setIsVideoOpen(true);
  };

  const CourseContentItem = ({ section, index }) => (
    <AccordionItem value={`section-${index}`} className="border-b border-gray-200">
      <AccordionTrigger className="text-left hover:no-underline py-4 px-6">
        <div className="flex justify-between items-center w-full pr-4">
          <div>
            <h3 className="font-semibold text-gray-900">{section.title}</h3>
            <p className="text-sm text-gray-600">{section.lectures} lectures • {section.duration}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2 pb-4 px-6">
          {section.lessons.map((lesson, lessonIndex) => (
            <div key={lessonIndex} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-md transition-colors">
              <div className="flex items-center space-x-3">
                {lesson.preview ? (
                  <button
                    onClick={() => handlePreviewClick(lesson.title)}
                    className="w-4 h-4 text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                ) : (
                  <Play className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm text-gray-700">{lesson.title}</span>
                {lesson.preview && (
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-600">Preview</Badge>
                )}
              </div>
              <span className="text-sm text-gray-500">{lesson.duration}</span>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Course content</h2>
      <p className="text-gray-600 mb-6">
        {courseContent.length} sections • {courseContent.reduce((acc, section) => acc + section.lectures, 0)} lectures • 69h 37m total length
      </p>
      
      <Card className="border border-gray-200 shadow-md bg-white">
        <Accordion type="multiple" className="w-full">
          {courseContent.map((section, index) => (
            <CourseContentItem key={index} section={section} index={index} />
          ))}
        </Accordion>
      </Card>

      {selectedVideo && (
        <VideoPreviewDialog
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoTitle={selectedVideo.title}
          videoUrl={selectedVideo.url}
        />
      )}
    </div>
  );
};

export default CourseContentSection;
