
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';

interface LifeDomainNodeData {
  label: string;
  icon: string;
  color: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  deadline?: string;
  emotionTag?: string;
  category?: string;
}

const LifeDomainNode = memo(({ data, selected }: NodeProps<LifeDomainNodeData>) => {
  const priorityColors = {
    low: 'border-green-400 bg-green-50',
    medium: 'border-yellow-400 bg-yellow-50',
    high: 'border-orange-400 bg-orange-50',
    critical: 'border-red-400 bg-red-50',
  };

  const priorityClass = priorityColors[data.priority || 'medium'];

  return (
    <Card className={`w-40 h-24 p-3 cursor-pointer transition-all duration-200 ${priorityClass} ${
      selected ? 'ring-2 ring-purple-500 shadow-lg' : 'hover:shadow-md'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-purple-500"
      />
      
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="text-2xl mb-1">{data.icon}</div>
        <div className="text-xs font-medium text-gray-700 leading-tight">
          {data.label}
        </div>
        {data.deadline && (
          <div className="text-xs text-gray-500 mt-1">
            {new Date(data.deadline).toLocaleDateString()}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-purple-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-purple-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-purple-500"
      />
    </Card>
  );
});

LifeDomainNode.displayName = 'LifeDomainNode';

export default LifeDomainNode;
