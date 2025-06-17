
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LifePathCanvas from '@/components/lifepath/LifePathCanvas';
import LifePathToolbar from '@/components/lifepath/LifePathToolbar';
import ElementPropertiesPanel from '@/components/lifepath/ElementPropertiesPanel';
import TemplateSelector from '@/components/lifepath/TemplateSelector';

const LifePath = () => {
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [connectionMode, setConnectionMode] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleAddElement = (type: string) => {
    console.log('Adding element:', type);
    // This will be handled by the canvas component
  };

  const handleElementSelect = (element: any) => {
    setSelectedElement(element);
  };

  const handleToggleConnectionMode = () => {
    setConnectionMode(!connectionMode);
  };

  const handleSave = () => {
    console.log('Saving life path...');
    // Implement save functionality
  };

  const handleShare = () => {
    console.log('Sharing life path...');
    // Implement share functionality
  };

  const handleElementUpdate = (elementId: string, updatedElement: any) => {
    console.log('Updating element:', elementId, updatedElement);
    // Implement element update functionality
  };

  const handleTemplateSelect = (template: any) => {
    console.log('Selected template:', template);
    setShowTemplates(false);
    // Implement template loading functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Life Path Designer</h1>
            <p className="text-gray-600 mt-2">Design your personal journey by mapping out your life domains and goals</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTemplates(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Templates
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <LifePathToolbar
              onAddElement={handleAddElement}
              connectionMode={connectionMode}
              onToggleConnectionMode={handleToggleConnectionMode}
              onSave={handleSave}
              onShare={handleShare}
            />
            
            <LifePathCanvas
              selectedElement={selectedElement}
              onElementSelect={handleElementSelect}
              connectionMode={connectionMode}
              onAddElement={handleAddElement}
            />
          </div>

          <div className="lg:col-span-1">
            <ElementPropertiesPanel
              selectedElement={selectedElement}
              onElementUpdate={handleElementUpdate}
            />
          </div>
        </div>

        {showTemplates && (
          <TemplateSelector
            onTemplateSelect={handleTemplateSelect}
            onClose={() => setShowTemplates(false)}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LifePath;
