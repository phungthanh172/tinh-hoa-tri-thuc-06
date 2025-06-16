
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Rect, Circle, IText, Line, FabricObject } from 'fabric';
import ElementPropertiesPanel from './ElementPropertiesPanel';

const LifePathCanvas = ({ onCanvasReady }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasRef.current.offsetWidth,
      height: canvasRef.current.offsetHeight,
      backgroundColor: '#f8fafc',
    });

    fabricCanvasRef.current = canvas;
    onCanvasReady && onCanvasReady(canvas);

    // Add welcome message
    const welcomeText = new IText('Welcome to your Life Path Designer!\nDrag blocks from the left panel to start designing.', {
      left: canvas.width / 2,
      top: canvas.height / 2,
      originX: 'center',
      originY: 'center',
      fontSize: 18,
      fill: '#64748b',
      textAlign: 'center',
      selectable: false,
      evented: false,
    });
    canvas.add(welcomeText);

    // Handle canvas drop events
    canvas.on('drop', handleCanvasDrop);
    canvas.getElement().addEventListener('dragover', handleDragOver);
    canvas.getElement().addEventListener('drop', handleElementDrop);

    // Handle object selection
    canvas.on('selection:created', (e) => {
      if (e.selected[0] && e.selected[0].elementData) {
        setSelectedElement(e.selected[0]);
      }
    });

    canvas.on('selection:updated', (e) => {
      if (e.selected[0] && e.selected[0].elementData) {
        setSelectedElement(e.selected[0]);
      }
    });

    canvas.on('selection:cleared', () => {
      setSelectedElement(null);
    });

    // Handle double-click for editing
    canvas.on('mouse:dblclick', (e) => {
      if (e.target && e.target.elementData) {
        setSelectedElement(e.target);
      }
    });

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvas.setDimensions({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        });
        canvas.renderAll();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, [onCanvasReady]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleElementDrop = (e) => {
    e.preventDefault();
    const blockData = e.dataTransfer.getData('application/json');
    if (blockData) {
      const block = JSON.parse(blockData);
      createElementFromBlock(block, e.offsetX, e.offsetY);
    }
  };

  const handleCanvasDrop = (e) => {
    // This is handled by the element drop handler
  };

  const createElementFromBlock = (block, x, y) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    // Create a group with background rect and text
    const bgRect = new Rect({
      width: 120,
      height: 80,
      fill: `${block.color}20`,
      stroke: block.color,
      strokeWidth: 2,
      rx: 8,
      ry: 8,
    });

    const text = new IText(block.label, {
      fontSize: 14,
      fill: block.color,
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      top: 40,
      left: 60,
    });

    // Create element data
    const elementData = {
      id: Date.now().toString(),
      name: block.label,
      date: new Date().toISOString().split('T')[0],
      type: block.id,
      important: 'medium',
      hardLevel: 'medium',
      trigger: '',
      color: block.color,
      icon: block.icon,
    };

    // Add element data to both objects
    bgRect.elementData = elementData;
    text.elementData = elementData;

    // Position the group
    bgRect.left = x - 60;
    bgRect.top = y - 40;
    text.left = x;
    text.top = y;

    // Add to canvas
    canvas.add(bgRect);
    canvas.add(text);

    // Group them together
    const group = new fabric.Group([bgRect, text], {
      left: x - 60,
      top: y - 40,
      selectable: true,
    });

    canvas.remove(bgRect);
    canvas.remove(text);
    canvas.add(group);
    group.elementData = elementData;

    canvas.renderAll();
  };

  const updateElementProperties = (updatedData) => {
    if (!selectedElement || !fabricCanvasRef.current) return;

    selectedElement.elementData = { ...selectedElement.elementData, ...updatedData };
    
    // Update visual representation if needed
    if (updatedData.name && selectedElement.type === 'group') {
      const textObject = selectedElement._objects?.find(obj => obj.type === 'i-text');
      if (textObject) {
        textObject.set('text', updatedData.name);
      }
    }

    fabricCanvasRef.current.renderAll();
  };

  const createConnection = (startElement, endElement) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !startElement || !endElement) return;

    const startCenter = startElement.getCenterPoint();
    const endCenter = endElement.getCenterPoint();

    const line = new Line([startCenter.x, startCenter.y, endCenter.x, endCenter.y], {
      stroke: '#6366f1',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });

    canvas.add(line);
    canvas.sendToBack(line);
    canvas.renderAll();
  };

  return (
    <div className="w-full h-full flex">
      <div className="flex-1">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full border-0" 
          style={{ height: 'calc(100% - 60px)' }}
        />
      </div>
      {selectedElement && (
        <ElementPropertiesPanel
          element={selectedElement}
          onUpdate={updateElementProperties}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </div>
  );
};

export default LifePathCanvas;
