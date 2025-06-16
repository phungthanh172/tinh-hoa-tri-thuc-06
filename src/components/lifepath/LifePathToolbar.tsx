
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Undo, Redo, ZoomIn, ZoomOut, Move, Square, Circle, Type, Trash2, Link, Hand } from 'lucide-react';

const LifePathToolbar = ({ canvasRef }) => {
  const [activeTool, setActiveTool] = useState('select');

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

  const handleToolSelect = (tool) => {
    setActiveTool(tool);
    if (canvasRef) {
      // Reset canvas interaction mode
      canvasRef.isDrawingMode = false;
      canvasRef.selection = tool === 'select';
      canvasRef.defaultCursor = tool === 'pan' ? 'grab' : 'default';
    }
  };

  const addRectangle = () => {
    if (canvasRef) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: '#3b82f6',
        width: 100,
        height: 100,
        rx: 8,
        ry: 8,
      });
      canvasRef.add(rect);
    }
  };

  const addCircle = () => {
    if (canvasRef) {
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        fill: '#ef4444',
        radius: 50,
      });
      canvasRef.add(circle);
    }
  };

  const addText = () => {
    if (canvasRef) {
      const text = new fabric.IText('Click to edit', {
        left: 100,
        top: 100,
        fontSize: 16,
        fill: '#1f2937',
      });
      canvasRef.add(text);
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
        <Button 
          variant={activeTool === 'select' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => handleToolSelect('select')}
        >
          <Move className="w-4 h-4" />
        </Button>
        <Button 
          variant={activeTool === 'pan' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => handleToolSelect('pan')}
        >
          <Hand className="w-4 h-4" />
        </Button>
        <Button 
          variant={activeTool === 'connect' ? 'default' : 'ghost'} 
          size="sm" 
          onClick={() => handleToolSelect('connect')}
        >
          <Link className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <Button variant="ghost" size="sm" onClick={addRectangle}>
          <Square className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={addCircle}>
          <Circle className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={addText}>
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
