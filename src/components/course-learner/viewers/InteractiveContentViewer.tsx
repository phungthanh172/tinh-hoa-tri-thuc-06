
import React, { useState } from 'react';
import { Play, Code, Brain, Zap, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface InteractiveContentViewerProps {
  title: string;
  contentType: 'simulation' | 'code-editor' | 'jupyter' | 'flashcards' | 'virtual-lab';
}

const InteractiveContentViewer: React.FC<InteractiveContentViewerProps> = ({ 
  title, 
  contentType 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const getContentIcon = () => {
    switch (contentType) {
      case 'simulation': return <Zap className="w-6 h-6" />;
      case 'code-editor': return <Code className="w-6 h-6" />;
      case 'jupyter': return <Play className="w-6 h-6" />;
      case 'flashcards': return <Brain className="w-6 h-6" />;
      case 'virtual-lab': return <Zap className="w-6 h-6" />;
      default: return <Play className="w-6 h-6" />;
    }
  };

  const getContentTypeLabel = () => {
    switch (contentType) {
      case 'simulation': return 'Interactive Simulation';
      case 'code-editor': return 'Code Editor';
      case 'jupyter': return 'Jupyter Notebook';
      case 'flashcards': return 'Flashcards';
      case 'virtual-lab': return 'Virtual Laboratory';
      default: return 'Interactive Content';
    }
  };

  const renderFlashcards = () => {
    const flashcards = [
      { front: 'What is a variable in JavaScript?', back: 'A container that stores data values' },
      { front: 'What does DOM stand for?', back: 'Document Object Model' },
      { front: 'What is a function?', back: 'A reusable block of code that performs a specific task' }
    ];

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Card {currentCard + 1} of {flashcards.length}
          </p>
          <div className="bg-white border-2 border-purple-200 rounded-lg p-8 min-h-48 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-medium mb-4">{flashcards[currentCard].front}</p>
              <Button onClick={() => setIsLoading(!isLoading)}>
                {isLoading ? 'Hide Answer' : 'Show Answer'}
              </Button>
              {isLoading && (
                <div className="mt-4 p-4 bg-purple-50 rounded">
                  <p className="text-purple-800">{flashcards[currentCard].back}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
            disabled={currentCard === 0}
          >
            Previous
          </Button>
          <Button 
            variant="outline"
            onClick={() => setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1))}
            disabled={currentCard === flashcards.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  const renderCodeEditor = () => {
    return (
      <div className="space-y-4">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList>
            <TabsTrigger value="editor">Code Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="console">Console</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="mt-4">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="mb-2 text-gray-500">// JavaScript Code Editor</div>
              <div>function helloWorld() {`{`}</div>
              <div className="ml-4">console.log("Hello, World!");</div>
              <div>{`}`}</div>
              <div className="mt-2">helloWorld();</div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </Button>
              <Button variant="outline">Reset</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <div className="bg-white border rounded-lg p-4 min-h-32">
              <p className="text-gray-600">Output will appear here...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="console" className="mt-4">
            <div className="bg-black text-white p-4 rounded-lg font-mono text-sm min-h-32">
              <div className="text-green-400">$ Hello, World!</div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderSimulation = () => {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border rounded-lg p-8 min-h-64 flex items-center justify-center">
          <div className="text-center">
            <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Simulation</h3>
            <p className="text-gray-600 mb-4">Click start to begin the interactive experience</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Start Simulation
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (contentType) {
      case 'flashcards': return renderFlashcards();
      case 'code-editor': return renderCodeEditor();
      case 'jupyter': return renderCodeEditor();
      case 'simulation': return renderSimulation();
      case 'virtual-lab': return renderSimulation();
      default: return renderSimulation();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                {getContentIcon()}
              </div>
              <div>
                <CardTitle>{title}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{getContentTypeLabel()}</Badge>
                  <Badge variant="outline">Interactive</Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Save Progress
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Interactive Content */}
      <Card>
        <CardContent className="p-6">
          {renderContent()}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardContent className="p-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Instructions</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Interact with the content above to learn</li>
              <li>• Your progress is automatically saved</li>
              <li>• Use keyboard shortcuts for faster navigation</li>
              <li>• Click the help icon if you need assistance</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveContentViewer;
