import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LifePathFlow from '@/components/lifepath/LifePathFlow';
import BlockLibrary from '@/components/lifepath/BlockLibrary';
import PropertiesPanel from '@/components/lifepath/PropertiesPanel';
import LifePathToolbar from '@/components/lifepath/LifePathToolbar';
import TemplateSelector from '@/components/lifepath/TemplateSelector';
import FloatingChatBox from '@/components/FloatingChatBox';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Life Path Designer
            </h1>
            <p className="text-gray-600 text-lg">Design your personal journey by mapping out your life domains and goals</p>
            <div className="flex space-x-2 text-sm text-gray-500">
              <span className="bg-white/60 px-2 py-1 rounded-full">✨ Drag blocks to canvas</span>
              <span className="bg-white/60 px-2 py-1 rounded-full">🔗 Connect related nodes</span>
              <span className="bg-white/60 px-2 py-1 rounded-full">📝 Edit properties</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowTemplates(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              📋 Templates
            </button>
            <button
              onClick={handleLoad}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              📂 Load
            </button>
          </div>
        </div>

        <div className="mb-4">
          <LifePathToolbar
            onSave={handleSave}
            onShare={handleShare}
            onClear={handleClear}
            onToggleLibrary={() => setShowBlockLibrary(!showBlockLibrary)}
            showLibrary={showBlockLibrary}
          />
        </div>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-320px)]">
          {showBlockLibrary && (
            <div className="col-span-3">
              <div className="h-full">
                <BlockLibrary />
              </div>
            </div>
          )}
          
          <div className={showBlockLibrary ? "col-span-7" : "col-span-10"}>
            <div className="h-full">
              <LifePathFlow
                nodes={nodes}
                edges={edges}
                setNodes={setNodes}
                setEdges={setEdges}
                selectedNode={selectedNode}
                onNodeSelect={setSelectedNode}
              />
            </div>
          </div>

          {selectedNode && (
            <div className="col-span-2">
              <div className="h-full">
                <PropertiesPanel
                  node={selectedNode}
                  onUpdate={(updatedNode) => {
                    setNodes(prev => prev.map(n => n.id === updatedNode.id ? updatedNode : n));
                  }}
                  onClose={() => setSelectedNode(null)}
                />
              </div>
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

      <FloatingChatBox />
      <Footer />
    </div>
  );
};

export default LifePath;
