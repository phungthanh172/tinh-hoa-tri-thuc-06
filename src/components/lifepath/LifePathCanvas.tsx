
import React, { useEffect, useRef } from 'react';
import { Canvas as FabricCanvas, Rect, Circle, IText } from 'fabric';

const LifePathCanvas = ({ onCanvasReady }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

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

  return (
    <div className="w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full border-0" 
        style={{ height: 'calc(100% - 60px)' }}
      />
    </div>
  );
};

export default LifePathCanvas;
