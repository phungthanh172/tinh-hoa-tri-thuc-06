
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Star, AlertTriangle, Heart, Meh, Frown, Zap } from 'lucide-react';

interface MilestoneNodeData {
  label: string;
  icon: string;
  color: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  deadline?: string;
  emotionTag?: 'happy' | 'neutral' | 'anxious' | 'stressed';
  category?: string;
}

const MilestoneNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as MilestoneNodeData;
  
  const priorityIcons = {
    low: { icon: Clock, color: '#10b981', label: 'Low' },
    medium: { icon: Target, color: '#f59e0b', label: 'Medium' },
    high: { icon: Star, color: '#ef4444', label: 'High' },
    critical: { icon: AlertTriangle, color: '#dc2626', label: 'Critical' },
  };

  const emotionIcons = {
    happy: { icon: Heart, color: '#ef4444', label: '😊' },
    neutral: { icon: Meh, color: '#6b7280', label: '😐' },
    anxious: { icon: Frown, color: '#f59e0b', label: '😰' },
    stressed: { icon: Zap, color: '#dc2626', label: '😤' },
  };

  const PriorityIcon = priorityIcons[nodeData.priority || 'medium']?.icon || Target;
  const emotionData = emotionIcons[nodeData.emotionTag || 'neutral'];

  return (
    <Card className={`w-40 h-40 p-4 cursor-pointer transition-all duration-300 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 border-2 ${
      selected ? 'ring-2 ring-purple-500 shadow-xl scale-110 border-purple-400' : 'hover:shadow-lg hover:scale-105 border-purple-200'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-purple-500 border-2 border-white"
      />
      
      {/* Icon */}
      <div className="text-4xl mb-2">{nodeData.icon}</div>
      
      {/* Title */}
      <div className="text-xs font-semibold text-gray-700 text-center leading-tight mb-2">
        {nodeData.label}
      </div>

      {/* Type badge */}
      <Badge variant="secondary" className="text-xs mb-1">
        {nodeData.category || 'Goal'}
      </Badge>

      {/* Priority and Emotion row */}
      <div className="flex items-center space-x-2 mb-1">
        <div className="flex items-center space-x-1">
          <PriorityIcon 
            className="w-3 h-3" 
            style={{ color: priorityIcons[nodeData.priority || 'medium']?.color }} 
          />
        </div>
        <div className="text-sm">
          {emotionData?.label}
        </div>
      </div>

      {/* Deadline */}
      {nodeData.deadline && (
        <div className="text-xs text-gray-500 text-center">
          {new Date(nodeData.deadline).toLocaleDateString()}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-purple-500 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-purple-500 border-2 border-white"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-purple-500 border-2 border-white"
      />
    </Card>
  );
});

MilestoneNode.displayName = 'MilestoneNode';

export default MilestoneNode;
