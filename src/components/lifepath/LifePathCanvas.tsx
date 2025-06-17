
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, Rect, Circle, Line, Textbox } from 'fabric';

interface LifePathCanvasProps {
  selectedTool: string;
  canvasData?: any;
  onCanvasChange?: (data: any) => void;
}

const LifePathCanvas = ({ selectedTool, canvasData, onCanvasChange }: LifePathCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    fabricCanvasRef.current = canvas;

    // Load existing data if provided
    if (canvasData) {
      canvas.loadFromJSON(canvasData, () => {
        canvas.renderAll();
      });
    }

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;

    const handleCanvasChange = () => {
      if (onCanvasChange) {
        onCanvasChange(canvas.toJSON());
      }
    };

    canvas.on('object:added', handleCanvasChange);
    canvas.on('object:removed', handleCanvasChange);
    canvas.on('object:modified', handleCanvasChange);

    return () => {
      canvas.off('object:added', handleCanvasChange);
      canvas.off('object:removed', handleCanvasChange);
      canvas.off('object:modified', handleCanvasChange);
    };
  }, [onCanvasChange]);

  const addRectangle = () => {
    if (!fabricCanvasRef.current) return;

    const rect = new Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 60,
      fill: '#ff6b6b',
      stroke: '#333',
      strokeWidth: 2,
    });

    fabricCanvasRef.current.add(rect);
  };

  const addCircle = () => {
    if (!fabricCanvasRef.current) return;

    const circle = new Circle({
      left: 150,
      top: 150,
      radius: 50,
      fill: '#4ecdc4',
      stroke: '#333',
      strokeWidth: 2,
    });

    fabricCanvasRef.current.add(circle);
  };

  const addTextBox = () => {
    if (!fabricCanvasRef.current) return;

    const textbox = new Textbox('Your text here', {
      left: 200,
      top: 200,
      width: 200,
      fontSize: 16,
      fill: '#333',
    });

    fabricCanvasRef.current.add(textbox);
  };

  const addArrow = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    
    const line = new Line([250, 250, 350, 250], {
      stroke: '#666',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });

    canvas.add(line);
    // Send line to back by moving it to index 0
    const objects = canvas.getObjects();
    const lineIndex = objects.indexOf(line);
    if (lineIndex > -1) {
      canvas.remove(line);
      objects.unshift(line);
      canvas.clear();
      objects.forEach(obj => canvas.add(obj));
    }
    canvas.renderAll();
  };

  useEffect(() => {
    switch (selectedTool) {
      case 'rectangle':
        addRectangle();
        break;
      case 'circle':
        addCircle();
        break;
      case 'text':
        addTextBox();
        break;
      case 'arrow':
        addArrow();
        break;
    }
  }, [selectedTool]);

  const clearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
    }
  };

  const deleteSelected = () => {
    if (!fabricCanvasRef.current) return;

    const activeObjects = fabricCanvasRef.current.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach(obj => {
        fabricCanvasRef.current?.remove(obj);
      });
      fabricCanvasRef.current.discardActiveObject();
      fabricCanvasRef.current.renderAll();
    }
  };

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={clearCanvas}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={deleteSelected}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default LifePathCanvas;
