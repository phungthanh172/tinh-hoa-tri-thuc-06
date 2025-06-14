
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Settings, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/contexts/ProgressContext';

interface VideoPlayerProps {
  courseId: string;
  lectureId: string;
  videoUrl: string;
  title: string;
  duration: number;
  onComplete?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  courseId,
  lectureId,
  videoUrl,
  title,
  duration,
  onComplete
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  
  const { updateLectureProgress, getCourseProgress } = useProgress();
  const courseProgress = getCourseProgress(courseId);
  const lectureProgress = courseProgress?.lectures.find(l => l.lectureId === lectureId);

  useEffect(() => {
    if (videoRef.current && lectureProgress) {
      videoRef.current.currentTime = lectureProgress.lastWatchPosition;
      setCurrentTime(lectureProgress.lastWatchPosition);
    }
  }, [lectureProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && isPlaying) {
        const current = videoRef.current.currentTime;
        setCurrentTime(current);
        
        updateLectureProgress(courseId, lectureId, {
          watchTime: current,
          lastWatchPosition: current,
          completed: current >= duration * 0.95 // 95% completion threshold
        });

        if (current >= duration * 0.95 && onComplete) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, courseId, lectureId, duration, updateLectureProgress, onComplete]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    const seekTime = value[0];
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="relative">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video"
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.volume = volume;
            }
          }}
        />
        
        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
          <div 
            className="h-full bg-purple-600 transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-900 text-white p-4 space-y-3">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="text-white hover:bg-gray-800"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <div className="flex-1 space-y-1">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-white hover:bg-gray-800"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            <div className="w-20">
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-800"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <select
              value={playbackRate}
              onChange={(e) => changePlaybackRate(Number(e.target.value))}
              className="bg-gray-800 text-white text-xs rounded px-2 py-1"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>

        <div className="text-sm">
          <div className="flex justify-between items-center">
            <span className="font-medium">{title}</span>
            {lectureProgress?.completed && (
              <span className="text-green-400 text-xs">✓ Completed</span>
            )}
          </div>
          <Progress value={progressPercentage} className="mt-2 h-2" />
          <div className="text-xs text-gray-400 mt-1">
            {Math.round(progressPercentage)}% complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
