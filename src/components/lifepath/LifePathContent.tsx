
import React from 'react';
import { Node, Edge } from '@xyflow/react';
import LifePathFlow from './LifePathFlow';
import BlockLibrary from './BlockLibrary';
import PropertiesPanel from './PropertiesPanel';
import LifePathToolbar from './LifePathToolbar';

interface LifePathContentProps {
  showBlockLibrary: boolean;
  onToggleLibrary: () => void;
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  selectedNode: Node | null;
  onNodeSelect: (node: Node | null) => void;
  onSave: () => void;
  onShare: () => void;
  onClear: () => void;
}

const LifePathContent = ({
  showBlockLibrary,
  onToggleLibrary,
  nodes,
  edges,
  setNodes,
  setEdges,
  selectedNode,
  onNodeSelect,
  onSave,
  onShare,
  onClear
}: LifePathContentProps) => {
  return (
    <div className="container mx-auto px-4 pb-6">
      <div className="mb-4">
        <LifePathToolbar
          onSave={onSave}
          onShare={onShare}
          onClear={onClear}
          onToggleLibrary={onToggleLibrary}
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
              onNodeSelect={onNodeSelect}
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
                onClose={() => onNodeSelect(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifePathContent;
