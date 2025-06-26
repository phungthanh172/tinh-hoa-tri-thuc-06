
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Star, AlertTriangle, Heart, Meh, Frown, Zap } from 'lucide-react';

interface LifeDomainNodeData {
  label: string;
  icon: string;
  color: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  deadline?: string;
  emotionTag?: 'happy' | 'neutral' | 'anxious' | 'stressed';
  category?: string;
}

const LifeDomainNode = memo(({ data, selected }: NodeProps<LifeDomainNodeData>) => {
  const priorityColors = {
    low: 'border-green-400 bg-green-50',
    medium: 'border-yellow-400 bg-yellow-50',
    high: 'border-orange-400 bg-orange-50',
    critical: 'border-red-400 bg-red-50',
  };

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

  const priorityClass = priorityColors[data.priority || 'medium'];
  const PriorityIcon = priorityIcons[data.priority || 'medium']?.icon || Target;
  const emotionData = emotionIcons[data.emotionTag || 'neutral'];

  return (
    <Card className={`w-48 min-h-32 p-4 cursor-pointer transition-all duration-300 ${priorityClass} ${
      selected ? 'ring-2 ring-purple-500 shadow-xl scale-105' : 'hover:shadow-lg hover:scale-102'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-purple-500 border-2 border-white"
      />
      
      <div className="flex flex-col h-full">
        {/* Header with icon and category */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl">{data.icon}</div>
          <Badge variant="outline" className="text-xs">
            {data.category || 'Domain'}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2">
          {data.label}
        </h3>

        {/* Priority and Emotion */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <PriorityIcon 
              className="w-3 h-3" 
              style={{ color: priorityIcons[data.priority || 'medium']?.color }} 
            />
            <span className="text-xs font-medium">
              {priorityIcons[data.priority || 'medium']?.label}
            </span>
          </div>
          <div className="text-sm">
            {emotionData?.label}
          </div>
        </div>

        {/* Deadline */}
        {data.deadline && (
          <div className="text-xs text-gray-500 mt-auto">
            📅 {new Date(data.deadline).toLocaleDateString()}
          </div>
        )}

        {/* Description preview */}
        {data.description && (
          <div className="text-xs text-gray-600 mt-1 line-clamp-2">
            {data.description}
          </div>
        )}
      </div>

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

LifeDomainNode.displayName = 'LifeDomainNode';

export default LifeDomainNode;
