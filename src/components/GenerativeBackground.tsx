"use client";
import React, { useEffect, useRef } from 'react';

export function GenerativeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.005;
      
      // Clear with dark charcoal background
      ctx.fillStyle = '#0D0F12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1;
      // Very subtle gold accent color for the procedural grid
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
      
      const gridSize = 50;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          
          // Simple pseudo-random wave calculation simulating density or noise
          const wave = Math.sin(i * 0.2 + time) + Math.cos(j * 0.2 + time);
          
          if (wave > 0.5) {
            ctx.beginPath();
            ctx.moveTo(x, y + gridSize / 2);
            ctx.lineTo(x + gridSize, y + gridSize / 2);
            ctx.stroke();
          }
          if (wave < -0.5) {
            ctx.beginPath();
            ctx.moveTo(x + gridSize / 2, y);
            ctx.lineTo(x + gridSize / 2, y + gridSize);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
