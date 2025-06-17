
import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

// Extend fabric types to include our custom elementData
declare module 'fabric' {
  namespace fabric {
    interface Object {
      elementData?: any;
    }
  }
}

interface LifePathCanvasProps {
  selectedElement: any;
  onElementSelect: (element: any) => void;
  connectionMode: boolean;
}

const LifePathCanvas = ({ selectedElement, onElementSelect, connectionMode }: LifePathCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 1200,
        height: 800,
        backgroundColor: '#f8f9fa'
      });

      setCanvas(fabricCanvas);

      // Handle object selection
      fabricCanvas.on('selection:created', (e) => {
        const selected = e.selected?.[0];
        if (selected && selected.elementData) {
          onElementSelect(selected.elementData);
        }
      });

      fabricCanvas.on('selection:updated', (e) => {
        const selected = e.selected?.[0];
        if (selected && selected.elementData) {
          onElementSelect(selected.elementData);
        }
      });

      fabricCanvas.on('selection:cleared', () => {
        onElementSelect(null);
      });

      // Handle double-click for editing
      fabricCanvas.on('mouse:dblclick', (e) => {
        const target = e.target;
        if (target && target.elementData) {
          onElementSelect(target.elementData);
        }
      });

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [onElementSelect]);

  const addLifeElement = (type: string) => {
    if (!canvas) return;

    const elementData = {
      id: Date.now().toString(),
      name: `New ${type}`,
      date: new Date().toISOString().split('T')[0],
      type: type,
      importance: 'medium',
      hardLevel: 'medium',
      trigger: '',
      description: ''
    };

    // Create visual representation
    const rect = new fabric.Rect({
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

    const text = new fabric.IText(elementData.name, {
      fontSize: 14,
      fill: '#333',
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      top: rect.top! + 50,
      left: rect.left! + 75
    });

    // Group them together
    const group = new fabric.Group([rect, text], {
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

  const createConnection = (from: fabric.Object, to: fabric.Object) => {
    if (!canvas || !from || !to) return;

    const line = new fabric.Line([
      from.left! + from.width! / 2,
      from.top! + from.height! / 2,
      to.left! + to.width! / 2,
      to.top! + to.height! / 2
    ], {
      stroke: '#666',
      strokeWidth: 2,
      selectable: false,
      evented: false
    });

    canvas.add(line);
    canvas.sendToBack(line);
    canvas.renderAll();
  };

  const getTypeColor = (type: string) => {
    const colors = {
      career: '#3b82f6',
      family: '#ef4444',
      health: '#10b981',
      learning: '#f59e0b',
      finance: '#8b5cf6',
      entertainment: '#ec4899',
      travel: '#06b6d4',
      spiritual: '#84cc16'
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  // Export function for toolbar
  React.useImperativeHandle(React.createRef(), () => ({
    addLifeElement
  }));

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default LifePathCanvas;
