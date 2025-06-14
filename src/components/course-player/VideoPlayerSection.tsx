
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/progress/VideoPlayer';

interface VideoPlayerSectionProps {
  courseId: string;
  lectureId: string;
  lecture?: {
    id: string;
    title: string;
    duration: string;
  };
  onNext: () => void;
  onPrevious: () => void;
}

const VideoPlayerSection: React.FC<VideoPlayerSectionProps> = ({
  courseId,
  lectureId,
  lecture,
  onNext,
  onPrevious
}) => {
  if (!lecture) return null;

  // Convert duration string to seconds for the video player
  const [minutes, seconds] = lecture.duration.split(':').map(Number);
  const durationInSeconds = minutes * 60 + seconds;

  return (
    <div className="p-6">
      <div className="mb-4">
        <VideoPlayer
          courseId={courseId}
          lectureId={lectureId}
          videoUrl="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
          title={lecture.title}
          duration={durationInSeconds}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous lecture
        </Button>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">{lecture.title}</h2>
          <p className="text-gray-400 text-sm">Duration: {lecture.duration}</p>
        </div>

        <Button
          variant="outline"
          onClick={onNext}
          className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        >
          Next lecture
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default VideoPlayerSection;
