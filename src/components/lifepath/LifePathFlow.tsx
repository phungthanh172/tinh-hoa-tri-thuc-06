import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  NodeTypes,
  ConnectionMode,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import LifeDomainNode from './nodes/LifeDomainNode';
import MilestoneNode from './nodes/MilestoneNode';
import { toast } from 'sonner';

const nodeTypes: NodeTypes = {
  lifeDomain: LifeDomainNode as any,
  milestone: MilestoneNode as any,
};

interface LifePathFlowProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  selectedNode: Node | null;
  onNodeSelect: (node: Node | null) => void;
}

const LifePathFlow = ({ 
  nodes, 
  edges, 
  setNodes, 
  setEdges, 
  selectedNode, 
  onNodeSelect 
}: LifePathFlowProps) => {
  const [internalNodes, setInternalNodes, onNodesChange] = useNodesState(nodes);
  const [internalEdges, setInternalEdges, onEdgesChange] = useEdgesState(edges);

  // Sync internal state with props
  React.useEffect(() => {
    setInternalNodes(nodes);
  }, [nodes, setInternalNodes]);

  React.useEffect(() => {
    setInternalEdges(edges);
  }, [edges, setInternalEdges]);

  // Sync props with internal state
  React.useEffect(() => {
    setNodes(internalNodes);
  }, [internalNodes, setNodes]);

  React.useEffect(() => {
    setEdges(internalEdges);
  }, [internalEdges, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        id: `edge-${params.source}-${params.target}-${Date.now()}`,
        source: params.source!,
        target: params.target!,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: '#8b5cf6', 
          strokeWidth: 3,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#8b5cf6',
        },
      };
      setInternalEdges((eds) => addEdge(newEdge, eds));
      toast.success('Connection created! 🔗');
    },
    [setInternalEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    onNodeSelect(node);
  }, [onNodeSelect]);

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const blockData = event.dataTransfer.getData('application/json');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      let parsedData;
      try {
        parsedData = JSON.parse(blockData);
      } catch {
        parsedData = { label: 'New Block', color: '#3b82f6' };
      }

      const newNode: Node = {
        id: `${Date.now()}`,
        type: parsedData.id === 'goal' || parsedData.id === 'event' ? 'milestone' : 'lifeDomain',
        position,
        data: {
          label: parsedData.label || 'New Block',
          icon: parsedData.icon || '📌',
          color: parsedData.color || '#3b82f6',
          description: '',
          priority: 'medium',
          deadline: '',
          emotionTag: 'neutral',
          category: parsedData.id || 'custom',
        },
      };

      setInternalNodes((nds) => nds.concat(newNode));
      toast.success(`Added ${parsedData.label} block!`);
    },
    [setInternalNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="w-full h-full lifepath-canvas rounded-xl shadow-lg overflow-hidden border-2 border-purple-200">
      <ReactFlow
        nodes={internalNodes}
        edges={internalEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        connectionMode={ConnectionMode.Loose}
        attributionPosition="bottom-left"
        style={{ backgroundColor: 'transparent' }}
        className="lifepath-canvas"
      >
        <Controls className="bg-white/90 backdrop-blur-sm rounded-lg border border-purple-200" />
        <MiniMap 
          style={{
            height: 120,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
          }}
          className="backdrop-blur-sm"
          zoomable
          pannable
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={25} 
          size={1.5} 
          color="#d8b4fe"
        />
      </ReactFlow>
    </div>
  );
};

export default LifePathFlow;
