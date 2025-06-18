
import React, { useState } from 'react';
import { Download, Bookmark, Share2, FileText, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TextLectureViewerProps {
  title: string;
  content: string;
  resources?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

const TextLectureViewer: React.FC<TextLectureViewerProps> = ({ 
  title, 
  content,
  resources = []
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setReadingProgress(Math.min(progress, 100));
  };

  const sampleContent = `
    <h2>Introduction to JavaScript Variables</h2>
    <p>In JavaScript, variables are containers that store data values. Understanding how to properly declare and use variables is fundamental to programming in JavaScript.</p>
    
    <h3>Variable Declaration</h3>
    <p>There are three ways to declare variables in JavaScript:</p>
    <ul>
      <li><strong>var</strong> - Function-scoped or globally-scoped</li>
      <li><strong>let</strong> - Block-scoped (ES6+)</li>
      <li><strong>const</strong> - Block-scoped, cannot be reassigned (ES6+)</li>
    </ul>

    <h3>Code Example</h3>
    <pre><code>
// Using var
var name = "John";

// Using let
let age = 25;

// Using const
const PI = 3.14159;
    </code></pre>

    <h3>Best Practices</h3>
    <p>Here are some best practices when working with variables:</p>
    <ol>
      <li>Use <code>const</code> by default</li>
      <li>Use <code>let</code> when you need to reassign the variable</li>
      <li>Avoid <code>var</code> in modern JavaScript</li>
      <li>Use descriptive variable names</li>
    </ol>

    <blockquote>
      <p><em>"Good variable names are the foundation of readable code."</em></p>
    </blockquote>
  `;

  return (
    <Card className="w-full h-full min-h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center space-x-4 mt-2">
            <Badge variant="outline">Text Lecture</Badge>
            <span className="text-sm text-gray-500">~10 min read</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Bookmark className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-1" />
            Print
          </Button>
        </div>
      </CardHeader>

      {/* Reading Progress Bar */}
      <div className="w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-purple-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <CardContent className="p-0">
        {/* Reading Controls */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Font Size:</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
            >
              A-
            </Button>
            <span className="text-sm">{fontSize}px</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
            >
              A+
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
            {darkMode ? 'Light' : 'Dark'} Mode
          </Button>
        </div>

        {/* Content Area */}
        <div 
          className={`p-6 max-h-[500px] overflow-y-auto ${
            darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          }`}
          style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
          onScroll={handleScroll}
        >
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: content || sampleContent 
            }}
          />
        </div>

        {/* Resources Section */}
        {resources.length > 0 && (
          <>
            <Separator />
            <div className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Downloadable Resources</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{resource.name}</p>
                      <p className="text-xs text-gray-500">{resource.type.toUpperCase()}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TextLectureViewer;
