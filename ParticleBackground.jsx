import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Particles
    const NUM = 120;
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.6 + 0.15,
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      frame++;

      // Deep background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      // Central red radial glow
      const pulse = 0.06 + 0.025 * Math.sin(frame * 0.012);
      const glow1 = ctx.createRadialGradient(w * 0.5, h * 0.35, 0, w * 0.5, h * 0.35, w * 0.55);
      glow1.addColorStop(0, `rgba(160,0,0,${pulse})`);
      glow1.addColorStop(0.45, `rgba(80,0,0,0.04)`);
      glow1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, w, h);

      // Secondary smaller glow offset
      const glow2 = ctx.createRadialGradient(w * 0.3, h * 0.55, 0, w * 0.3, h * 0.55, w * 0.3);
      glow2.addColorStop(0, `rgba(120,0,0,0.04)`);
      glow2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, w, h);

      // === PERSPECTIVE GRID ===
      const vanishX = w * 0.5;
      const vanishY = h * 0.22;
      const gridFloorY = h * 0.68;
      const COLS = 14;
      const ROWS = 10;

      // Vertical lines converging to vanishing point
      for (let c = 0; c <= COLS; c++) {
        const t = c / COLS;
        const bottomX = t * w;
        const alpha = 0.025 + 0.018 * Math.sin(frame * 0.006 + c * 0.5);
        const grad = ctx.createLinearGradient(vanishX, vanishY, bottomX, gridFloorY);
        grad.addColorStop(0, `rgba(200,0,0,0)`);
        grad.addColorStop(0.5, `rgba(200,0,0,${alpha})`);
        grad.addColorStop(1, `rgba(200,0,0,${alpha * 1.5})`);
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(bottomX, gridFloorY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Horizontal lines (perspective rows)
      for (let r = 1; r <= ROWS; r++) {
        const t = Math.pow(r / ROWS, 1.6); // perspective compression
        const y = vanishY + (gridFloorY - vanishY) * t;
        const spread = (w * 0.5) * t + w * 0.01;
        const x0 = vanishX - spread;
        const x1 = vanishX + spread;
        const alpha = 0.018 + 0.014 * Math.sin(frame * 0.008 + r * 0.6);
        const grad = ctx.createLinearGradient(x0, y, x1, y);
        grad.addColorStop(0, 'rgba(180,0,0,0)');
        grad.addColorStop(0.15, `rgba(180,0,0,${alpha})`);
        grad.addColorStop(0.85, `rgba(180,0,0,${alpha})`);
        grad.addColorStop(1, 'rgba(180,0,0,0)');
        ctx.beginPath();
        ctx.moveTo(x0, y);
        ctx.lineTo(x1, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Grid floor fade — blends bottom into black
      const floorFade = ctx.createLinearGradient(0, gridFloorY - 60, 0, gridFloorY + 40);
      floorFade.addColorStop(0, 'rgba(0,0,0,0)');
      floorFade.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = floorFade;
      ctx.fillRect(0, gridFloorY - 60, w, 100);

      // === PARTICLES ===
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,50,50,${a})`;
        ctx.fill();
      });

      // Connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200,0,0,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Top vignette
      const topVig = ctx.createLinearGradient(0, 0, 0, 80);
      topVig.addColorStop(0, 'rgba(0,0,0,0.6)');
      topVig.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = topVig;
      ctx.fillRect(0, 0, w, 80);

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
