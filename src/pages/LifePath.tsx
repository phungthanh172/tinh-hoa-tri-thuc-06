
import React, { useState, useCallback } from 'react';
import LifePathLayout from '@/components/lifepath/LifePathLayout';
import LifePathHeader from '@/components/lifepath/LifePathHeader';
import LifePathContent from '@/components/lifepath/LifePathContent';
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
    <LifePathLayout>
      <LifePathHeader
        onShowTemplates={() => setShowTemplates(true)}
        onLoad={handleLoad}
      />
      
      <LifePathContent
        showBlockLibrary={showBlockLibrary}
        onToggleLibrary={() => setShowBlockLibrary(!showBlockLibrary)}
        nodes={nodes}
        edges={edges}
        setNodes={setNodes}
        setEdges={setEdges}
        selectedNode={selectedNode}
        onNodeSelect={setSelectedNode}
        onSave={handleSave}
        onShare={handleShare}
        onClear={handleClear}
      />

      {showTemplates && (
        <TemplateSelector
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </LifePathLayout>
  );
};

export default LifePath;
