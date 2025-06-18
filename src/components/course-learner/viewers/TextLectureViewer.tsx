
import React, { useState } from 'react';
import { Book, Download, Share2, Search, Type, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface TextLectureViewerProps {
  title: string;
  content: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

const TextLectureViewer: React.FC<TextLectureViewerProps> = ({ 
  title, 
  content = "This is a sample text lecture with rich formatting. It includes **bold text**, *italic text*, and `code snippets`. You can also include links, lists, and other formatted content.",
  attachments 
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    console.log('Bookmark toggled');
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <Book className="w-6 h-6 text-purple-600" />
              <div>
                <CardTitle>{title}</CardTitle>
                <p className="text-gray-600">Text Lecture</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={handleBookmark}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Download className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Reading Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search in text..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Type className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Font Size:</span>
              <div className="w-24">
                <Slider
                  value={[fontSize]}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={(value) => setFontSize(value[0])}
                />
              </div>
              <span className="text-sm text-gray-500">{fontSize}px</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardContent className="p-8">
          <div 
            className="prose max-w-none"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{ 
              __html: highlightSearchTerm(content.replace(/\n/g, '<br>'))
            }}
          />
        </CardContent>
      </Card>

      {/* Attachments */}
      {attachments && attachments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Downloadable Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">{attachment.name}</p>
                      <p className="text-sm text-gray-600">{attachment.type}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reading Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Reading Progress</span>
            <span className="text-sm font-medium">Estimated 5 min read</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextLectureViewer;
