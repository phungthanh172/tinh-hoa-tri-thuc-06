import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DRMSecurePlayer from '@/components/security/DRMSecurePlayer';
import PDFViewer from './viewers/PDFViewer';
import SlideViewer from './viewers/SlideViewer';
import QuizViewer from './viewers/QuizViewer';
import TextLectureViewer from './viewers/TextLectureViewer';
import AudioPlayer from './viewers/AudioPlayer';
import InteractiveContentViewer from './viewers/InteractiveContentViewer';

interface VideoLearnerSectionProps {
  courseId: string;
  lectureId: string;
  lecture?: any;
  onNext: () => void;
  onPrevious: () => void;
}

const VideoLearnerSection: React.FC<VideoLearnerSectionProps> = ({
  courseId,
  lectureId,
  lecture,
  onNext,
  onPrevious
}) => {
  if (!lecture) {
    return (
      <div className="bg-white p-8">
        <div className="text-center">
          <p className="text-gray-600">Lecture not found</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    // Mock user data - in real implementation, get from auth context
    const mockUserId = 'user_123';
    const mockUserEmail = 'student@example.com';

    switch (lecture.type) {
      case 'pdf':
        return (
          <DRMSecurePlayer
            contentId={lectureId}
            courseId={courseId}
            userId={mockUserId}
            userEmail={mockUserEmail}
            contentUrl={lecture.url || "/placeholder.svg"}
            contentType="pdf"
            title={lecture.title}
            drmEnabled={true}
            watermarkEnabled={true}
          />
        );
      case 'slide':
        return (
          <SlideViewer 
            title={lecture.title} 
            totalSlides={lecture.totalSlides || 12}
          />
        );
      case 'quiz':
        return (
          <QuizViewer 
            title={lecture.title}
          />
        );
      case 'text':
        return (
          <TextLectureViewer
            title={lecture.title}
            content={lecture.content || ""}
            resources={lecture.resources || []}
          />
        );
      case 'audio':
        return (
          <DRMSecurePlayer
            contentId={lectureId}
            courseId={courseId}
            userId={mockUserId}
            userEmail={mockUserEmail}
            contentUrl={lecture.url || "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"}
            contentType="audio"
            title={lecture.title}
            drmEnabled={true}
            watermarkEnabled={true}
          />
        );
      case 'interactive':
        return (
          <InteractiveContentViewer
            title={lecture.title}
            interactiveType={lecture.interactiveType || 'simulation'}
            content={lecture.content}
          />
        );
      case 'video':
      default:
        return (
          <DRMSecurePlayer
            contentId={lectureId}
            courseId={courseId}
            userId={mockUserId}
            userEmail={mockUserEmail}
            contentUrl={lecture.url || "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"}
            contentType="video"
            title={lecture.title}
            drmEnabled={true}
            watermarkEnabled={true}
          />
        );
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Video Lecture';
      case 'pdf': return 'PDF Document';
      case 'slide': return 'Slide Presentation';
      case 'quiz': return 'Interactive Quiz';
      case 'text': return 'Text Lecture';
      case 'audio': return 'Audio Lecture';
      case 'interactive': return 'Interactive Content';
      default: return 'Content';
    }
  };

  return (
    <div className="bg-white">
      <div className="p-6">
        {/* Content Area */}
        <div className="mb-4">
          {renderContent()}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800">{lecture.title}</h2>
            <p className="text-sm text-gray-600">
              {getContentTypeLabel(lecture.type)} • {lecture.duration}
            </p>
          </div>

          <Button 
            onClick={onNext}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoLearnerSection;
