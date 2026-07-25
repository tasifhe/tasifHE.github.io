"use client";
import React, { useEffect, useRef } from 'react';

export function GenerativeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

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

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.targetX = e.clientX - rect.left;
      pointer.current.targetY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointer.current.targetX = -1000;
      pointer.current.targetY = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    resize();

    const draw = () => {
      time += 0.005;

      // Ease the pointer position toward its target for a soft, trailing feel.
      pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.06;
      pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.06;

      // Clear with dark charcoal background
      ctx.fillStyle = '#0D0F12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Soft gold spotlight that follows the cursor, like a flashlight over the HUD grid.
      const spotlight = ctx.createRadialGradient(
        pointer.current.x, pointer.current.y, 0,
        pointer.current.x, pointer.current.y, 340
      );
      spotlight.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
      spotlight.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1;

      const gridSize = 50;
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      // Subtle parallax: the whole grid drifts a couple of pixels toward the cursor.
      const parallaxX = (pointer.current.x - canvas.width / 2) * 0.01;
      const parallaxY = (pointer.current.y - canvas.height / 2) * 0.01;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize + parallaxX;
          const y = j * gridSize + parallaxY;

          // Simple pseudo-random wave calculation simulating density or noise
          const wave = Math.sin(i * 0.2 + time) + Math.cos(j * 0.2 + time);

          // Lines near the cursor glow brighter, reinforcing the spotlight.
          const dx = x - pointer.current.x;
          const dy = y - pointer.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - distance / 280);
          const alpha = 0.05 + proximity * 0.25;
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;

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
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
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
