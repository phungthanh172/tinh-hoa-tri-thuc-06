
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';

interface MilestoneNodeData {
  label: string;
  icon: string;
  color: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  deadline?: string;
  emotionTag?: string;
  category?: string;
}

const MilestoneNode = memo(({ data, selected }: NodeProps<MilestoneNodeData>) => {
  return (
    <Card className={`w-32 h-32 p-3 cursor-pointer transition-all duration-200 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 border-2 ${
      selected ? 'ring-2 ring-purple-500 shadow-lg border-purple-400' : 'hover:shadow-md border-purple-200'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-purple-500"
      />
      
      <div className="text-3xl mb-2">{data.icon}</div>
      <div className="text-xs font-medium text-gray-700 text-center leading-tight">
        {data.label}
      </div>
      {data.deadline && (
        <div className="text-xs text-gray-500 mt-1">
          {new Date(data.deadline).toLocaleDateString()}
        </div>
      )}

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

MilestoneNode.displayName = 'MilestoneNode';

export default MilestoneNode;
