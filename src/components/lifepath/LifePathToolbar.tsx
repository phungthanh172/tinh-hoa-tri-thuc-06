
import React from 'react';
import { Button } from '@/components/ui/button';
import { Undo, Redo, ZoomIn, ZoomOut, Move, Square, Circle, Type, Trash2 } from 'lucide-react';

const LifePathToolbar = ({ canvasRef }) => {
  const handleUndo = () => {
    // Implement undo functionality
    console.log('Undo');
  };

  const handleRedo = () => {
    // Implement redo functionality
    console.log('Redo');
  };

  const handleZoomIn = () => {
    if (canvasRef) {
      const zoom = canvasRef.getZoom();
      canvasRef.setZoom(Math.min(zoom * 1.1, 3));
    }
  };

  const handleZoomOut = () => {
    if (canvasRef) {
      const zoom = canvasRef.getZoom();
      canvasRef.setZoom(Math.max(zoom * 0.9, 0.1));
    }
  };

  const handleDelete = () => {
    if (canvasRef) {
      const activeObjects = canvasRef.getActiveObjects();
      activeObjects.forEach(obj => canvasRef.remove(obj));
      canvasRef.discardActiveObject();
      canvasRef.renderAll();
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border-b bg-gray-50">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={handleUndo}>
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleRedo}>
          <Redo className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <Button variant="ghost" size="sm" onClick={handleZoomOut}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleZoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Move className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Square className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Circle className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Type className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-700">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default LifePathToolbar;
