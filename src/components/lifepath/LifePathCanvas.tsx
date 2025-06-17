
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Rect, IText, Group, Line } from 'fabric';

interface LifePathCanvasProps {
  selectedElement: any;
  onElementSelect: (element: any) => void;
  connectionMode: boolean;
  onAddElement: (type: string) => void;
}

const LifePathCanvas = ({ selectedElement, onElementSelect, connectionMode, onAddElement }: LifePathCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<FabricCanvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new FabricCanvas(canvasRef.current, {
        width: 1200,
        height: 800,
        backgroundColor: '#f8f9fa'
      });

      setCanvas(fabricCanvas);

      // Handle object selection
      fabricCanvas.on('selection:created', (e) => {
        const selected = e.selected?.[0];
        if (selected && (selected as any).elementData) {
          onElementSelect((selected as any).elementData);
        }
      });

      fabricCanvas.on('selection:updated', (e) => {
        const selected = e.selected?.[0];
        if (selected && (selected as any).elementData) {
          onElementSelect((selected as any).elementData);
        }
      });

      fabricCanvas.on('selection:cleared', () => {
        onElementSelect(null);
      });

      // Handle double-click for editing
      fabricCanvas.on('mouse:dblclick', (e) => {
        const target = e.target;
        if (target && (target as any).elementData) {
          onElementSelect((target as any).elementData);
        }
      });

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [onElementSelect, canvas]);

  // Listen for onAddElement prop changes
  useEffect(() => {
    if (canvas) {
      (window as any).addLifeElement = (type: string) => addLifeElement(type);
    }
  }, [canvas]);

  const addLifeElement = (type: string) => {
    if (!canvas) return;

    const elementData = {
      id: Date.now().toString(),
      name: `New ${type}`,
      date: new Date().toISOString().split('T')[0],
      type: type,
      important: 'medium',
      hardLevel: 'medium',
      trigger: '',
      description: ''
    };

    // Create visual representation
    const rect = new Rect({
      width: 150,
      height: 100,
      fill: getTypeColor(type),
      stroke: '#333',
      strokeWidth: 2,
      rx: 10,
      ry: 10,
      left: Math.random() * 400 + 100,
      top: Math.random() * 300 + 100
    });

    const text = new IText(elementData.name, {
      fontSize: 14,
      fill: '#333',
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      top: (rect.top || 0) + 50,
      left: (rect.left || 0) + 75
    });

    // Group them together
    const group = new Group([rect, text], {
      left: rect.left,
      top: rect.top
    });

    // Attach element data
    (group as any).elementData = elementData;
    (rect as any).elementData = elementData;
    (text as any).elementData = elementData;

    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.renderAll();
  };

  const createConnection = (from: any, to: any) => {
    if (!canvas || !from || !to) return;

    const fromLeft = from.left || 0;
    const fromTop = from.top || 0;
    const fromWidth = from.width || 0;
    const fromHeight = from.height || 0;
    
    const toLeft = to.left || 0;
    const toTop = to.top || 0;
    const toWidth = to.width || 0;
    const toHeight = to.height || 0;

    const line = new Line([
      fromLeft + fromWidth / 2,
      fromTop + fromHeight / 2,
      toLeft + toWidth / 2,
      toTop + toHeight / 2
    ], {
      stroke: '#666',
      strokeWidth: 2,
      selectable: false,
      evented: false
    });

    canvas.add(line);
    // Send line to back using the objects array approach for Fabric.js v6
    const objects = canvas.getObjects();
    const lineIndex = objects.indexOf(line);
    if (lineIndex > -1) {
      canvas.remove(line);
      canvas.insertAt(line, 0);
    }
    canvas.renderAll();
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      career: '#3b82f6',
      family: '#ef4444',
      health: '#10b981',
      learning: '#f59e0b',
      finance: '#8b5cf6',
      entertainment: '#ec4899',
      travel: '#06b6d4',
      spiritual: '#84cc16'
    };
    return colors[type] || '#6b7280';
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default LifePathCanvas;
