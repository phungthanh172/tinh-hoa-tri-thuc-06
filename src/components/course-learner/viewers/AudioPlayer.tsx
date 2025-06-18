
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AudioPlayerProps {
  title: string;
  audioUrl: string;
  transcript?: string;
  chapters?: Array<{
    title: string;
    startTime: number;
    duration: number;
  }>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  title, 
  audioUrl, 
  transcript,
  chapters = []
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 15);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 15);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const sampleTranscript = `
Welcome to this audio lecture on JavaScript fundamentals. In today's session, we'll be covering the essential concepts that form the foundation of JavaScript programming.

First, let's talk about variables. Variables are containers that store data values. In JavaScript, we have three ways to declare variables: var, let, and const.

The 'var' keyword has been around since the beginning of JavaScript, but it has some quirks that can lead to confusing behavior. That's why modern JavaScript recommends using 'let' and 'const' instead.

'Let' is used when you need to reassign the variable later, while 'const' is used for values that won't change. This makes your code more predictable and easier to understand.

Next, we'll explore data types. JavaScript has several built-in data types including numbers, strings, booleans, objects, and more. Understanding these types is crucial for effective programming.
  `;

  return (
    <Card className="w-full h-full min-h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center space-x-4 mt-2">
            <Badge variant="outline">Audio Lecture</Badge>
            <span className="text-sm text-gray-500">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Bookmark className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Audio Element */}
        <audio ref={audioRef} src={audioUrl} preload="metadata" />

        {/* Main Player Controls */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button variant="outline" size="sm" onClick={skipBackward}>
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              onClick={togglePlay} 
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
            <Button variant="outline" size="sm" onClick={skipForward}>
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleMute}>
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

            <select
              value={playbackRate}
              onChange={(e) => changePlaybackRate(Number(e.target.value))}
              className="bg-white border border-gray-300 rounded px-3 py-1 text-sm"
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

        {/* Tabs for Transcript and Chapters */}
        <Tabs defaultValue="transcript" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transcript" className="mt-4">
            <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
              <p className="text-sm leading-relaxed text-gray-700">
                {transcript || sampleTranscript}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="chapters" className="mt-4">
            <div className="space-y-2">
              {chapters.length > 0 ? (
                chapters.map((chapter, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = chapter.startTime;
                      }
                    }}
                  >
                    <div>
                      <p className="font-medium text-sm">{chapter.title}</p>
                      <p className="text-xs text-gray-500">
                        {formatTime(chapter.startTime)} - {formatTime(chapter.startTime + chapter.duration)}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No chapters available for this audio lecture.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
