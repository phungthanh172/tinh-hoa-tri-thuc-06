
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Star, AlertTriangle, Clock, Target, Zap, Heart, Meh, Frown, Copy, Trash2 } from 'lucide-react';
import { Node } from '@xyflow/react';

interface PropertiesPanelProps {
  node: Node | null;
  onUpdate: (node: Node) => void;
  onClose: () => void;
}

const PropertiesPanel = ({ node, onUpdate, onClose }: PropertiesPanelProps) => {
  const [formData, setFormData] = useState({
    label: '',
    description: '',
    priority: 'medium',
    deadline: '',
    emotionTag: 'neutral',
    icon: '📌',
    color: '#3b82f6',
    category: '',
  });

  useEffect(() => {
    if (node?.data) {
      setFormData({
        label: (node.data as any).label || '',
        description: (node.data as any).description || '',
        priority: (node.data as any).priority || 'medium',
        deadline: (node.data as any).deadline || '',
        emotionTag: (node.data as any).emotionTag || 'neutral',
        icon: (node.data as any).icon || '📌',
        color: (node.data as any).color || '#3b82f6',
        category: (node.data as any).category || '',
      });
    }
  }, [node]);

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    
    if (node) {
      const updatedNode = {
        ...node,
        data: { ...node.data, ...updatedData }
      };
      onUpdate(updatedNode);
    }
  };

  const priorityIcons = {
    low: { icon: Clock, color: '#10b981', label: 'Low Priority' },
    medium: { icon: Target, color: '#f59e0b', label: 'Medium Priority' },
    high: { icon: Star, color: '#ef4444', label: 'High Priority' },
    critical: { icon: AlertTriangle, color: '#dc2626', label: 'Critical' },
  };

  const emotionIcons = {
    happy: { icon: Heart, color: '#ef4444', label: 'Excited' },
    neutral: { icon: Meh, color: '#6b7280', label: 'Neutral' },
    anxious: { icon: Frown, color: '#f59e0b', label: 'Anxious' },
    stressed: { icon: Zap, color: '#dc2626', label: 'Stressed' },
  };

  const icons = ['💼', '❤️', '🎓', '💰', '⚡', '🎮', '🎯', '📅', '👥', '🏠', '🚀', '💡', '🌟', '🎉', '📚', '🏃‍♂️', '✈️', '🧘‍♀️', '🎨'];
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  const PriorityIcon = priorityIcons[formData.priority as keyof typeof priorityIcons]?.icon || Target;
  const EmotionIcon = emotionIcons[formData.emotionTag as keyof typeof emotionIcons]?.icon || Meh;

  if (!node) return null;

  return (
    <Card className="h-full bg-white shadow-xl border-2 border-purple-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-purple-800 flex items-center space-x-2">
            <div className="text-2xl">{formData.icon}</div>
            <div>
              <div>Block Properties</div>
              <Badge variant="outline" className="text-xs mt-1">
                {node.type === 'milestone' ? 'Milestone' : 'Life Domain'}
              </Badge>
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-purple-100">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] p-4">
        {/* Current Info Display */}
        <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-800">Current Status</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <PriorityIcon 
                className="w-4 h-4" 
                style={{ color: priorityIcons[formData.priority as keyof typeof priorityIcons]?.color }} 
              />
              <span>{priorityIcons[formData.priority as keyof typeof priorityIcons]?.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <EmotionIcon 
                className="w-4 h-4" 
                style={{ color: emotionIcons[formData.emotionTag as keyof typeof emotionIcons]?.color }} 
              />
              <span>{emotionIcons[formData.emotionTag as keyof typeof emotionIcons]?.label}</span>
            </div>
            {formData.category && (
              <div>
                <span className="font-medium">Type:</span> {formData.category}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="label">Title</Label>
          <Input
            id="label"
            value={formData.label}
            onChange={(e) => handleInputChange('label', e.target.value)}
            placeholder="Enter block title"
            className="border-purple-200 focus:border-purple-400"
          />
        </div>

        <div>
          <Label htmlFor="category">Type/Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            placeholder="e.g., Career, Family, Goal"
            className="border-purple-200 focus:border-purple-400"
          />
        </div>

        <div>
          <Label htmlFor="description">Description (Bonus)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Add detailed description, notes, or action steps..."
            rows={4}
            className="border-purple-200 focus:border-purple-400"
          />
        </div>

        <div>
          <Label>Icon</Label>
          <div className="grid grid-cols-6 gap-2 mt-2">
            {icons.map((icon) => (
              <button
                key={icon}
                onClick={() => handleInputChange('icon', icon)}
                className={`p-2 text-lg rounded-lg border-2 hover:bg-purple-50 transition-colors ${
                  formData.icon === icon ? 'border-purple-500 bg-purple-100' : 'border-gray-200'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Priority Level</Label>
          <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
            <SelectTrigger className="border-purple-200 focus:border-purple-400">
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <PriorityIcon 
                    className="w-4 h-4" 
                    style={{ color: priorityIcons[formData.priority as keyof typeof priorityIcons]?.color }} 
                  />
                  <span>{priorityIcons[formData.priority as keyof typeof priorityIcons]?.label}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(priorityIcons).map(([key, { icon: Icon, color, label }]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" style={{ color }} />
                    <span>{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Emotion</Label>
          <Select value={formData.emotionTag} onValueChange={(value) => handleInputChange('emotionTag', value)}>
            <SelectTrigger className="border-purple-200 focus:border-purple-400">
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <EmotionIcon 
                    className="w-4 h-4" 
                    style={{ color: emotionIcons[formData.emotionTag as keyof typeof emotionIcons]?.color }} 
                  />
                  <span>{emotionIcons[formData.emotionTag as keyof typeof emotionIcons]?.label}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(emotionIcons).map(([key, { icon: Icon, color, label }]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" style={{ color }} />
                    <span>{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="deadline">Target Date</Label>
          <Input
            id="deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => handleInputChange('deadline', e.target.value)}
            className="border-purple-200 focus:border-purple-400"
          />
        </div>

        <div>
          <Label htmlFor="color">Color Theme</Label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleInputChange('color', color)}
                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                  formData.color === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Button variant="outline" size="sm" className="w-full hover:bg-purple-50 border-purple-200">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate Block
          </Button>
          <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Block
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertiesPanel;
