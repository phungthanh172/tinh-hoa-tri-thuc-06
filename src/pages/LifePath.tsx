
import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LifePathFlow from '@/components/lifepath/LifePathFlow';
import BlockLibrary from '@/components/lifepath/BlockLibrary';
import PropertiesPanel from '@/components/lifepath/PropertiesPanel';
import LifePathToolbar from '@/components/lifepath/LifePathToolbar';
import TemplateSelector from '@/components/lifepath/TemplateSelector';
import { toast } from 'sonner';

const LifePath = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBlockLibrary, setShowBlockLibrary] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleSave = useCallback(() => {
    const lifePathData = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('lifepath-data', JSON.stringify(lifePathData));
    toast.success('Life path saved successfully!');
  }, [nodes, edges]);

  const handleLoad = useCallback(() => {
    const savedData = localStorage.getItem('lifepath-data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setNodes(parsed.nodes || []);
      setEdges(parsed.edges || []);
      toast.success('Life path loaded successfully!');
    }
  }, []);

  const handleShare = useCallback(() => {
    const shareData = { nodes, edges };
    const encoded = btoa(JSON.stringify(shareData));
    const shareUrl = `${window.location.origin}/lifepath?data=${encoded}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard!');
  }, [nodes, edges]);

  const handleTemplateSelect = useCallback((template) => {
    setNodes(template.nodes || []);
    setEdges(template.edges || []);
    setShowTemplates(false);
    toast.success(`Applied ${template.name} template!`);
  }, []);

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    toast.success('Canvas cleared!');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Life Path Designer
            </h1>
            <p className="text-gray-600 mt-2">Design your personal journey by mapping out your life domains and goals</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTemplates(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
            >
              📋 Templates
            </button>
            <button
              onClick={handleLoad}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              📂 Load
            </button>
          </div>
        </div>

        <LifePathToolbar
          onSave={handleSave}
          onShare={handleShare}
          onClear={handleClear}
          onToggleLibrary={() => setShowBlockLibrary(!showBlockLibrary)}
          showLibrary={showBlockLibrary}
        />

        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-280px)]">
          {showBlockLibrary && (
            <div className="col-span-2">
              <BlockLibrary />
            </div>
          )}
          
          <div className={showBlockLibrary ? "col-span-8" : "col-span-10"}>
            <LifePathFlow
              nodes={nodes}
              edges={edges}
              setNodes={setNodes}
              setEdges={setEdges}
              selectedNode={selectedNode}
              onNodeSelect={setSelectedNode}
            />
          </div>

          {selectedNode && (
            <div className="col-span-2">
              <PropertiesPanel
                node={selectedNode}
                onUpdate={(updatedNode) => {
                  setNodes(prev => prev.map(n => n.id === updatedNode.id ? updatedNode : n));
                }}
                onClose={() => setSelectedNode(null)}
              />
            </div>
          )}
        </div>
      </div>

      {showTemplates && (
        <TemplateSelector
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default LifePath;
