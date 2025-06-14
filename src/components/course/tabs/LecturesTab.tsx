
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VideoPlayer from '@/components/progress/VideoPlayer';

const LecturesTab: React.FC = () => {
  const [selectedLecture, setSelectedLecture] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Course Lectures</h2>
      {selectedLecture ? (
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedLecture(null)}
          >
            ← Back to Lecture List
          </Button>
          <VideoPlayer
            courseId="1"
            lectureId={selectedLecture}
            videoUrl="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            title={`Lecture ${selectedLecture}`}
            duration={450}
            onComplete={() => console.log('Lecture completed')}
          />
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              {['1', '2', '3'].map((lectureId) => (
                <div 
                  key={lectureId}
                  className="flex items-center justify-between p-4 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedLecture(lectureId)}
                >
                  <div className="flex items-center space-x-3">
                    <Play className="w-5 h-5 text-purple-600" />
                    <div>
                      <h3 className="font-medium">Lecture {lectureId}: JavaScript Fundamentals</h3>
                      <p className="text-sm text-gray-600">7:30 • Introduction to JavaScript</p>
                    </div>
                  </div>
                  <Badge variant="outline">Video</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LecturesTab;
