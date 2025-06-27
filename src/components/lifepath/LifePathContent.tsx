
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
    <div className="w-full h-full flex flex-col px-4 pb-6">
      <div className="mb-4 flex-shrink-0">
        <LifePathToolbar
          onSave={onSave}
          onShare={onShare}
          onClear={onClear}
          onToggleLibrary={onToggleLibrary}
          showLibrary={showBlockLibrary}
        />
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 h-full min-h-0">
        {showBlockLibrary && (
          <div className="col-span-3 h-full">
            <div className="h-full">
              <BlockLibrary />
            </div>
          </div>
        )}
        
        <div className={showBlockLibrary ? "col-span-7 h-full" : "col-span-10 h-full"}>
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
          <div className="col-span-2 h-full">
            <div className="h-full">
              <PropertiesPanel
                node={selectedNode}
                onUpdate={(updatedNode: Node) => {
                  setNodes(nodes.map(n => n.id === updatedNode.id ? updatedNode : n));
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
