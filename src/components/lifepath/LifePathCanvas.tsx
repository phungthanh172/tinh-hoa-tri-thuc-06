
import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

interface LifePathCanvasProps {
  selectedElement: any;
  onElementSelect: (element: any) => void;
  connectionMode: boolean;
  onAddElement: (type: string) => void;
}

const LifePathCanvas = ({ selectedElement, onElementSelect, connectionMode, onAddElement }: LifePathCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
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

  // Expose addLifeElement function
  React.useImperativeHandle(React.createRef(), () => ({
    addLifeElement: (type: string) => addLifeElement(type)
  }));

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
      top: (rect.top || 0) + 50,
      left: (rect.left || 0) + 75
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

    const fromLeft = (from as any).left || 0;
    const fromTop = (from as any).top || 0;
    const fromWidth = (from as any).width || 0;
    const fromHeight = (from as any).height || 0;
    
    const toLeft = (to as any).left || 0;
    const toTop = (to as any).top || 0;
    const toWidth = (to as any).width || 0;
    const toHeight = (to as any).height || 0;

    const line = new fabric.Line([
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
    canvas.sendToBack(line);
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
