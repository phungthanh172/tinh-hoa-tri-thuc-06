
import React, { useState } from 'react';
import { ArrowLeft, Save, Share2, Undo, Redo, Palette, Plus, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import LifePathCanvas from '@/components/lifepath/LifePathCanvas';
import LifePathToolbar from '@/components/lifepath/LifePathToolbar';
import BlockLibrary from '@/components/lifepath/BlockLibrary';
import TemplateSelector from '@/components/lifepath/TemplateSelector';

const LifePath = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplates, setShowTemplates] = useState(true);
  const [canvasRef, setCanvasRef] = useState(null);

  const handleSave = () => {
    toast({
      title: "Life Path Saved",
      description: "Your life path design has been saved successfully!",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "Your life path is now shareable via the copied link!",
    });
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowTemplates(false);
    toast({
      title: "Template Applied",
      description: `${template.name} template has been loaded to your canvas.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-fluid p-4">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Life Path Designer
            </h1>
            <Button 
              variant="outline" 
              onClick={() => setShowTemplates(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 hover:from-blue-600 hover:to-indigo-600"
            >
              <Zap className="w-4 h-4 mr-2" />
              Templates
            </Button>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleShare} className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Template Selector Modal */}
        {showTemplates && (
          <TemplateSelector
            onSelect={handleTemplateSelect}
            onClose={() => setShowTemplates(false)}
          />
        )}

        {/* Main Interface */}
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
          {/* Block Library Sidebar */}
          <div className="col-span-2">
            <BlockLibrary />
          </div>

          {/* Canvas Area */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
              <LifePathToolbar canvasRef={canvasRef} />
              <LifePathCanvas onCanvasReady={setCanvasRef} />
            </div>
          </div>

          {/* Properties Panel */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4 h-full">
              <h3 className="font-semibold mb-4 text-gray-800">Properties</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <p>Select a block to edit its properties</p>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Quick Tips:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Drag blocks from the library</li>
                    <li>• Double-click to edit text</li>
                    <li>• Connect blocks by dragging</li>
                    <li>• Right-click for options</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LifePath;
