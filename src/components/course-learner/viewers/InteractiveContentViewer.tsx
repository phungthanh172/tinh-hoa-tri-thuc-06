
import React, { useState } from 'react';
import { Play, RefreshCw, Code, Lightbulb, Zap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface InteractiveContentViewerProps {
  title: string;
  interactiveType: 'simulation' | 'code-editor' | 'flashcards' | 'jupyter';
  content?: any;
}

const InteractiveContentViewer: React.FC<InteractiveContentViewerProps> = ({ 
  title, 
  interactiveType,
  content 
}) => {
  const [code, setCode] = useState('console.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = [
    { question: "What does 'var' do in JavaScript?", answer: "Declares a variable with function scope" },
    { question: "What is the difference between '==' and '==='?", answer: "'==' compares values, '===' compares values and types" },
    { question: "What is a closure in JavaScript?", answer: "A function that has access to variables in its outer scope even after the outer function returns" }
  ];

  const runCode = () => {
    try {
      // Simulate code execution (in a real app, this would be sandboxed)
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const renderSimulation = () => (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
          <Zap className="w-12 h-12 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Interactive Simulation</h3>
          <p className="text-gray-600 mt-2">Experience hands-on learning with our interactive simulations</p>
        </div>
        <div className="flex space-x-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Play className="w-4 h-4 mr-2" />
            Start Simulation
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCodeEditor = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Code Editor
          </h4>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm min-h-[300px] bg-gray-900 text-green-400 border-gray-700"
            placeholder="Write your JavaScript code here..."
          />
          <Button onClick={runCode} className="mt-2 bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Run Code
          </Button>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Output</h4>
          <div className="bg-black text-white p-4 rounded-lg min-h-[300px] font-mono text-sm">
            <pre>{output || 'Run your code to see the output...'}</pre>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFlashcards = () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-full max-w-md">
        <div className="bg-white border-2 border-purple-200 rounded-lg p-8 shadow-lg min-h-[250px] flex flex-col justify-center">
          <div className="text-center mb-6">
            <Badge variant="outline" className="mb-4">
              Card {currentFlashcard + 1} of {flashcards.length}
            </Badge>
          </div>
          
          <div className="text-center space-y-6">
            {!showAnswer ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-lg font-medium text-gray-800">
                  {flashcards[currentFlashcard].question}
                </p>
                <Button 
                  onClick={() => setShowAnswer(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Show Answer
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm text-gray-600 mb-2">Answer:</p>
                <p className="text-lg font-medium text-gray-800">
                  {flashcards[currentFlashcard].answer}
                </p>
                <div className="flex space-x-2 justify-center">
                  <Button 
                    onClick={() => {
                      setShowAnswer(false);
                      setCurrentFlashcard((prev) => (prev + 1) % flashcards.length);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Got it!
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setShowAnswer(false);
                      setCurrentFlashcard((prev) => (prev + 1) % flashcards.length);
                    }}
                  >
                    Need review
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            onClick={() => {
              setCurrentFlashcard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
              setShowAnswer(false);
            }}
          >
            Previous
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              setCurrentFlashcard((prev) => (prev + 1) % flashcards.length);
              setShowAnswer(false);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );

  const renderJupyter = () => (
    <div className="bg-white border rounded-lg min-h-[400px]">
      <div className="border-b p-4 bg-gray-50">
        <h4 className="font-semibold">Jupyter Notebook Environment</h4>
        <p className="text-sm text-gray-600">Interactive Python environment for data science</p>
      </div>
      <div className="p-6 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto flex items-center justify-center">
            <Code className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Jupyter Notebook</h3>
            <p className="text-gray-600">Advanced interactive coding environment</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700">
            Launch Notebook
          </Button>
        </div>
      </div>
    </div>
  );

  const getTypeInfo = () => {
    switch (interactiveType) {
      case 'simulation':
        return { label: 'Interactive Simulation', color: 'bg-blue-100 text-blue-800' };
      case 'code-editor':
        return { label: 'Code Editor', color: 'bg-green-100 text-green-800' };
      case 'flashcards':
        return { label: 'Flashcards', color: 'bg-purple-100 text-purple-800' };
      case 'jupyter':
        return { label: 'Jupyter Notebook', color: 'bg-orange-100 text-orange-800' };
      default:
        return { label: 'Interactive Content', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const typeInfo = getTypeInfo();

  return (
    <Card className="w-full h-full min-h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <Badge className={`mt-2 ${typeInfo.color}`}>
              {typeInfo.label}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {interactiveType === 'simulation' && renderSimulation()}
        {interactiveType === 'code-editor' && renderCodeEditor()}
        {interactiveType === 'flashcards' && renderFlashcards()}
        {interactiveType === 'jupyter' && renderJupyter()}
      </CardContent>
    </Card>
  );
};

export default InteractiveContentViewer;
