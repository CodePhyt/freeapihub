import { useEffect, useRef } from 'react';

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // More matrix-like characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Initialize drops at random positions
    const drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * canvas.height / fontSize));
    
    // Different shades of green for variety
    const greens = [
      '#00ff00', // bright green
      '#0f0',    // matrix green
      '#003300', // dark green
      '#00cc00', // medium green
      '#00ff33', // light green
    ];

    const drawMatrix = () => {
      // Semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px monospace`;
      
      // Draw each column
      drops.forEach((drop, i) => {
        // Get random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Random green shade
        const green = greens[Math.floor(Math.random() * greens.length)];
        ctx.fillStyle = green;
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff00';
        
        // Draw the character
        const x = i * fontSize;
        const y = drop * fontSize;
        ctx.fillText(char, x, y);
        
        // Reset shadow for next iteration
        ctx.shadowBlur = 0;
        
        // Random chance to create new drops for more organic flow
        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
        
        // Random chance to create bright characters
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#fff'; // white for extra bright effect
          ctx.fillText(char, x, y);
        }
      });
    };

    // Faster animation
    const interval = setInterval(drawMatrix, 33); // ~30fps

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.8, // Slightly more visible
        background: 'black',
      }}
    />
  );
};
