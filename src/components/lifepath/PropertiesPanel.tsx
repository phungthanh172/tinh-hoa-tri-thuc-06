
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Star, AlertTriangle, Clock, Target, Zap, Heart, Meh, Frown } from 'lucide-react';

interface PropertiesPanelProps {
  node: any;
  onUpdate: (node: any) => void;
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
  });

  useEffect(() => {
    if (node?.data) {
      setFormData({
        label: node.data.label || '',
        description: node.data.description || '',
        priority: node.data.priority || 'medium',
        deadline: node.data.deadline || '',
        emotionTag: node.data.emotionTag || 'neutral',
        icon: node.data.icon || '📌',
        color: node.data.color || '#3b82f6',
      });
    }
  }, [node]);

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    
    const updatedNode = {
      ...node,
      data: { ...node.data, ...updatedData }
    };
    onUpdate(updatedNode);
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

  const icons = ['💼', '👨‍👩‍👧‍👦', '🏃‍♂️', '📚', '💰', '🎯', '✈️', '🧘‍♀️', '🎨', '🏠', '🚀', '💡', '🌟', '🎉'];

  const PriorityIcon = priorityIcons[formData.priority]?.icon || Target;
  const EmotionIcon = emotionIcons[formData.emotionTag]?.icon || Meh;

  return (
    <Card className="h-full bg-white shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Block Properties</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 overflow-y-auto">
        <div>
          <Label htmlFor="label">Title</Label>
          <Input
            id="label"
            value={formData.label}
            onChange={(e) => handleInputChange('label', e.target.value)}
            placeholder="Enter block title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe this life domain..."
            rows={3}
          />
        </div>

        <div>
          <Label>Icon</Label>
          <div className="grid grid-cols-6 gap-2 mt-2">
            {icons.map((icon) => (
              <button
                key={icon}
                onClick={() => handleInputChange('icon', icon)}
                className={`p-2 text-lg rounded border-2 hover:bg-gray-50 transition-colors ${
                  formData.icon === icon ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <PriorityIcon 
                    className="w-4 h-4" 
                    style={{ color: priorityIcons[formData.priority]?.color }} 
                  />
                  <span>{priorityIcons[formData.priority]?.label}</span>
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
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <EmotionIcon 
                    className="w-4 h-4" 
                    style={{ color: emotionIcons[formData.emotionTag]?.color }} 
                  />
                  <span>{emotionIcons[formData.emotionTag]?.label}</span>
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
          />
        </div>

        <div>
          <Label htmlFor="color">Color</Label>
          <div className="flex gap-2 mt-2">
            {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'].map((color) => (
              <button
                key={color}
                onClick={() => handleInputChange('color', color)}
                className={`w-8 h-8 rounded border-2 ${
                  formData.color === color ? 'border-gray-600' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            🔄 Duplicate Block
          </Button>
          <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700">
            🗑️ Delete Block
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertiesPanel;
