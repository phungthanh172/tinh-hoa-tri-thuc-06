
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Star, AlertTriangle, Clock, Target, Zap } from 'lucide-react';

const ElementPropertiesPanel = ({ element, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: '',
    important: 'medium',
    hardLevel: 'medium',
    trigger: '',
  });

  useEffect(() => {
    if (element?.elementData) {
      setFormData(element.elementData);
    }
  }, [element]);

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const importanceIcons = {
    low: { icon: Clock, color: '#10b981', label: 'Low Priority' },
    medium: { icon: Target, color: '#f59e0b', label: 'Medium Priority' },
    high: { icon: Star, color: '#ef4444', label: 'High Priority' },
    critical: { icon: AlertTriangle, color: '#dc2626', label: 'Critical' },
  };

  const hardLevelIcons = {
    easy: { icon: Zap, color: '#10b981', label: 'Easy' },
    medium: { icon: Target, color: '#f59e0b', label: 'Medium' },
    hard: { icon: AlertTriangle, color: '#ef4444', label: 'Hard' },
    expert: { icon: Star, color: '#8b5cf6', label: 'Expert' },
  };

  const ImportanceIcon = importanceIcons[formData.important]?.icon || Target;
  const HardLevelIcon = hardLevelIcons[formData.hardLevel]?.icon || Target;

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Element Properties</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter element name"
          />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="education">Learning</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="entertainment">Fun</SelectItem>
              <SelectItem value="goal">Goal</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="home">Living</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Importance</Label>
          <Select value={formData.important} onValueChange={(value) => handleInputChange('important', value)}>
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <ImportanceIcon 
                    className="w-4 h-4" 
                    style={{ color: importanceIcons[formData.important]?.color }} 
                  />
                  <span>{importanceIcons[formData.important]?.label}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(importanceIcons).map(([key, { icon: Icon, color, label }]) => (
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
          <Label>Difficulty Level</Label>
          <Select value={formData.hardLevel} onValueChange={(value) => handleInputChange('hardLevel', value)}>
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <HardLevelIcon 
                    className="w-4 h-4" 
                    style={{ color: hardLevelIcons[formData.hardLevel]?.color }} 
                  />
                  <span>{hardLevelIcons[formData.hardLevel]?.label}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(hardLevelIcons).map(([key, { icon: Icon, color, label }]) => (
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
          <Label htmlFor="trigger">Trigger/Notes</Label>
          <Textarea
            id="trigger"
            value={formData.trigger}
            onChange={(e) => handleInputChange('trigger', e.target.value)}
            placeholder="What triggers this? Additional notes..."
            rows={3}
          />
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2 text-sm text-gray-600">Quick Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              Duplicate Element
            </Button>
            <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700">
              Delete Element
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementPropertiesPanel;
