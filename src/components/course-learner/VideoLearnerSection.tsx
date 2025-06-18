import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, Download, Share2, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import VideoPlayer from '@/components/progress/VideoPlayer';
import PDFViewer from './viewers/PDFViewer';
import SlideViewer from './viewers/SlideViewer';
import QuizViewer from './viewers/QuizViewer';
import AudioPlayer from './viewers/AudioPlayer';
import TextLectureViewer from './viewers/TextLectureViewer';
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
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1');
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [videoQuality, setVideoQuality] = useState('auto');

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
    switch (lecture.type) {
      case 'video':
        return (
          <VideoPlayer
            courseId={courseId}
            lectureId={lectureId}
            videoUrl="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            title={lecture.title}
            duration={450}
            onComplete={() => console.log('Lecture completed')}
          />
        );
      case 'audio':
        return <AudioPlayer title={lecture.title} audioUrl="/sample-audio.mp3" />;
      case 'text':
        return <TextLectureViewer title={lecture.title} content={lecture.content} />;
      case 'pdf':
        return <PDFViewer title={lecture.title} />;
      case 'slide':
        return <SlideViewer title={lecture.title} />;
      case 'quiz':
        return <QuizViewer title={lecture.title} />;
      case 'interactive':
        return <InteractiveContentViewer title={lecture.title} contentType={lecture.interactiveType} />;
      default:
        return (
          <div className="text-center p-8">
            <p className="text-gray-600">Unsupported content type</p>
          </div>
        );
    }
  };

  const handleDownload = () => {
    console.log('Downloading content for offline access...');
    // Implementation for offline download
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lecture.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-white">
      <div className="p-6">
        {/* Content Settings Bar */}
        <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            
            {lecture.downloadable && (
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
            
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Quality:</span>
            <Select value={videoQuality} onValueChange={setVideoQuality}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="480p">480p</SelectItem>
                <SelectItem value="720p">720p</SelectItem>
                <SelectItem value="1080p">1080p</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="captions"
                  checked={captionsEnabled}
                  onCheckedChange={setCaptionsEnabled}
                />
                <Label htmlFor="captions">Captions</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="autoplay"
                  checked={autoPlay}
                  onCheckedChange={setAutoPlay}
                />
                <Label htmlFor="autoplay">Auto Play</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="speed">Speed:</Label>
                <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="mb-4">
          {renderContent()}
        </div>

        {/* Content Information */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Content Type:</span>
              <span className="ml-2 capitalize">{lecture.type}</span>
            </div>
            <div>
              <span className="font-medium">Duration:</span>
              <span className="ml-2">{lecture.duration}</span>
            </div>
            <div>
              <span className="font-medium">Language:</span>
              <span className="ml-2">{lecture.language || 'English'}</span>
            </div>
          </div>
          
          {lecture.resources && lecture.resources.length > 0 && (
            <div className="mt-3">
              <span className="font-medium text-sm">Resources:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {lecture.resources.map((resource: any, index: number) => (
                  <Button key={index} variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    {resource.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
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
              {lecture.type === 'video' ? 'Video Lecture' : 
               lecture.type === 'audio' ? 'Audio Lecture' :
               lecture.type === 'text' ? 'Text Lecture' :
               lecture.type === 'pdf' ? 'PDF Document' :
               lecture.type === 'slide' ? 'Slide Presentation' :
               lecture.type === 'quiz' ? 'Quiz' :
               lecture.type === 'interactive' ? 'Interactive Content' : 'Content'} • {lecture.duration}
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
