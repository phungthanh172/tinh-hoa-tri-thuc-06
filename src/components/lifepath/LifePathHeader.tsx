
import React from 'react';
import { Button } from '@/components/ui/button';

interface LifePathHeaderProps {
  onShowTemplates: () => void;
  onLoad: () => void;
}

const LifePathHeader = ({ onShowTemplates, onLoad }: LifePathHeaderProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Life Path Designer
          </h1>
          <p className="text-gray-600 text-lg">Design your personal journey by mapping out your life domains and goals</p>
          <div className="flex space-x-2 text-sm text-gray-500">
            <span className="bg-white/60 px-2 py-1 rounded-full">✨ Drag blocks to canvas</span>
            <span className="bg-white/60 px-2 py-1 rounded-full">🔗 Connect related nodes</span>
            <span className="bg-white/60 px-2 py-1 rounded-full">📝 Edit properties</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={onShowTemplates}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          >
            📋 Templates
          </Button>
          <Button
            onClick={onLoad}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          >
            📂 Load
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LifePathHeader;
